import {  JsonProperty} from 'typescript-json-serializer';

export class City     {
    @JsonProperty('114.14')
  cityId: string = undefined
    @JsonProperty("47.15")
  cityName: string = undefined
    @JsonProperty("120.13")
  stateId: string = undefined
}
