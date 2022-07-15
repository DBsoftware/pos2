import { Business } from "src/app/model/business";
import { Item } from "src/app/model/item";
import { Order } from "src/app/model/order";
import { ORDERDETAILSTATUS } from "../mncTypes-enums";
import { OrdersActions } from "./ordersActions";

export class ItemsActions extends OrdersActions{
    _item: Item
    _itemsCollection: Item[]
    constructor(
        public itemIn: Item ,
        public itemsCollectionIn: Item[],
        public orderIn: Order,
        public userIn: Business,
    ){
        super(orderIn, userIn)
        this.item = itemIn
        this.itemsCollection = itemsCollectionIn
    }
    set item(item: Item){
        this._item = !!item ? new Item().setItem(item): undefined
    }
    get item(){
        return this._item
    }
    set itemsCollection(items: Item[]){
        this._itemsCollection = !!items ? items: undefined
    }
    get itemsCollection(){
        return this._itemsCollection
    }

    // Actions
    
    addItemToCollectionOfOrder(){
        return [this._item,...(!!this._orderItems? this._orderItems: [])]
    }

    setItemToAdd(){
        this._item.order_detail_status = `${ORDERDETAILSTATUS.Ordered}`
        this._item.order_id = +this.order.id
        this._item.product_qty = !!this._item.product_qty? `${this._item.product_qty}`: '1'
        return this._item
    }

    updateItemOfOrder(){
        return this._orderItems.map(e => e.order_detail_id == this._item.order_detail_id ? this._item: e) 
    }




}