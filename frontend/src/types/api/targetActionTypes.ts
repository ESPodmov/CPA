export type BaseTargetActionData = {
    name: string
}

export type UpdateTargetActionData = Partial<BaseTargetActionData>

export type FullTargetActionData = BaseTargetActionData & {
    pk: string | number;
}
