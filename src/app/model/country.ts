import {  JsonProperty} from 'typescript-json-serializer';

export class Country    {

    @JsonProperty('122.87')
    countryId: string = undefined;

    @JsonProperty('47.18')
    countryName: string = undefined;

    @JsonProperty('120.129')
    countryCode: string  = undefined;

    @JsonProperty('114.17')
    countryIndicative: string = undefined;

}
