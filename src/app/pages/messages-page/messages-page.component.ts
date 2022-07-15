import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableType } from 'src/app/utils/mncTypes-enums';
import { columnsTableOne } from './static-data';

@Component({
  selector: 'app-messages-page',
  templateUrl: './messages-page.component.html',
  styleUrls: ['./messages-page.component.scss']
})
export class MessagesPageComponent implements OnInit {
  columnsTableOne = columnsTableOne
  TableTypeMessages = TableType.MESSAGES
  flag = true
  constructor(public location: Location) {}


  ngOnInit(): void {
  }

  back(){
    this.location.back()
  }

}
