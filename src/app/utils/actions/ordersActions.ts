import { Business } from "src/app/model/business";
import { Item, POStructure } from "src/app/model/item";
import { Order } from "src/app/model/order";
import { ORDERDETAILSTATUS } from "../mncTypes-enums";

export class OrdersActions {
    _order: Order
    _orderItems
    constructor(
        public orderIn: Order,
        public userIn: Business
    ){
        this.orderItems = orderIn.items
        this.order = orderIn
    }
    set orderItems(items: Item[]){
        this._orderItems = items ? items.map(e => new Item().setItem(e)) : undefined
    }
    get orderItems(){
        return this._orderItems
    }
    set order(order: Order){
        this._order = !!order ? new Order().setOrder(order): undefined
    }
    get order(){
        return this._order
    }

    setOrderToAdd(){
        this._order.user_id = this.userIn.id
        console.log(this.userIn.id, this._order.user_id)
        this._order.merchant_id = this.userIn.merchant_id
        return this.order
    }

    changeItemsStatus(status){
        this._order.items = this._orderItems.map(e => new Item().setItem({...e,order_detail_status: status}))
        return this.order
    }

    setUpServer(){
        this._order.PO = this._orderItems.map(e => new POStructure().setPO({...e}))
        this._order.items = undefined
        return this.order
    }

    changeOrderStatus(status, itemStatus, changeDetails = true){
        this._order.order_status_id = status
        if(changeDetails) this.changeItemsStatus(itemStatus)
        return this.order
    }
    updateItems(newItems){
        this._order.items = newItems
        return this.order
    }

}