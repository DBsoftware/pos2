import {JsonProperty} from "typescript-json-serializer";

export class Image {
  @JsonProperty("120.86")
  imageId: string = undefined

  @JsonProperty("47.42")
  imageFile: string = undefined

  @JsonProperty("120.33")
  imageType: string = undefined
}
