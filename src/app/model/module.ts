import {JsonProperty} from 'typescript-json-serializer';
import {Item} from './item';

export class Module {
    @JsonProperty('123.5')
    moduleId: number = undefined;

    @JsonProperty('123.6')
    moduleTypeId: string = undefined;

    @JsonProperty('127.54')
    moduleRow: string = undefined;

    @JsonProperty('114.121')
    moduleQty: number = undefined;

    @JsonProperty('123.7')
    moduleName: string = undefined;

    @JsonProperty('123.8')
    moduleColor: string = undefined;

    @JsonProperty('123.9')
    moduleImage: string = undefined;

    @JsonProperty({clazz: Item, name: 'IR'})
    items: Item[] = [];
}