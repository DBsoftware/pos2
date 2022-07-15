import {Country} from './country';
import {State} from './state';
import {City} from './city';
import {Zipcode} from './zipcode';
import { JsonProperty, Serializable} from 'typescript-json-serializer';
import {ADDR1, ADDR2} from './nmc_fields';
import { hexIn } from './hexa';

@Serializable()
export class Address    {
    @JsonProperty({name: ADDR1, ...hexIn})
    public addr1: string = undefined;

    @JsonProperty({name: ADDR2, ...hexIn})
    public addr2: string = undefined;

    @JsonProperty("114.53")
    addrName: string = undefined

    @JsonProperty("114.115")
    addrType: string = undefined

    @JsonProperty()
    country: Country = undefined

    @JsonProperty()
    state: State = undefined

    @JsonProperty()
    city: City = undefined

    @JsonProperty()
    zipcode: Zipcode = undefined

    toString() {
        return `${this.addr1} ${this.addr2}`;
    }


}
