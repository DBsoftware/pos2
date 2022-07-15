import { MatTableDataSource } from "@angular/material/table";
import { Store } from "@ngrx/store";
import { BehaviorSubject, of } from "rxjs";
import { delay, catchError, tap } from "rxjs/operators";
import { Order } from "../model/order";
import { ManagerState } from "../store";
import { selectAllOrdersForTable } from "../store/tables/table-one/table-orders.selectors";
import { CustomDataSource } from "./custom-table-datasource";

export class TableOneDataSource extends  CustomDataSource {
    constructor(private store: Store<ManagerState>){
        super()
    }

    loadData() {
        this.store.select(selectAllOrdersForTable)
        .pipe(catchError(() => of([])),delay(0), tap(e => this.data = e))
        .subscribe((data: Array<any> )=> {
            data = data.map(e => new Order().setOrder({...e}))
            this.mySubject.next(data)
        });
    }
    connect(){
        return this.mySubject
    }

    disconnect(){
        this.mySubject.complete();
    }


}