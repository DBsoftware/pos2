import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-counter-footer',
  templateUrl: './counter-footer.component.html',
  styleUrls: ['./counter-footer.component.scss']
})
export class CounterFooterComponent implements OnInit {
  @Input() isCounter = true
  
  constructor() { }

  ngOnInit(): void {
    

  }

}
