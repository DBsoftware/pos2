import { Component, Input, OnInit } from '@angular/core';
import { CAROUSEL_TYPE } from '../static-data';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  CAROUSEL_TYPE = CAROUSEL_TYPE
  @Input() type: string = 'PC';
  @Input() product: any

  constructor() { }

  ngOnInit(): void {
  }




}
