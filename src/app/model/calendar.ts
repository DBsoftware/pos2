import { JsonProperty, Serializable } from 'typescript-json-serializer';
import { booleanIn, dateOut, hexBoth, padOut, textOut, timeIn, timeOut, trimOut } from './hexa';
import { General } from './business';
@Serializable()
export class Calendar extends General    {

  @JsonProperty("53")user_id = undefined
  @JsonProperty({name: '114.179', ...padOut}) assign = undefined
  @JsonProperty({name: '114.144', ...padOut}) promo = undefined
  @JsonProperty({name: '117.13', ...padOut}) seating_area_id = undefined
  @JsonProperty({name: '114.47', ...padOut}) location_id = undefined
  @JsonProperty({name:'116.200', ...padOut}) reservation_id = undefined
  @JsonProperty({name: '116.201', ...dateOut}) reservation_date = undefined
  @JsonProperty({name:'116.202', ...timeIn, ...timeOut}) calendar_startHour = undefined
  @JsonProperty({name:'116.203', ...timeIn, ...timeOut}) calendar_endHour = undefined
  @JsonProperty('116.204') number_people = undefined
  @JsonProperty('116.205') number_children = undefined
  @JsonProperty({name: '116.206', ...textOut, ...booleanIn}) wheelchair  = undefined
  @JsonProperty({name: '116.207', ...textOut, ...booleanIn}) child_seating = undefined
  @JsonProperty({name: '115.21', ...padOut}) location_table_id = undefined
  @JsonProperty({name: '115.71', ...padOut}) order_type_id = undefined
  @JsonProperty({name:'114.53', ...hexBoth}) fullName  = undefined
  @JsonProperty({name:'48.28', ...trimOut}) customer_phone_number = undefined
  @JsonProperty('114.7') email = undefined
  @JsonProperty('114.51') email2 = undefined
  @JsonProperty({name:'121.55', ...hexBoth}) special_request  = undefined
  @JsonProperty({name:'117.16', ...hexBoth}) notes  = undefined

  setAppoiment(obj){
    let aux = [
      "user_id",
      "assign",
      "promo",
      "location_id",
      "reservation_id",
      "seating_area_id",
      "reservation_date",
      "calendar_startHour",
      "calendar_endHour",
      "number_people",
      "number_children",
      "wheelchair",
      "child_seating",
      "location_table_id",
      "order_type_id",
      "fullName",
      "customer_phone_number",
      "email",
      "email2",
      "special_request",
      "notes",
    ]
    return this.setObject(aux, obj)
}

setSearchById(obj){
  let aux = [
    "reservation_id",

  ]
  return this.setObject(aux, obj)
}

}



