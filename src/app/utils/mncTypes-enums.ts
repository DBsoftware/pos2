import { SortOption } from "../model/sort-option";

export enum ORDERSTATUS{
    Open = 92001,
    Done = 92002,
    Close = 92003,
    Cancel = 92004,
}

export enum ORDERDETAILSTATUS{
    Active = 93001,
    Ordered = 93002,
    Delivered = 93003,
    Done = 93004,
}

export let  USER_TYPE = {
    ['61316']:'Admin',
    ['61317']:'Kitchen',
    ['61318']:'Counter',
    ['61319']:'Waiter',
}
export enum USER_ROUTE{
    Admin = '/crossroads',
    Counter = '/counter',
    Kitchen = '/kitchen',
    Waiter = '/hwaiter',
}

export enum ITEM_STATUS {
    active = 1001,
    inactive = 1002
}


export enum  sortColumns {
    Title='122.128',
    Merchant= '114.70',
    Date= '114.138',
    type= '122.41'
}

export enum PATHS {
    LOGIN = 'login',
    CROSSROADS = 'crossroads',
    KITCHEN = 'kitchen',
    COUNTER = 'counter',
    MESSAGES = 'messages',
    RESERVATIONS = 'reservations',
    WAITER = 'hwaiter',
    ORDERS = 'orders',
    MESSAGES_WAITER = 'mwaiter',
    CHAT = 'chat',
    LIST = 'list',
    ORDER_DETAIL = 'order-details',
    NOT_FOUND = 'not-found'
}

export enum PATHORDERDEATILS {
    VIEW = 'order-view',
    ITEMDETAIL = 'item-detail',
    SHOWCASE = 'showcase',
    NEW_ORDER = 'newOrder',
    CATEGORY = 'Category'
  }


export const ItemSortOptions: SortOption[] = [
    {name: 'sort A-Z', field: '120.83-ASC'},
    {name: 'sort Z-A', field: '120.83-DESC'},
    {name: 'Price Low to High', field: '114.98-ASC'},
    {name: 'Price High to Low', field: '114.98-DESC'},
    {name: 'Rating - Low to High', field: '122.19-ASC'},
    {name: 'Rating - High to Low', field: '122.19-DESC'},
    {name: 'Views - Low to High', field: '114.132-ASC'},
    {name: 'Views - High to Low', field: '114.132-ASC'},
    {name: 'Views - Old to New', field: '114.144-ASC'},
    {name: 'Views - New to Old', field: '114.144-DESC'},
    {name: 'Distance - Near to Far', field: '120.11-ASC'},
    {name: 'Distance - Far to Near', field: '120.11-DESC'}
];

export const ConditionType = {
    ['2701'] : 'New',
    ['2702'] : 'Used',
    ['2703'] : 'Refurbished'
};

export enum Subtitle{
    ACTIVE = 'current orders',
    CLOSED = 'orders in history',
    SEARCH = 'results',
    BAR = 'bar orders related',
}

export let ColumnsSortIndex = {
    order_date: '115.33',
    order_due_date: '115.34',
    order_number: '115.32',
    fullName: '114.5',
    customer_phone_number: '48.28',
    status: '115.37',
    timer: '115.33',
    order_detail_id:'115.41',
    category_name:'120.45',
    title:'120.83',
    options:'',
    product_instructions:'121.55',
    product_qty:'114.121',
    statusDetail: '115.42'
}

export let  ORDERTYPE = {
    '94001':'Dine in',
    '94002':'Delivery',
    '94003':'Pick Up'
}
export enum  ORDERTYPEEnum {
    DINE_IN = '94001',
    Delivery ='94002',
    Pick_Up = '94003',
}

export const GENERAL_SPINNER = 'GeneralSpinner';
export const REQUEST_SPINNER = 'requestSpinner';

export enum TableType {
    ORDERS ='orders',
    ORDERSFOURTH ='ordersFourth',
    ITEMS = 'items',
    CUSTOMERS = 'customers',
    MESSAGES = 'messages'
}
