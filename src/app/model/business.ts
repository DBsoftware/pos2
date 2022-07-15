import { JsonProperty, Serializable} from 'typescript-json-serializer';
import { hexBoth, padOut } from './hexa';
import { Location } from './location';

export class General {
    setObject(aux, obj){
        aux.forEach(e => {
            this[e] = !!obj[e]? obj[e] : undefined
        })
        return this
    }
}

@Serializable()
export class Business extends General   {
    @JsonProperty({name: '114.70', ...hexBoth})
    companyName: string

    @JsonProperty({name: '114.3', ...hexBoth})
    firstName: string

    @JsonProperty({name: '114.4', ...hexBoth})
    middleName: string

    @JsonProperty({name: '114.5', ...hexBoth})
    lastName: string

    @JsonProperty('122.92')
    department: string

    @JsonProperty('114.12')
    addressFirst: string

    @JsonProperty('114.13')
    addressSecond: string

    @JsonProperty('127.86')
    restaurantFlag: string

    @JsonProperty('48.28')
    phoneNumber: string

    @JsonProperty('123.20')
    webSite: string

    @JsonProperty('121.170')
    logo: string

    @JsonProperty('119.17')
    privacy: string

    @JsonProperty('120.157')
    about: string

    @JsonProperty('114.9')
    messages_flag: string

    @JsonProperty('119.18')
    background_color: string
    @JsonProperty('122.49')
    can_delete: string

    @JsonProperty({name:'114.47', ...padOut})
    location_id: string

    @JsonProperty()
    category:string;

    @JsonProperty()
    addresses: string;

    @JsonProperty({name: "LO", type: Location})
    location_info: Array<Location>;

    public get address(){
      return !!this.location_info && this.location_info.length > 0 ?
      `<span>${this.location_info[0].address.addr1}</span><br><span>${this.location_info[0].address.addr2}</span>` :
      ''
    }
    @JsonProperty('114.179')
    merchant_id: string;

    @JsonProperty('53')
    id: string;

    @JsonProperty('127.18')
    token: string;

    public get fullName() : string  {
        return  !!this.lastName ? (!!this.firstName?(this.firstName +' '):'')+this.lastName : undefined
    }

    setBusiness(obj){
        let aux = [
          'companyName',
          'firstName',
          'middleName',
          'lastName',
          'department',
          'addressFirst',
          'addressSecond',
          'restaurantFlag',
          'phoneNumber',
          'webSite',
          'logo',
          'privacy',
          'about',
          'messages_flag',
          'background_color',
          'can_delete',
          'location_id',
          'category',
          'addresses',
          'location_info',
          'merchant_id',
          'id',
          'token',
        ]
        return this.setObject(aux, obj)
    }

    setShowcase(obj){
        let aux = [
            'id',
        ]
        return this.setObject(aux, obj)
    }
    setMessages(obj){
        let aux = [
            'id',
            'messages_flag'
        ]
        return this.setObject(aux, obj)
    }

    setAD(obj){
        let aux = [
            'id',
        ]
        return this.setObject(aux, obj)
    }
    saveRoleLocation(obj){
        let aux = [
            'id',
            'location_id',
            'department'
        ]
        return this.setObject(aux, obj)
    }

}

