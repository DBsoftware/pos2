import {JsonProperty} from 'typescript-json-serializer';
import {Module} from './module';

export class Template {

    @JsonProperty('123.2')
    templateId :number = undefined

    @JsonProperty('123.3')
    templateName : string = undefined

    @JsonProperty('121.170')
    templateImage : string = undefined

    @JsonProperty({clazz: Module, name: 'MD'})
    modules: Module[] = [];
}