import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarResolverService } from 'src/app/services/resolvers/calendar-resolver.service';
import { ScheduleComponent } from './schedule.component';
// import { DetailsResolverService } from '../../services/resolvers/details-resolver.service';
// import { DependantsSchResolverService } from '../../services/resolvers/depedantsSch-resolver.service';
// import { AppoimentResolverService } from '../../services/resolvers/appoiment-resolver.service';
// import { CalendarResolverService } from 'src/app/services/resolvers/calendar-resolver.service';

const routes: Routes = [
  {
    // resolve: {data: DetailsResolverService},
    path: '', component:ScheduleComponent,
    children: [
      // {
      //     path: 'set/:date/:id',
      //     // resolve: {data: DependantsSchResolverService, date2: AppoimentResolverService},
      //     loadChildren: () => import(`./children/appointment-form/appointment-form.module`).then(m => m.AppointmentFormModule)
      // },
      // {
      //     path: 'set/:date',
      //     // resolve: {data: DependantsSchResolverService},
      //     loadChildren: () => import(`./children/appointment-form/appointment-form.module`).then(m => m.AppointmentFormModule)
      // },
      {
        path: ':date/:id',
        loadChildren: () => import(`./children/calendar/calendar.module`).then(m => m.CalendarModule),
        resolve: {data: CalendarResolverService}
    },
      {
        path: ':date',
        loadChildren: () => import(`./children/calendar/calendar.module`).then(m => m.CalendarModule),
        // resolve: {data: CalendarResolverService}
    },
      {
        path: '',
        loadChildren: () => import(`./children/calendar/calendar.module`).then(m => m.CalendarModule),
        // resolve: {data: CalendarResolverService}
    }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule { }
