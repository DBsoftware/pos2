import { UtilsService } from "../services/utils/utils.service";

export let hexBoth = {afterDeserialize: UtilsService.hexToHTMLstring, afterSerialize: UtilsService.toHex}
export let hexIn = {afterDeserialize: UtilsService.hexToHTMLstring}
export let hexOUt = {afterSerialize: UtilsService.hexToHTMLstring}
export let padOut = {afterSerialize: UtilsService.padEleven}
export let textOut = {afterSerialize: UtilsService.textIt}
export let trimOut = {afterSerialize: UtilsService.trim}
export let timeIn = {afterDeserialize: UtilsService.timeIn}
export let timeOut = {afterSerialize: UtilsService.timeOut}
export let dateOut = {afterSerialize: UtilsService.dateOut}
export let booleanIn = {afterDeserialize: UtilsService.booleanIn}
