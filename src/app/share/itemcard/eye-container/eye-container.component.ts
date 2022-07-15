import { Component, Input, OnInit } from '@angular/core';
import { CAROUSEL_TYPE } from '../static-data';

@Component({
  selector: 'app-eye-container',
  templateUrl: './eye-container.component.html',
  styleUrls: ['./eye-container.component.scss']
})
export class EyeContainerComponent implements OnInit {
  CAROUSEL_TYPE = CAROUSEL_TYPE
  @Input() type: string = 'PC';
  @Input() product: any
  constructor() { }

  ngOnInit(): void {
  }

}
