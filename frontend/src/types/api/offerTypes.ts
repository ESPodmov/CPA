import { BaseOfferMediaData } from "./offerMediaTypes"

export type BaseOfferData = {
    image: File,
    category: number,
    name: string,
    partner: number,
    type: number,
    reward_from: number | null,
    reward_to: number | null,
    medias: Array<BaseOfferMediaData>,
    description: string,
    rules: string,
    target_action: number,
    source_url: string,
}

export type UpdateOfferData = Partial<BaseOfferData>
