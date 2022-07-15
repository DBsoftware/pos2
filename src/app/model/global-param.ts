import {Category} from "./category";

export class GlobalParam {
  IMAGE_URL
  VIDEO_URL
  INVOICE_PATH
  IMAGE_URL_MESSAGES
  rootCategories :Category[]

  constructor(image_url) {
    this.IMAGE_URL = image_url
    this.rootCategories  = []
  }
}
