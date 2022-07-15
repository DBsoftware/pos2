import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { ButtonPillsService } from 'src/app/services/buttons/button-pills.service';


@Component({
  selector: 'app-pillbutton',
  templateUrl: './pillbutton.component.html',
  styleUrls: ['./pillbutton.component.scss']
})
export class PillbuttonComponent implements OnInit {
  @Input() item
  @Input() disabled = false
  @Input() payload = null
  altFlag = false
  label
  @Output() out = new EventEmitter()
  constructor(
    private _buttonService: ButtonPillsService
    ) { }

  ngOnInit(): void {
    this.label =this.item.label
  }


  onClick(){
    console.log(this.payload, this.item.label)
    switch (this._buttonService.pills(this.item, this.payload)) {
      case 1:
        this.out.emit() 
        break;
      case 2:
        this.useAlt() 
        break;
    
      default:
        break;
    }
  }

  useAlt(){
    if (!!this.item.alt) {
      this.altFlag = !this.altFlag
      this.label = !this.altFlag? this.item.label: this.item.alt
    }
    return 
  }


}
