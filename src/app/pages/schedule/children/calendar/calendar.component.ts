import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
// import { Buttons } from '../../../../../../shared/buttons/data';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ManagerState } from 'src/app/store';
// import { getEventsValue } from '../../../../../../store/calendar/calendar.selectors';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { getEventsValue } from '../../../../store/auxiliars/auxiliars.selectors';
import { tap, take } from 'rxjs/operators';
import { PATHS } from '../../../../utils/mncTypes-enums';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { loadFormsValue } from '../../../../store/form/form.actions';
import { Calendar } from '../../../../model/calendar';
import { loadCalendarSelectedSuccess } from '../../../../store/auxiliars/auxiliars.actions';
import * as moment from 'moment';
@UntilDestroy()
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, AfterViewInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  date = moment().format()
  buttons = [ {label :'Save', color: 'orange'}]
  constructor(public activatedRoute:ActivatedRoute,
    private store:Store<ManagerState>,
     private router: Router) { }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleeventClikck.bind(this),
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,listWeek,listDay'
    },
    views: {
      listDay: { buttonText: 'Day' },
      listWeek: { buttonText: 'Week' },
      dayGridMonth: { buttonText: 'Month' }
    },

  };

  ngOnInit() {
    this.store.select(getEventsValue)
    .pipe(untilDestroyed(this)
    ,tap(e => console.log(e, "here!!!")),
    tap(e => this.calendarOptions.events = [...e]),
    tap(e => console.log(this.calendarOptions.events)),
    )
    .subscribe()
  }

  ngAfterViewInit(){
    this.activatedRoute.paramMap
    .pipe(
      tap(console.log),
      tap(e => {
        this.date = !!e.get('date') ? moment(e.get('date')).format():this.date
        this.calendarComponent.getApi().select(this.date)
      }
        ),
       )
    .subscribe()
    // this.store.select(getEventsValue)
    // .pipe(untilDestroyed(this)
    // ,tap(e => console.log(e.length, "here!!!",this.calendarComponent.getApi().getEvents().length)),
    // tap(e => {
    //   if(e.length > this.calendarComponent.getApi().getEvents().length){
    //     console.log("HELLO",e[e.length - 1])
    //     this.calendarComponent.getApi().addEvent(e[e.length - 1])
    //   }
    //  })
    // )
    // .subscribe()
  }

  handleeventClikck(arg) {

    this.router
    .navigate([PATHS.RESERVATIONS,arg.event._def.extendedProps.date, arg.event._def.extendedProps.id],
      )
  }


  handleDateClick(arg) {
   console.log('here', arg.date, )

    this.store.dispatch(loadFormsValue({data:new Calendar()}));
    this.store.dispatch(loadCalendarSelectedSuccess({data:new Calendar()}));
    this.router.navigate([PATHS.RESERVATIONS, arg.dateStr])

  }

}
