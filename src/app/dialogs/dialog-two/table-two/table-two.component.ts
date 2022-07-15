import { Component, OnInit } from '@angular/core';
import { columnsTableOne } from 'src/app/dialogs/dialog-two/table-two/static-data';
import { TableType } from 'src/app/utils/mncTypes-enums';

@Component({
  selector: 'app-table-two',
  templateUrl: './table-two.component.html',
  styleUrls: ['./table-two.component.scss']
})
export class TableTwoComponent implements OnInit {
  columnsTableOne = columnsTableOne
  ORDERSFOURTH = TableType.ORDERSFOURTH 
  constructor() { }

  ngOnInit(): void {
  }

}
