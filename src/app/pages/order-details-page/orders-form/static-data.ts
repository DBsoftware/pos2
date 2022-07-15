import { ORDERTYPEEnum } from 'src/app/utils/mncTypes-enums';



let types = [ORDERTYPEEnum.DINE_IN, ORDERTYPEEnum.Delivery, ORDERTYPEEnum.Pick_Up]
let justDine = types.slice(0,1)
let justDelivery = types.slice(1,2)
let justPickUp = types.slice(2,3)
let PickUpDelivery = types.slice(1,3)

let DineIn = [
    {
        a:{require: types,label: 'Type of order', key: 'order_type_id', type:'select' }
    },
    {
        a:{require: justDine,label: 'Seating Area', key: 'seating_area_id', type:'select' },
        b:{require: PickUpDelivery,label: 'Customer Last name', key: 'customer_lastname', type:'input' }
    },
    {
        b:{require: justDine,label: 'Table no.', key: 'location_table_id', type:'select' },
        a:{require: PickUpDelivery,label: 'Customer First name', key: 'customer_firstname', type:'input' },
    },
    {
        a:{require: PickUpDelivery,label: 'Phone', key: 'customer_phone_number', type:'input', kind: 'true' },
    }
]
let Delivery = [
    {
        a:{require: types,label: 'Type of order', key: 'order_type_id', type:'select' }
    },
    {
        a:{require: PickUpDelivery,label: 'Customer First name', key: 'customer_firstname', type:'input' },
        b:{require: PickUpDelivery,label: 'Customer Last name', key: 'customer_lastname', type:'input' }
    },
    {
        a:{require: justDelivery,type: 'input',label: 'Address line one', key: 'delivery_address_1'},
        b:{require: justDelivery,type: 'input',label: 'Address line two', key: 'delivery_address_2'},
    },
    {
        b:{require: justDelivery,type: 'input',label: 'City', key: 'zipcode_name'},
        a:{require: PickUpDelivery,label: 'Phone', key: 'customer_phone_number', type:'input', kind: 'true' }
    },
    {
        a: {require: PickUpDelivery, type: 'input',label:'Due Date/Time', key: 'order_due_date'},
    }]
let PickUp = [
    {
        a:{require: types,label: 'Type of order', key: 'order_type_id', type:'select' }
    },
    {
        a:{require: PickUpDelivery,label: 'Customer First name', key: 'customer_firstname', type:'input' },
        b:{require: PickUpDelivery,label: 'Customer Last name', key: 'customer_lastname', type:'input' }
    },
    {
        a:{require: PickUpDelivery,label: 'Phone', key: 'customer_phone_number', type:'input', kind: 'true' },
    }
    ]

    export let optionForm = {
        [ORDERTYPEEnum.DINE_IN]: DineIn,
        [ORDERTYPEEnum.Delivery]: Delivery,
        [ORDERTYPEEnum.Pick_Up]: PickUp,
    }
