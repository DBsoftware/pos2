import {  JsonProperty} from 'typescript-json-serializer';

export class MerchantRating   {

    @JsonProperty('122.129')
    rating: string = undefined;

    @JsonProperty('114.121')
    ratingNumber: string = undefined;
}
export class Rating   {

    @JsonProperty('53')
    userId: string = undefined;

    @JsonProperty('121.80')
    ratingId: string = undefined;
    
    @JsonProperty('120.83')
    comment: string = undefined;

    @JsonProperty('114.3')
    firstName: string = undefined;
    
    @JsonProperty('114.5')
    lastName: string = undefined;

    @JsonProperty('122.129')
    rating: string = undefined;
 
    @JsonProperty('114.138')
    date: string = undefined;
    @JsonProperty('114.139')
    dateModify: string = undefined;
}