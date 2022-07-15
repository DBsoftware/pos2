import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { CustomDataSource } from "./custom-table-datasource";

export class DataSource extends CustomDataSource{

    constructor(private store: Observable<any>){
        super()
    }

    loadData() {
        this.store
        .pipe(catchError(() => of([])),tap(console.log) ,tap(e => this.data = e))
        .subscribe(data => this.mySubject.next(data));
    }
    connect(){
        return this.mySubject
    }

    disconnect(){
        this.mySubject.complete();
    }
}
