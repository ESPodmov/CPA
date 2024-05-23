export type BaseOfferCategoryData = {
    name: string,
}

export type UpdateOfferCategoryData = Partial<BaseOfferCategoryData>

export type FullOfferCategoryData = BaseOfferCategoryData & {
    pk: string | number;
}
