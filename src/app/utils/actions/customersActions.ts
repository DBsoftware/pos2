import { Customer } from "src/app/model/customer";
import { Order } from "src/app/model/order";
import { OrdersActions } from "./ordersActions";

export class CustomersActions extends OrdersActions {
    _customer: Customer
    constructor(
        public orderIn: Order
    ){
        super(orderIn, null)
        console.log('uno',this.order)
    }
    
    set customer(customer: Customer | Order){
        this._customer = !!customer ? new Customer().setNewCustomer(customer): new Customer()
    }
    get customer(){
        return this._customer
    }


}