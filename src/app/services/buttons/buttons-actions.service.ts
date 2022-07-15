import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ManagerState } from '../../store';
import { RequestService } from '../api/request.service';
import { ResponseService } from '../api/response.service';
import { StoreService } from '../store/store.service';

@Injectable({
  providedIn: 'root'
})
export class ButtonsActionsService extends StoreService {

  constructor(
    protected store: Store<ManagerState>,
    protected router: Router,
    protected _responseService: ResponseService,
    protected _requestService: RequestService,
    public snackBar?: MatSnackBar
  ) { super(store, _responseService,_requestService) }

  routeNavigate(path, state = 0){
    this.router.navigate([path])
    return state
  }

  openSnackBar(message, style = 'error', state = 0){
    this.snackBar.open(message, '×', { panelClass: style, verticalPosition: 'bottom', duration: 3000 })
    return state
  }
}
