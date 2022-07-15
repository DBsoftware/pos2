import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { ToolbarModule } from './share/toolbar/toolbar.module';
import { DialogsModule } from './dialogs/dialogs.module';
import { ItemsEffects } from './store/items/items.effects';
import { AppInitService } from './services/api/app-init.service';
import { PresentationModule } from './pages/presentation-page/presentation.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppInterceptor } from './services/interceptors/app.interceptor';
import { AuxiliarsEffects } from './store/auxiliars/auxiliars.effects';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { OrdersEffects } from './store/tables/table-one/orders.effects';
import { SelectedOrderEffects } from './store/selected-order/selected-order.effects';
import { ItemsCollectionEffects } from './store/items-collection/items-collection.effects';
import { DialogsEffects } from './store/Dialogs/dialogs.effects';
import {NgxSpinnerModule, NgxSpinnerService} from 'ngx-spinner';
import { CounterEffects } from './store/counter-state/counter.effects';
import { NgxPrintModule } from 'ngx-print';
import { ChatEffects } from './store/chat/chat.effects';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import { NgxMaskModule } from 'ngx-mask';

export function initializeApp1(appInitService: AppInitService) {
  return (): Promise<any> => {
    return appInitService.Init();
  }
}

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  listPlugin,
  timeGridPlugin,
  interactionPlugin
]);
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PresentationModule,
    NgxSpinnerModule,
    ToolbarModule,
    DialogsModule,
    NgxPrintModule,
    LazyLoadImageModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    BrowserAnimationsModule,
    EffectsModule.forRoot([ItemsEffects,
      CounterEffects,
      ChatEffects,
      AuxiliarsEffects,
      OrdersEffects,
      SelectedOrderEffects,
      DialogsEffects,
      ItemsCollectionEffects]),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [
    AppInitService,
    { provide: APP_INITIALIZER,useFactory: initializeApp1, deps: [AppInitService, NgxSpinnerService], multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true},


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
