import { TText } from "@udecode/plate-common"
import { ElementTypes } from "./config/pluginOptions"

export type KeyImageElement = {
    type: ElementTypes.keyImage
    id: string
    url?: string
    children: TText[]
    editable_image?: boolean
  }
  