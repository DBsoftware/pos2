import {  JsonProperty} from 'typescript-json-serializer';
import {Address} from './address';


export const USER_TYPE = {
    CONSUMER: '10',
    MERCHANT: '20',
    LEAD: '25',
    AGENT: '30',
    ADMIN: '44'
};

export class User    {

    @JsonProperty('53')
    userId: string = '00011010000000000004';

    @JsonProperty('114.5')
    lastName: string = undefined;

    @JsonProperty('114.3')
    firstName: string = undefined;

    @JsonProperty('114.91')
    title: string = undefined;

    @JsonProperty('114.7')
    email: string = undefined;

    @JsonProperty('127.18')
    token: string = undefined;

    @JsonProperty('114.8')
    birthday: string = undefined;

    @JsonProperty()
    addresses: Address[] = [];

    shippingAddress: Address = new Address();
    billingAddress: Address = new Address();

    password: string = undefined;
    confirmPassword: string = undefined;

    public name: string =
        (!localStorage.getItem('accessToken')) ? 'Sign in' :
            this.firstName + ' ' + this.lastName;

    // shoppingCarts: Cart[] = []


    constructor() {
        //this.name = 'Sign in'
        //this.userId =
    }


}
