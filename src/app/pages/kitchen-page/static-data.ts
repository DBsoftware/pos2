import * as moment from 'moment';


  export let buttonsRow = [
    {label :'Order Complete', color: 'green'},
    {label :'Print Labels', color: 'blue'},
]


export let longHeaderData = [
  {
    a:{require: false,readonly: true,label:'order number', placeholder:  '000-00000', key: 'order_number', type: 'input'  },
    b:{require: true,readonly: true,label:'Order Date/Time', placeholder: moment().format('YYYY-MM-DD hh:mm'), key: 'order_date', type: 'input'  },
    c:{require: true,readonly: false,label:'Due Date/Time', placeholder: 'YYYY-MM-DD hh:mm', key: 'order_due_date', type: 'input'  },
  },
  {
    a:{require: true,readonly: false,label:'Customer name', placeholder:  'Last Name', key: 'customer_lastname', type: 'input' },
    b:{require: true,readonly: false,label:'', placeholder:  'Fisrt Name', key: 'customer_firstname', type: 'input' },
    c:{require: true,readonly: false,label:'seating number Area', placeholder:  '', key: 'seating_area_id', type: 'select' },
    d:{require: true,readonly: false,label:'table', placeholder:  '', key: 'location_table_id', type: 'select' },
  },
  {
    d:{require: false,readonly: false,label: 'Type of order', key: 'order_type_id', type:'select' }
    // a:{require: false,readonly: false,label:'Delivery method', placeholder:  'xxxxxxxxxxxxxxxxx', key: 'delivery_id', type: 'input' },
  },
]

export let columnsTableTwoKitchen = [
  {label: 'Done', variable: 'order_detail_id'},
  {label: 'Category', variable: 'category_name'},
  {label: 'Menu Item', variable: 'title'},
  {label: 'Options', variable: 'options'},
  {label: 'Special Instructions', variable: 'product_instructions'},
  {label: 'Quantity', variable: 'product_qty'},
  {label: 'Status', variable: 'statusDetail'},
]
