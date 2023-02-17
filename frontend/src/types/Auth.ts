export interface IUser{
    id:string,
    firstName:string,
    lastName:string,
    email:string,
    role:string
}

export interface AuthState{
    user:IUser | null,
    isLogin:boolean,
    token:string | null
}

export interface LoginPayload{
    email:string
    password:string
}