export type BaseUserData = {
    username: string| null,
    phone: string | null,
    email: string,
    password: string
}

export type UpdateUserData = Partial<BaseUserData>