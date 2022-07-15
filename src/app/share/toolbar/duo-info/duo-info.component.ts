import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-duo-info',
  templateUrl: './duo-info.component.html',
  styleUrls: ['./duo-info.component.scss']
})
export class DuoInfoComponent implements OnInit {
  @Input() firstLine: string = ''
  @Input() secondLine: string = ''
  constructor() { }

  ngOnInit(): void {

  }

}
