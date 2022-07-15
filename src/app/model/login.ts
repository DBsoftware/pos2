import { JsonProperty, Serializable } from "typescript-json-serializer";
import { UtilsService } from "../services/utils/utils.service";
@Serializable()
export class Login {
  @JsonProperty('114.7')
  public email: string
  @JsonProperty({name: '52', afterDeserialize: UtilsService.hexToHTMLstring, afterSerialize: UtilsService.toHex})
  public password: string


}
@Serializable()
export class GlobalSettings {
  @JsonProperty('127.14')
  public global_params: string

}

