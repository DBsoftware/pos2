import { JsonProperty, Serializable } from "typescript-json-serializer"
import { UtilsService } from "../services/utils/utils.service"
import {  hexBoth, padOut } from "./hexa"

@Serializable()
export class SeatingArea {
    @JsonProperty({name : '114.47', ...padOut})
    public location_id: number
    @JsonProperty({name : '115.11', ...padOut})
    public seating_area_id: string
    @JsonProperty({name: '115.12', ...hexBoth})
    public section_name: string
    @JsonProperty('115.13')
    public section_tables_qty: number

    setSeatingArea(obj){
        let {
            location_id,
            seating_area_id,
            section_name,
            section_tables_qty
        } = obj
        this.location_id = location_id
        this.seating_area_id = seating_area_id
        this.section_name = section_name
        this.section_tables_qty = section_tables_qty

        return this
    }

}

@Serializable()
export class Table {
    @JsonProperty('115.11')
        public seating_area_id: number
    @JsonProperty('115.21')
        location_table_id: number
    @JsonProperty({name:'115.22', ...hexBoth})
        location_table_name: string
    @JsonProperty('115.23')
        location_table_seats_qty: number
    @JsonProperty('115.24')
        location_table_QRCode: string

}

@Serializable()
export class Assigns {
    @JsonProperty({name : '53', ...padOut})
    public id: string
    @JsonProperty({name: '114.3', ...hexBoth})
    public assig_name: string
    @JsonProperty({name: '114.5', ...hexBoth})
    public assig_lastname: string

    get label(){
      return `${this.assig_name} ${this.assig_lastname}`
    }
    get assign(){
      return this.id
    }
  }
@Serializable()
export class Promo {
    @JsonProperty({name : '114.144', ...padOut})
    public promo: string
    @JsonProperty({name: '120.83', ...hexBoth})
    public label: string
  }








