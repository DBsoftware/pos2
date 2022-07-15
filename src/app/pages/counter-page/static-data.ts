import * as moment from 'moment';


  export let buttonsRow = [
    {label :'Save', color: 'orange'},
    {label :'Add Items', color: 'yellow'},
    // {label :'Contact Customer', color: 'purple'},
    {label :'Customer History', color: 'blue'},
    {label :'Clear Order', color: 'blue'},
    {label :'Order Complete', color: 'yellow'},
]


export let columnsTableOne = [
  {label: 'alert', variable: 'isReady'},
  {label: 'Order Date/Time', variable: 'order_date'},
  {label: 'Pickup Date/Time', variable: 'order_due_date'},
  {label: 'Order Number', variable: 'order_number'},
  {label: 'Customer Name', variable: 'fullName'},
  {label: 'Customer Phone', variable: 'customer_phone_number'},
  {label: 'Type of service', variable: 'orderType'},
  {label: 'Timer', variable: 'order_date'}]
export let columnsTableTwo = [
  {label: 'Remove', variable: 'order_detail_id'},
  {label: 'Category', variable: 'category_name'},
  {label: 'Menu Item', variable: 'title'},
  {label: 'Options', variable: 'options'},
  {label: 'Special Instructions', variable: 'product_instructions'},
  {label: 'Quantity', variable: 'product_qty'},
  {label: 'Status', variable: 'statusDetail'},
]

export let DineInData = [
  {
    a:{require: false,readonly: true,label:'Order Number', placeholder:  '000-00000', key: 'order_number', type: 'input'  },
    b:{require: false,readonly: true,label:'Order Date/Time', placeholder: moment().format('YYYY-MM-DD hh:mm'), key: 'order_date', type: 'input'  },
    c:{require: false,readonly: false,label:'Due Date/Time', placeholder: 'YYYY-MM-DD hh:mm', key: 'order_due_date', type: 'input'  },
    d:{require: true,readonly: true,label:'Server', placeholder: 'Server name', key: 'employee_name', type: 'input'  }
  },
  {
    a:{require: false,readonly: false,label:'Customer Name', placeholder:  'Last Name', key: 'customer_lastname', type: 'input' },
    b:{require: false,readonly: false,label:'', placeholder:  'Fisrt Name', key: 'customer_firstname', type: 'input' },
    c:{require: false,readonly: false,label:'Customer Phone', placeholder:  'xxxxxxx', key: 'customer_phone_number', type:'input', kind: 'true' },
    d:{require: true,readonly: false,label:'Seating Number Area', placeholder:  '', key: 'seating_area_id', type: 'select' },
    e:{require: true,readonly: false,label:'Table', placeholder: '', key: 'location_table_id', type: 'select' },
  },
  {
    e:{require: false,readonly: false,label: 'Type of order', key: 'order_type_id', type:'select' },
  },
]
export let DeliveryNPickData = [
  {
    a:{require: false,readonly: true,label:'Order Number', placeholder:  '000-00000', key: 'order_number', type: 'input'  },
    b:{require: false,readonly: true,label:'Order Date/Time', placeholder: moment().format('YYYY-MM-DD hh:mm'), key: 'order_date', type: 'input'  },
    c:{require: false,readonly: false,label:'Due Date/Time', placeholder: 'YYYY-MM-DD hh:mm', key: 'order_due_date', type: 'input'  },
    d:{require: true,readonly: true,label:'Server', placeholder: 'Server name', key: 'employee_name', type: 'input'  }
  },
  {
    a:{require: true,readonly: false,label:'Customer Name', placeholder:  'Last Name', key: 'customer_lastname', type: 'input' },
    b:{require: true,readonly: false,label:'', placeholder:  'Fisrt Name', key: 'customer_firstname', type: 'input' },
    c:{require: true,readonly: false,label:'Customer Phone', placeholder:  'xxxxxxx', key: 'customer_phone_number', type:'input', kind: 'true' },
    d:{require: false,readonly: false,label:'Delivery method', placeholder:  'xxxxxxxxxxxxxxxxx', key: 'delivery_id', type: 'select' },
  },
  {
    e:{require: false,readonly: false,label: 'Type of order', key: 'order_type_id', type:'select' },
    b:{require: true,readonly: false,label:'Delivery addres', placeholder:  'Addres line 1', key: 'delivery_address_1', type: 'input' },
    c:{require: false,readonly: false,label:'', placeholder:  'Addres line 2', key: 'delivery_address_2', type: 'input' },
    d:{require: false,readonly: false,label:'', placeholder:  'City', key: 'zipcode_name', type: 'input' },
  },
]
export let PickData = [
  {
    a:{require: false,readonly: true,label:'Order Number', placeholder:  '000-00000', key: 'order_number', type: 'input'  },
    b:{require: false,readonly: true,label:'Order Date/Time', placeholder: moment().format('YYYY-MM-DD hh:mm'), key: 'order_date', type: 'input'  },
    c:{require: false,readonly: false,label:'Due Date/Time', placeholder: 'YYYY-MM-DD hh:mm', key: 'order_due_date', type: 'input'  },
    d:{require: true,readonly: true,label:'Server', placeholder: 'Server name', key: 'employee_name', type: 'input'  }
  },
  {
    a:{require: true,readonly: false,label:'Customer Name', placeholder:  'Last Name', key: 'customer_lastname', type: 'input' },
    b:{require: true,readonly: false,label:'', placeholder:  'Fisrt Name', key: 'customer_firstname', type: 'input' },
    c:{require: true,readonly: false,label:'Customer Phone', placeholder:  'xxxxxxx', key: 'customer_phone_number', type:'input', kind: 'true' },
  },
  {
    e:{require: false,readonly: false,label: 'Type of order', key: 'order_type_id', type:'select' },
  }
]











