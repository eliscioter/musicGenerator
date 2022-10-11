export interface User {
    id?: string
    username: string;
    password: string;
    role?: [string]
    accessToken?: string;
    refreshToken?: string;
}