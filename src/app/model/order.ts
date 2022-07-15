import { JsonProperty, Serializable } from "typescript-json-serializer";
import { hexBoth, padOut } from "./hexa";
import * as moment from 'moment';
import { ORDERSTATUS, ORDERTYPE, ORDERTYPEEnum } from '../utils/mncTypes-enums';
import { UtilsService } from "../services/utils/utils.service";
import { Item, POStructure } from "./item";
import { General } from "./business";

@Serializable()
export class Order extends General {
        @JsonProperty('114.179')
            public merchant_id: string
        @JsonProperty({name: '115.21', ...padOut})
            public location_table_id: number
        @JsonProperty('115.33')
            public order_date: string = moment().format('YYYY-MM-DD HH:mm:ss')
        @JsonProperty('115.34')
            public order_due_date: string = moment().add(10,'m').format('YYYY-MM-DD HH:mm:ss')
        @JsonProperty('53')
            public user_id: string
        @JsonProperty({name: '114.53', ...hexBoth})
            public employee_name: string
        @JsonProperty({name: '114.3', ...hexBoth})
            public customer_firstname: string
        @JsonProperty({name: '114.5', ...hexBoth})
            public customer_lastname: string
        @JsonProperty('48.28')
            public customer_phone_number: string
        @JsonProperty({name: '114.12', ...hexBoth})
            public delivery_address_1: string
        @JsonProperty({name: '114.13', ...hexBoth})
            public delivery_address_2: string
        @JsonProperty('47.17')
            public zipcode_name: string
        @JsonProperty({name: '115.35', ...hexBoth})
            public order_instructions: string
        @JsonProperty({name: '115.36', ...hexBoth})
            public order_note: string
        @JsonProperty({name: '115.31', ...padOut})
            public id: string
        @JsonProperty({name: '122.109', ...padOut})
            public  delivery_id: number
        @JsonProperty('114.115')
            public  address_id: number
        @JsonProperty('115.37')
            public order_status_id: string
        @JsonProperty({name: '114.127', ...hexBoth})
            public searchword
        @JsonProperty('115.32')
            public order_number : string
        @JsonProperty({name: 'PC', type: Item})
            public items : Array<Item>;
        @JsonProperty({name: 'PO', type: POStructure})
            public PO : Array<POStructure>;
        @JsonProperty({name : '115.11', ...padOut})
            public seating_area_id: string
        @JsonProperty({name:'114.47', ...padOut})
            location_id: string
        @JsonProperty('122.161')
            public delivery_fee: string
        @JsonProperty('121.97')
            public order_tax: string
        @JsonProperty('120.109')
            public order_tip: string
        @JsonProperty('121.36')
            public order_cash_flag : string
        @JsonProperty('115.39')
            public order_last4: string
        @JsonProperty('115.38')
            public order_approval: string
        @JsonProperty({name: '120.7', ...padOut})
            public credit_card_type_id: string
        @JsonProperty('127.60')
            public sort: string = ''
        @JsonProperty('115.71')
            public order_type_id: string
    public get orderNoteFix(){
        return this.order_note.replace(/!&;/g, '<br>' )
    }

    public get isDelivery(){
        return this.order_type_id ? this.order_type_id.includes(ORDERTYPEEnum.Delivery): false
    }
    public get isPickUp(){
        return this.order_type_id ? this.order_type_id.includes(ORDERTYPEEnum.Pick_Up):false
    }
    public get isDineIn(){
        return this.order_type_id ? this.order_type_id.includes(ORDERTYPEEnum.DINE_IN):false
    }

    public get hasDoneItems(){
        return this.items.filter(e => e.statusDetailIsDone).length > 0
    }
    public get doneItems(){
        return this.items.map((e, i) => new Item().setItem({...e, position: (i+1)})).filter(e => e.statusDetailIsDone)
    }
    public get itemsLength(){
        return this.items.length
    }

    public get fullAddress() {
        return `Address: ${!!this.delivery_address_1?this.delivery_address_1: '' } ${!!this.delivery_address_2?this.delivery_address_2: '' }
        `
    }
    public get paymentInfo() {
        return `${!!this.order_last4 ?(!!this.order_cash_flag?'Paid with: cash': 'Paid with: credit card'):'' }\n
        ${!!this.credit_card_type_id ?`Card Type : ${this.credit_card_type_id}\n`: '' }
        ${!!this.order_last4 ?`Card number : XXXXXXX ${this.order_last4}\n`: '' }
        ${!!this.order_approval?`Approval No: ${this.order_approval}`: '' }
        `
    }

