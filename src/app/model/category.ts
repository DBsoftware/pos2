import {  JsonProperty, Serializable} from 'typescript-json-serializer';
import { Item } from './item';

@Serializable()
export class Category    {

    @JsonProperty('114.93')
    category_id: string = undefined;

    @JsonProperty('120.45')
    ParentCategoryName: string = undefined;

    @JsonProperty('114.53')
    category_Name: string = undefined;

    @JsonProperty('120.44')
    level: string = undefined;

    @JsonProperty('122.21')
    parentId: string = undefined;

    @JsonProperty('127.66')
    treeId: string = undefined;
    
    @JsonProperty('127.111')
    treeNames: string = undefined;
    
    @JsonProperty({name: 'PC', type: Item})
    PC: Array<Item> = [];
    @JsonProperty('AD')
    AD: Array<any> = [];
    @JsonProperty('ME')
    ME: Array<any> = [];

    @JsonProperty()
    childCats: Category[] = [];

    parentCat: Category = undefined;

    hasSubCategory: boolean;

    public get hasContent(): boolean {
        return this.PC.length > 0
    };


}
