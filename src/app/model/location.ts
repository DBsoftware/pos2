import {  JsonProperty, Serializable} from 'typescript-json-serializer';
import { Address } from "./address";
import { hexBoth, padOut } from './hexa';

@Serializable()
export class Location     {
    @JsonProperty({name : '114.47', ...padOut})
    location_id: string;
    @JsonProperty({name: '114.70', ...hexBoth})
    location_name: string;

    @JsonProperty({name: '114.53', ...hexBoth})
    locationName: string;

    @JsonProperty({name:'AD', type: Address})
    address: Address;

    @JsonProperty('120.38')
    latitude: string;

    @JsonProperty('120.39')
    longitude: string;
}
