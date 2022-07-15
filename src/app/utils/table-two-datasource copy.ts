import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { ManagerState } from "../store";
import { selectAllItemsForTable } from "../store/tables/table-two/table-items.selectors";
import { CustomDataSource } from "./custom-table-datasource";

export class TableTwoDataSource extends CustomDataSource{

    constructor(private store: Store<ManagerState>){
        super()
    }

    loadData() {
        this.store.select(selectAllItemsForTable)
        .pipe(catchError(() => of([])), tap(e => this.data = e))
        .subscribe(data => this.mySubject.next(data));
    }
    connect(){
        return this.mySubject
    }

    disconnect(){
        this.mySubject.complete();
    }
}