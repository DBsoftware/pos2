import {   JsonProperty } from 'typescript-json-serializer';

export class PinPoint    {
  @JsonProperty('CO')
  country: any = undefined
  @JsonProperty('ST')
  state: any = undefined
  @JsonProperty('CI')
  city: any = undefined
}
