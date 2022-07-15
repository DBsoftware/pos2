import {  JsonProperty, Serializable} from 'typescript-json-serializer';
import {Location} from './location';
import { hexBoth, padOut } from './hexa';
import { ORDERDETAILSTATUS } from '../utils/mncTypes-enums';
import * as moment from 'moment';
import { General } from './business';


@Serializable()
export class ChoiceStructure {
	@JsonProperty('122.112')
        public choice_id: string
    @JsonProperty({name: '127.16', ...hexBoth})
	// @JsonProperty('127.16')
        public choice_name: string
    @JsonProperty('120.84')
        public price: string
    @JsonProperty('121.104')
        public selected_id: string
    addChoices(obj){
        let {
            selected_id
        } = obj
        this.selected_id = !!selected_id ? selected_id : undefined
        return this
    }

}

@Serializable()
export class SelectedChoice  extends General{
    @JsonProperty('122.112')
        public choice_id: string
    @JsonProperty({name: '122.134', ...hexBoth})
    // @JsonProperty('122.134')
        public option_name: string
    @JsonProperty({name: '127.16', ...hexBoth})
    // @JsonProperty('127.16')
        public choice_name: string
    @JsonProperty('120.84')
        public price: string
    setSelectedChoice(obj){
        let aux =[
            'option_name',
            'choice_name',
            'choice_id',
            'price'
        ]
        return this.setObject(aux, obj)
    }

}
@Serializable()
export class OptionStructure extends General {
    @JsonProperty('121.179')
    public option_id: string
    @JsonProperty({name: '122.134', ...hexBoth})
    // @JsonProperty('122.134')
    public option_name: string
    @JsonProperty({name:'CH', type: ChoiceStructure})
    public choices: Array<ChoiceStructure>
    @JsonProperty({name:'SC', type: SelectedChoice})
    public selected: SelectedChoice
    setOptionStructure(obj){
        let aux = [
            'option_id',
            'option_name',
            'choices',
            'selected'
        ]
        return this.setObject(aux, obj)
    }
}

@Serializable()
export class Item  extends General  {
    position = undefined

    @JsonProperty({name : '114.47', ...padOut})
    public location_id: string

    @JsonProperty('127.86')
    restaurantFlag: string  = undefined

    @JsonProperty({name: '114.144',...padOut})
    id: string = undefined;

    @JsonProperty('123.21')
    playlistId: string = undefined;

    @JsonProperty('114.112')
    itemType: string = undefined;

    @JsonProperty({name: '120.83', ...hexBoth})
    title: string = undefined;

    @JsonProperty('114.98')
    regularPrice: string = undefined;

    @JsonProperty('122.158')
    sale_price: string = undefined;

    @JsonProperty('120.45')
    category_name: string = undefined;

    @JsonProperty('114.70') // file originalname
    merchantName: string = undefined;

    @JsonProperty('121.150') // file originalname
    merchantName1: string = undefined;

    @JsonProperty('120.40')
    rating: string = undefined;

    @JsonProperty('114.190')
    u1: string = undefined;

    @JsonProperty('127.15')
    u2: string = undefined;

    @JsonProperty('121.140')
    u3: string = undefined;

    @JsonProperty('121.170')
    imageName: string = undefined;

    @JsonProperty('114.9')
    flag: string = undefined;

    @JsonProperty('122.19')
    averageRating: string = undefined;

    @JsonProperty({name: '53', ...padOut})
    merchantId: string = undefined;
    @JsonProperty('114.179')
    merchantIdAlt: string = undefined;

    @JsonProperty('114.143')
    productStatus: string = undefined;

    @JsonProperty('115.42')
    order_detail_status: string = undefined;

    @JsonProperty({name: '120.157', ...hexBoth})
    description: string = undefined;

    @JsonProperty({name:'CH', type: ChoiceStructure})
    public choices: Array<ChoiceStructure>
    @JsonProperty({name:'IR', type: Item})
    public related: Array<Item>


    @JsonProperty('121.80')
    reviewsCnt: string = undefined;

