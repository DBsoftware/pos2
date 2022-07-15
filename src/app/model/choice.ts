import {JsonProperty} from 'typescript-json-serializer';
import { hexBoth } from './hexa';

export class Choice {
  @JsonProperty('121.179')
  optionId: string = undefined;

  @JsonProperty({name: '122.134', ...hexBoth})
  // @JsonProperty('122.134')
  optionName: string = undefined;
  
  @JsonProperty('122.112')
  choiceId: string = undefined;
  
  @JsonProperty({name: '127.16', ...hexBoth})
  // @JsonProperty('127.16')
  choiceName: string = undefined;

  @JsonProperty('120.84')
  price: number = undefined;

  @JsonProperty('CH')
  choices: Choice[] = [];
}
