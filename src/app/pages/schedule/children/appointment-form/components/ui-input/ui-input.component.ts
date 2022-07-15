import { Component, Input, OnInit, TemplateRef, ViewChild, AfterViewInit, ChangeDetectorRef, SimpleChanges } from '@angular/core';

import { FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { FormService } from 'src/app/services/utils/form2.service';

@Component({
  selector: 'crm-ui-input',
  templateUrl: './ui-input.component.html',
  styleUrls: ['./ui-input.component.scss']
})
export class UiInputComponent implements OnInit, AfterViewInit {
  @Input() item = null
  @Input() _formService: FormService = null
  field
  @ViewChild('input') public UIinput: TemplateRef<any>
  @ViewChild('phone') public UIphone: TemplateRef<any>
  @ViewChild('select') public UIselect: TemplateRef<any>
  @ViewChild('area') public UIarea: TemplateRef<any>
  @ViewChild('time') public UITime: TemplateRef<any>
  @ViewChild('radio') public UIRadio: TemplateRef<any>
  @ViewChild('button') public UIButton: TemplateRef<any>
  options
  formGroup: FormGroup
  showReminder
  constructor(
    private cd: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.formGroup = this._formService.FormGroup

  }


  ngAfterViewInit(){
    this.options = {
      i: this.UIinput,
      s: this.UIselect,
      p: this.UIphone,
      a: this.UIarea,
      t: this.UITime,
      r: this.UIRadio,
      b: this.UIButton
    }
    this.field = this.options[this.item.type]

    this.cd.detectChanges()


  }

  setmin(){
    if(this.item.label.includes('Stop'))
      return moment(this.formGroup.get('calendar_startHour').value, ['LT']).add(5, 'minutes').format('LT')
    else
      return null
  }


}
