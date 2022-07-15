import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ButtonFatService } from 'src/app/services/buttons/button-fat.service';




@Component({
  selector: 'app-fat-buttons',
  templateUrl: './fat-buttons.component.html',
  styleUrls: ['./fat-buttons.component.scss']
})
export class FatButtonsComponent implements OnInit {
  @Input() item
  @Input() payload = null
  constructor(private _buttonFatService: ButtonFatService) { }

  ngOnInit(): void {

  }

  onClick(){
    this._buttonFatService.fats(this.item, this.payload)
  }



}
