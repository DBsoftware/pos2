import { Component, Input, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { take, tap } from 'rxjs/operators';
import { ChoiceStructure, Item, OptionStructure, SelectedChoice } from 'src/app/model/item';
import { Order } from 'src/app/model/order';
import { ButtonPillsService } from 'src/app/services/buttons/button-pills.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { ManagerState } from 'src/app/store';
import { loadDialogDetailsSuccess } from 'src/app/store/Dialogs/dialog.actions';
import { loadSelectedOrdersSuccess } from 'src/app/store/selected-order/selected-order.actions';
import { getSelected } from 'src/app/store/selected-order/selected-order.selectors';
@UntilDestroy()
@Component({
  selector: 'app-option-list',
  templateUrl: './option-list.component.html',
  styleUrls: ['./option-list.component.scss']
})
export class OptionListComponent implements OnInit {
  @Input() classes = 'h-250'
  @Input() fx = 'column'
  @Input() fxs = 'column'
  @Input() fxsm = 'column'
  @Input() align = 'start'
  @Input() item
  @Input() options : Array<OptionStructure> = []
  orderSelected
  constructor(
    private store: Store<ManagerState>,
    private _pillsService: ButtonPillsService,
    private _utils: UtilsService
    ) { }

  ngOnInit(): void {
    this.store.select(getSelected)
    .pipe(untilDestroyed(this),
    tap(e => this.orderSelected = e),
    )
    .subscribe()

  }

  insertOn(value, option_name,option_id, choices){
    if (value.includes('null')) return this.cleanOptions(option_name)
    this._utils.updateSubjectObservable()
    .pipe(take(1))
    .subscribe(e => {
      let aux = new Item().setItem({...this.item})
      let {price,choice_name, choice_id} = choices.filter(e => value.includes(e.choice_id))[0]
      console.log(aux)
      let option = new OptionStructure().setOptionStructure({...aux.options_list.filter(e => e.option_id == option_id)[0]})
      option.selected = new SelectedChoice().setSelectedChoice({price,choice_name, option_name, choice_id})
      aux.options_list = aux.options_list.map(e => e.option_id == option_id? option : new OptionStructure().setOptionStructure({...e}))
      aux.choices = [...(aux.choices? aux.choices: []),new ChoiceStructure().addChoices({selected_id : choice_id})]
      e? this.update(aux):  
      this.store.dispatch(loadDialogDetailsSuccess({data: aux}))
      console.log('options',aux)
      })
    }

    update(aux){
      this._pillsService.fillVariables()
      this._pillsService.updateItemListOperation(aux)
    }
    
    cleanOptions(option_name){
      let aux = new Item().setItem({...this.item})
      let options = this.item.options_list.filter(e => e.option_name.includes(option_name))
      let clean =  options.length > 0? (!!options[0].selected && options[0].selected.choice_id ? options[0].selected.choice_id : 'none') : 'none'
      aux.choices = aux.choices.filter(e => !e.selected_id.includes(clean))
      this.store.dispatch(loadDialogDetailsSuccess({data: aux}))
  }



}