    public get fullName() : string  {
        return  !!this.customer_lastname || !!this.customer_firstname ? this.customer_lastname +', '+ this.customer_firstname : undefined
    }

    public  get timer() : string {
        return this.isReady || this.isClose || this.isCancel ?
         (this.isReady ? 'Order Finished': (this.isClose ? 'Order Closed': 'Order Canceled') )
        :`Timer ${UtilsService.pad(moment.duration(moment().diff(moment(this.order_date))).hours().toFixed(0), 2)}:${UtilsService.pad(moment.duration(moment().diff(moment(this.order_date))).minutes().toFixed(0), 2)}:${UtilsService.pad(moment.duration(moment().diff(moment(this.order_date))).seconds().toFixed(0), 2)}`
    }

    public get status() : string {
        return ORDERSTATUS[this.order_status_id]
    }
    public get orderType() : string {
        return ORDERTYPE[this.order_type_id]
    }
    public get tax() : string {
        return (Number(this.subTotalItems) * 0.0725).toFixed(2)
    }

    public get isReady(){
        return +this.order_status_id == ORDERSTATUS.Done
    }
    public get isClose(){
        return +this.order_status_id == ORDERSTATUS.Close
    }
    public get isCancel(){
        return +this.order_status_id == ORDERSTATUS.Cancel
    }

    public get isDelivered(){
        return this.items.map(e =>  e.statusDetailIsDelivered).reduce((total, e) => total && e, true)
    }
    public get isAllDone(){
        return this.items.map(e =>  e.statusDetailIsDone).reduce((total, e) => total && e, true)
    }


    public get subTotalItems(){
        return !!this.items? (this.items.map(e => Number(e.subtotal_price) * Number(e.product_qty)).reduce((total, e) => total + e,0)).toFixed(2):0
    }
    public get orderTotal(){
        return (!!this.items? (
            Number(this.subTotalItems)
            + (!!this.tax?  Number(this.tax) : 0)
            + (!!this.order_tip?  Number(this.order_tip) : 0)
            + (!!this.delivery_fee?  Number(this.delivery_fee): 0)
            ):0).toFixed(2)
    }

    public get total(){
        return `$${this.orderTotal}`
    }

    public get totalItems(){
        return !!this.items? (this.items.map(e => Number(e.product_qty)).reduce((total, e) => total + e,0)).toFixed(0):0
    }

    get totalNoTip(){
      return Number(this.subTotalItems) + Number(this.tax)
    }


    @JsonProperty('55.3')
    public order_total

    undefinedDates(){
        this.order_date =undefined
        this.order_due_date =undefined
    }


    setAddNote(obj){
        this.undefinedDates()
        return this.updateNote(obj)
    }
    updateNote(obj){
        let aux = ['id','order_note']
        return this.setObject(aux, obj)
    }

    setPay(obj){
        this.undefinedDates()
        let aux = [
            'id',
            'order_tax',
            'order_tip',
            'delivery_fee',
            'order_cash_flag',
            'order_total',
            'credit_card_type_id',
            'order_last4',
            'order_approval'
        ]
        return this.setObject(aux, obj)
    }
    setNewCustomer(obj){
        this.undefinedDates()
        let aux = [
            'customer_firstname',
            'customer_lastname',
            'merchant_id',
            'customer_phone_number',
            'delivery_address_1',
            'delivery_address_2',
            'zipcode_name',
        ]
        return this.setObject(aux, obj)
    }

    setOrder(obj){
        let aux = [
            'id',
            'employee_name',
            'address_id',
            'customer_firstname',
            'customer_lastname',
            'customer_phone_number',
            'delivery_address_1',
            'delivery_address_2',
            'delivery_id',
            'location_table_id',
            'merchant_id',
            'order_date',
            'order_due_date',
            'order_instructions',
            'order_note',
            'order_number',
            'order_status_id',
            'searchword',
            'user_id',
            'zipcode_name',
            'seating_area_id',
            'items',
            'delivery_fee',
            'order_tax',
            'order_tip',
            'order_cash_flag',
            'credit_card_type_id',
            'order_last4',
            'order_approval',
            'sort',
            'PO',
            'location_id',
            'order_type_id'
        ]
        return this.setObject(aux, obj)
    }

    setSetDelivery(obj){
        this.undefinedDates()
        let aux = [
            'id',
            'delivery_address_1',
            'delivery_address_2',
            'zipcode_name'
        ]
        return this.setObject(aux, obj)
    }
}







