import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ResponseService } from '../api/response.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { REQUEST_SPINNER, GENERAL_SPINNER } from 'src/app/utils/mncTypes-enums';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor(private _response: ResponseService, private spinner: NgxSpinnerService) {}



  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('completo',JSON.stringify(req.body))
    req =  req.clone({ body: btoa(JSON.stringify(req.body)) })
    return next.handle(req)
    .pipe(
      tap(e => {if(!!e['body']) this._response.extractResponse(e)},
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
            console.log(err)
            this.spinner.hide(REQUEST_SPINNER)
            this.spinner.hide(GENERAL_SPINNER)
            throw new Error(err.message);
        }
    }
      ),
      );
  }
}
