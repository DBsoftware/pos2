import {  JsonProperty} from 'typescript-json-serializer';

export class State    {

    @JsonProperty('120.13')
    stateId: string = undefined;

    @JsonProperty('47.16')
    stateName: string = undefined;

    @JsonProperty('122.87')
    countryId: string = undefined;
}
