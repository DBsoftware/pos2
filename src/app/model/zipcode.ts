import {  JsonProperty} from 'typescript-json-serializer';
import { Address } from "./address";
export class Zipcode    {
    @JsonProperty('122.107')
    zipcodeId: string = undefined;
    @JsonProperty('47.17')
    zipcodeName: string = undefined;
    @JsonProperty('114.14')
    cityId: string = undefined;
    @JsonProperty('120.38')
    latitude: number = undefined
    @JsonProperty('120.39')
    longitude: number = undefined
}

