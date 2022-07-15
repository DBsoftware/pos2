import {JsonProperty} from 'typescript-json-serializer';
import {Template} from './template';

export class StoreFront   {
    @JsonProperty('123.1')
    storefrontId: string = undefined;
    @JsonProperty('120.83')
    storefrontName: string = undefined;
    @JsonProperty('53')
    userId: string = undefined;
    @JsonProperty('114.53')
    userName: string = undefined;
    @JsonProperty('121.140')
    dateModifyed: Date = undefined;

    @JsonProperty('TM')
    template: Template = new Template();


}