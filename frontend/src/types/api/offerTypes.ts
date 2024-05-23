import { FullOfferCategoryData } from "./offerCategoryTypes";
import { BaseOfferMediaData } from "./offerMediaTypes"
import { FullTargetActionData } from "./targetActionTypes";

export type BaseOfferData = {
    image: File | string,
    category: number,
    name: string,
    partner: number,
    type: number,
    reward_from: number | null,
    reward_to: number | null,
    medias: BaseOfferMediaData[],
    description: string,
    rules: string,
    target_action: number,
    source_url: string,
}

export type UpdateOfferData = Partial<BaseOfferData>


export type FullOfferData = Omit<BaseOfferData, "image"> & {
    pk: number | string,
    image: string,
    target_action_data: FullTargetActionData,
    category_data: FullOfferCategoryData,
}
