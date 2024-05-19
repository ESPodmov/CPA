export type BaseUserData = {
    username: string,
    phone: string,
    email: string,
    password: string
}

export type UpdateUserData = Partial<BaseUserData>