    @JsonProperty('122.162')
    rewardPrice: string = undefined;

    @JsonProperty('114.8')
    consumerBirth: string = undefined;

    @JsonProperty('123.22')
    age21: string = undefined;

    @JsonProperty('123.23')
    age18: string = undefined;

    @JsonProperty('114.121')
    product_qty: string = undefined;

    @JsonProperty('121.18')
    newField: string = undefined;

    @JsonProperty({name:'121.100', ...hexBoth})
    specs: string = undefined;

    @JsonProperty('121.102')
    sku: string = undefined;

    @JsonProperty('122.131')
    model: string = undefined;

    @JsonProperty('120.40')
    ConditionTypeId: string = undefined;

    @JsonProperty('120.11')
    Distance: string = undefined;

    @JsonProperty('120.6')
    availability_flag: string = undefined;

    @JsonProperty('121.39')
    availableId: string = undefined;

    @JsonProperty()
    location: Location = undefined;

    @JsonProperty('127.50')
    fileId: string = undefined;

    @JsonProperty('121.15')
    fileOriginalName: string = undefined;

    @JsonProperty('121.2')
    fileNmcName: string = undefined;
    @JsonProperty('114.149')
    brand: string = undefined;
    @JsonProperty({name : '114.93', ...padOut})
    public category_id: string

    @JsonProperty({name: '115.31', ...padOut})
        order_id: number
    @JsonProperty({name: '121.55', ...hexBoth})
        product_instructions: string
    @JsonProperty({name: 'OP', type: OptionStructure})
        options_list: Array<OptionStructure>
    @JsonProperty('121.104')
        choice_id: string
    @JsonProperty({name: '115.41', ...padOut})
        order_detail_id: string

    public get statusDetail() : string {
        return ORDERDETAILSTATUS[this.order_detail_status]
    }
    public get statusDetailIsDoneDelivered() : boolean {
        return this.statusDetail.includes('Done') || this.statusDetail.includes('Delivered')
    }
    public get statusDetailIsDelivered() : boolean {
        return this.statusDetail && this.statusDetail.includes('Delivered')
    }
    public get statusDetailIsDone() : boolean {
        return this.statusDetail && this.statusDetail.includes('Done')
    }
    public get options() : string {
        return !!this.options_list?  this.options_list.map(e => !!e.selected && !!e.selected.option_name ?`${e.selected.option_name}:&nbsp${e.selected.choice_name}&nbsp+${e.selected.price}`: '').filter(e=> e.length > 0).join('<br>') : ''
    }
    public get optionsReceipt() : string {
        return !!this.options_list?  this.options_list.map(e => !!e.selected && !!e.selected.option_name ?`${e.selected.choice_name}&nbsp+${e.selected.price}`: '').filter(e=> e.length > 0).join('<br>') : ''
    }
    public get subtotal_price(): number{
        return Number(this.sale_price) + (!!this.options_list? this.options_list.map(e => (!!e.selected && !!e.selected.price) ? Number(e.selected.price): 0).reduce((total, e) => total + e,0):0)
    }
    public get totalPerItem(): string{
        return ((Number(this.sale_price) + (!!this.options_list? this.options_list.map(e => (!!e.selected && !!e.selected.price) ? Number(e.selected.price): 0).reduce((total, e) => total + e,0):0))*(!!this.product_qty ? Number(this.product_qty):0) ).toFixed(2)
    }


    setAddItems(obj){
        let {
            order_id,
            id,
            product_qty,
            product_instructions,
            choices,
            order_detail_status,
            order_detail_id
        } = obj
        this.order_id = !!order_id? order_id : undefined
        this.id = !!id? id : undefined
        this.order_detail_id = !!order_detail_id? order_detail_id : undefined
        this.product_qty = !!product_qty? product_qty : undefined
        this.product_instructions = !!product_instructions? product_instructions : undefined
        this.order_detail_status = !!order_detail_status? `${order_detail_status}`: undefined
        this.choices = !!choices ? choices.map(e => new ChoiceStructure().addChoices({selected_id : e.selected_id})) : undefined
    return this
    }
    setRemoveItem(obj){
            let aux = [
                'order_detail_id'
            ]
            return this.setObject(aux, obj)
    }

