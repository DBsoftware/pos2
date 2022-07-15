import { NgModule } from '@angular/core';
import { OrderDetailsComponent } from './order-details.component';
import { MaterialModule } from 'src/app/utils/material.module';
import { OrdersNavigationModule } from './orders-navigation/orders-navigation.module';
import { RouterModule } from '@angular/router';
import { OrdersFormModule } from './orders-form/orders-form.module';
import { ShareModule } from 'src/app/share/share.module';
import { WaiterBeforePageLoadService } from 'src/app/services/resolver_guards/waiterOrderResolver.service';
import { PATHORDERDEATILS } from 'src/app/utils/mncTypes-enums';
import { WaiterIDBeforePageLoadService } from 'src/app/services/resolver_guards/waiterIDOrderResolver.service';
import { WaiterItemBeforePageLoadService } from 'src/app/services/resolver_guards/waiterItemOrderResolver.service';



export const routes = [
  {
    path: '',
    component: OrderDetailsComponent,
    children: [
      {
        path: '', redirectTo: `${PATHORDERDEATILS.VIEW}`, pathMatch: 'full' },
      {
        // canActivate: [OrderDetialGuard],
        // canLoad: [OrderDetialGuard],
        path: `${PATHORDERDEATILS.VIEW}/:order_id`, loadChildren: () => import(`./sub-pages/order-view/order-view.module`).then(m => m.OrderViewModule),
        resolve: {data: WaiterBeforePageLoadService}
      },
      {
        path: `${PATHORDERDEATILS.ITEMDETAIL}/:category_id/:item_id/:total/:position`, loadChildren: () => import(`./sub-pages/item-detail/item-detail.module`).then(m => m.ItemDetailModule),
        resolve: {data: WaiterItemBeforePageLoadService}
      },
      {
        path: `${PATHORDERDEATILS.ITEMDETAIL}/:order_id/:category_id/:item_id/:total/:position`, loadChildren: () => import(`./sub-pages/item-detail/item-detail.module`).then(m => m.ItemDetailModule),
        resolve: {data: WaiterItemBeforePageLoadService}
      },
      {
        path: `${PATHORDERDEATILS.SHOWCASE}/:order_id`, loadChildren: () => import(`./sub-pages/showcase-rows/showcase-rows.module`).then(m => m.ShowcaseRowsModule),
        resolve: {data: WaiterBeforePageLoadService}
      },
      {
        path: `${PATHORDERDEATILS.SHOWCASE}`, loadChildren: () => import(`./sub-pages/showcase-rows/showcase-rows.module`).then(m => m.ShowcaseRowsModule),
        resolve: {data: WaiterBeforePageLoadService}
      },
      {
        path: `${PATHORDERDEATILS.NEW_ORDER}`, loadChildren: () => import(`./sub-pages/showcase-rows/showcase-rows.module`).then(m => m.ShowcaseRowsModule),
        resolve: {data: WaiterBeforePageLoadService}
      },
      {
        path: `${PATHORDERDEATILS.CATEGORY}/:category_id`, loadChildren: () => import(`./sub-pages/category-view/category-view.module`).then(m => m.CategoryViewModule) ,
        resolve: {data: WaiterIDBeforePageLoadService}
      },
      {
        path: `${PATHORDERDEATILS.CATEGORY}/:order_id/:category_id`, loadChildren: () => import(`./sub-pages/category-view/category-view.module`).then(m => m.CategoryViewModule) ,
        resolve: {data: WaiterIDBeforePageLoadService}
      },
    ]
  },
];


@NgModule({
  declarations: [OrderDetailsComponent],
  imports: [
    RouterModule.forChild(routes),
    MaterialModule,
    OrdersFormModule,
    OrdersNavigationModule,
    ShareModule,
  ],
  exports: [OrderDetailsComponent]
})
export class OrderDetailsModule { }
