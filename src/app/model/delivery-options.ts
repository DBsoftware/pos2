import {JsonProperty, Serializable} from 'typescript-json-serializer';
import { General } from './business';

export class DeliveryOptions {
    @JsonProperty("121.109")
    deliveryId: string = undefined;

    @JsonProperty("122.133")
    optionName: string = undefined;

    @JsonProperty("122.39")
    service: string = undefined

    @JsonProperty("120.157")
    tier: string = undefined;

    @JsonProperty("122.161")
    price: number = undefined;

    @JsonProperty("123.60")
    trackingCode: string = undefined;
}

@Serializable()
export class DeliveryMethods extends General {
    @JsonProperty("53") 
        merchant_id
    @JsonProperty("122.109")
        delivery_id
    @JsonProperty("122.133")
        delivery_company_option
    @JsonProperty("122.39")
        delivery_company_service
    @JsonProperty("120.157")
        delivery_options_tier
    @JsonProperty("122.161")
        delivery_company_price
    @JsonProperty("123.60")
        tracking_code
    @JsonProperty("114.9")
        delivery_default_flag

    setDeliveyMethods(obj){
        let aux = ['merchant_id']
        return this.setObject(aux, obj)
    }

    get label(){
        return `${this.delivery_company_option}-${this.delivery_company_service}: ${this.delivery_company_price}`
    }

}