    setItem(obj){
        let aux = ['restaurantFlag',
            'id',
            'position',
            'playlistId',
            'itemType',
            'title',
            'regularPrice',
            'sale_price',
            'category_name',
            'merchantName',
            'merchantName1',
            'rating',
            'u1',
            'u2',
            'u3',
            'imageName',
            'flag',
            'averageRating',
            'merchantId',
            'merchantIdAlt',
            'productStatus',
            'order_detail_status',
            'description',
            'reviewsCnt',
            'rewardPrice',
            'consumerBirth',
            'age21',
            'age18',
            'limitedCnt',
            'newField',
            'specs',
            'sku',
            'model',
            'ConditionTypeId',
            'Distance',
            'availability_flag',
            'availableId',
            'location',
            'location_id',
            'fileId',
            'fileOriginalName',
            'fileNmcName',
            'brand',
            'order_id',
            'product_qty',
            'product_instructions',
            'category_id',
            'choice_id',
            'choices',
            'options_list',
            'order_detail_id']
        return this.setObject(aux, obj)
    }

    setItemStatus(obj){
        let aux = ['id', 'productStatus']
        return this.setObject(aux, obj)
    }

    setGetRelated(obj){
        let aux = ['id', 'location_id', 'merchantId']
        return this.setObject(aux, obj)
    }
    getPromo(obj){
      let aux = ['itemType',  'merchantId']
        return this.setObject(aux, obj)
    }
}
@Serializable()
export class GetItems extends General{
    @JsonProperty('53')
        public id: string
    @JsonProperty('121.141')
        public full_date: string = moment().format('YYYY-MM-DD HH:mm:ss')
    @JsonProperty('127.89')
        public day_week: string = (moment().weekday() - 1).toString().includes('-1') ? '6' : (moment().weekday() - 1).toString()
    @JsonProperty('120.38')
        public latitude: string = ''
    @JsonProperty('120.39')
        public longitud: string = ''
    @JsonProperty('127.60')
        public sort: string = ''
    @JsonProperty('114.179')
        public merchant_id: string
    @JsonProperty({name: '114.127', ...hexBoth})
        public searchflag: string = ''
    @JsonProperty({name : '114.93', ...padOut})
        public category_id: string
    @JsonProperty({name : '114.47', ...padOut})
        public location_id: string


    setGetItem(obj){
let aux =[
            'id',
            'sort',
            'merchant_id',
            'latitude',
            'longitud',
            'searchflag',
            'category_id',
            'location_id'
        ]
        return this.setObject(aux, obj)
    }
    setGetItemsCategory(obj){
let aux =[
            'id',
            'category_id',
            'merchant_id',
        ]
        return this.setObject(aux, obj)
    }
}
@Serializable()
export class POStructure {
    @JsonProperty({name: '115.41', ...padOut})
        order_detail_id
    @JsonProperty({name: '114.144',...padOut})
        id
    @JsonProperty('114.121')
        product_qty
    @JsonProperty({name: '121.55', ...hexBoth})
        product_instructions
    @JsonProperty('127.60')
        choices
    @JsonProperty('115.42')
        order_detail_status: string = undefined;

    setPO(obj){
        let {
            id,
            product_qty,
            product_instructions,
            options_list,
            order_detail_id,
            order_detail_status,
        } = obj
        this.id = id ? id : ''
        this.product_qty = product_qty ? product_qty : ''
        this.product_instructions = product_instructions ? product_instructions : ''
        this.order_detail_id = order_detail_id ? order_detail_id : ''
        this.order_detail_status = !!order_detail_status ? `${order_detail_status}`: ''
        this.choices = !!options_list ? options_list.map(e =>  this.getSelected(e)).filter(e => !!e).join(',') : ''
        return this
    }

    getSelected(options){
        return options.selected.choice_id? options.selected.choice_id : null
    }
}





