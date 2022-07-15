
export class Phone     {
  countryCode: string
  num: string = ""
  ext: string
  name: string

  constructor(name: string, num: string = "") {
    this.name = name
    this.num = num

  }
}
