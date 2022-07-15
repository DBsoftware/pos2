import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BeforePageLoadService } from './services/resolver_guards/before-page-load.service';
import { LoginGuard } from './services/resolver_guards/guard-login-load.guard';
import { AuthGuard } from './services/resolver_guards/guard-page-load.guard';
import { PATHS } from './utils/mncTypes-enums';


const routes: Routes = [
    {
    path: '',
    redirectTo: PATHS.LOGIN,
    pathMatch: 'full'
    },
    {
        canActivate: [LoginGuard],
        canLoad: [LoginGuard],
        path: PATHS.LOGIN,
        loadChildren: () => import(`./pages/login-page/login.module`).then(m => m.LoginModule)
    },
    {
        // canActivate: [LoginGuard],
        // canLoad: [LoginGuard],
        path: PATHS.CROSSROADS,
        loadChildren: () => import(`./pages/admin-crossroads/admin-crossroads.module`).then(m => m.AdminCrossroadsModule)
    },
    {
        path: PATHS.KITCHEN,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        loadChildren: () => import(`./pages/kitchen-page/kitchen.module`).then(m => m.KitchenModule),
        resolve: {data: BeforePageLoadService}
    },
    {
        path:PATHS.COUNTER,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        loadChildren: () => import(`./pages/counter-page/counter.module`).then(m => m.CounterModule),
        resolve: {data: BeforePageLoadService}
    },
    {
        path: PATHS.MESSAGES,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        loadChildren: () => import(`./pages/messages-page/messages.module`).then(m => m.MessagesModule),
        resolve: {data: BeforePageLoadService}
    },
    {
        path: PATHS.RESERVATIONS,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        loadChildren: () => import(`./pages/schedule/schedule.module`).then(m => m.ScheduleModule),
        resolve: {data: BeforePageLoadService}
    },
    {
        path: PATHS.WAITER,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        loadChildren: () => import(`./pages/waiter-page/waiter.module`).then(m => m.WaiterModule),
        resolve: {data: BeforePageLoadService}
    },
    {
        path: PATHS.ORDERS,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        loadChildren: () => import(`./pages/orders-page/orders.module`).then(m => m.OrdersModule),
        resolve: {data: BeforePageLoadService}
    },
    {
        path: PATHS.MESSAGES_WAITER,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        loadChildren: () => import(`./pages/messages-waiter-page/messages-waiter.module`).then(m => m.MessagesWaiterModule),
    },
    {
        path: PATHS.ORDER_DETAIL,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        loadChildren: () => import(`./pages/order-details-page/order-details.module`).then(m => m.OrderDetailsModule)
    },
    {
        path: PATHS.NOT_FOUND,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        loadChildren: () => import(`./pages/not-found-page/not-found.module`).then(m => m.NotFoundModule)
    },
    {path: '**', redirectTo: PATHS.NOT_FOUND}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
