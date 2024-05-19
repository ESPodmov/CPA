export type BasePayoutData = {
    conversion: number,
    amount: number,
    user: number,
    status: string,
}

export type UpdatePayoutData = Partial<BasePayoutData>
