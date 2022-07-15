import { JsonProperty, Serializable } from "typescript-json-serializer";
import { hexBoth, padOut } from "./hexa";
import { General } from "./business";

@Serializable()
export class Customer extends General {
        @JsonProperty('115.31')
            public id: string
        @JsonProperty('114.179')
            public merchant_id: string
        @JsonProperty({name: '114.3', ...hexBoth})   
            public customer_firstname: string
        @JsonProperty({name: '114.5', ...hexBoth})   
            public customer_lastname: string
        @JsonProperty('48.28')   
            public customer_phone_number: string
        @JsonProperty({name: '114.12', ...hexBoth})  
            public delivery_address_1: string
        @JsonProperty({name: '114.127', ...hexBoth})  
            public searchword: string
        @JsonProperty({name: '114.13', ...hexBoth})  
            public delivery_address_2: string
        @JsonProperty('47.17')   
            public zipcode_name: string

    setNewCustomer(obj){
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
    searchCustomer(obj){
        let aux = [
            'merchant_id',
            'searchword'
        ]
        return this.setObject(aux, obj)
    }
    getCustomerNotes(obj){
        let aux = [
            'customer_phone_number',
        ]
        return this.setObject(aux, obj)
    }

    public get fullName() : string  {
        return  !!this.customer_lastname ? this.customer_lastname +', '+ this.customer_firstname : undefined
    }

    public get fullAddress() {
        return `${!!this.delivery_address_1?this.delivery_address_1: '' } ${!!this.delivery_address_2?this.delivery_address_2: '' }
        `
    }

}

@Serializable()
export class Note extends General {
    @JsonProperty('115.61') 
        public note_id
    @JsonProperty({name: '115.62', ...hexBoth})  
        public customer_note: string
    @JsonProperty('115.63') 
        public note_date
    @JsonProperty({name: '114.53', ...hexBoth})  
        public username: string
    @JsonProperty('114.179')  
        public user_id: string
    @JsonProperty('48.28')   
        public customer_phone_number: string
    
    get completeNote(){
        return `${this.note_date}&nbsp;&nbsp;${this.username}&nbsp;&nbsp;${this.customer_note}`
    }
    setNote(obj){
        let aux = [
            'customer_note',
            'note_date',
            'username',
        ]
        return this.setObject(aux, obj)
    }

    setCustomerNotes(obj){
        let aux = [
            'user_id',
            'customer_note',
            'customer_phone_number'
        ]
        return this.setObject(aux, obj)
    }


}







