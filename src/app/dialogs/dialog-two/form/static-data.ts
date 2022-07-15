
 export let  staticData = [
  {
    a: {require: true, key: 'customer_firstname',label: 'Customer First Name'},
    b: {require: true, key: 'customer_lastname',label: 'Customer Last Name'},
    c: {require: true, key: 'customer_phone_number',label: 'Customer Phone'},
  },
  {
    a: {require: false, key: 'delivery_address_1',label: 'Address 1'},
    b: {require: false, key: 'delivery_address_2',label: 'Address 2'},
    c: {require: false, key: 'zipcode_name',label: 'Zip'}
  }
]