export interface IUser{
    id:string,
    firstName:string,
    lastName:string,
    email:string,
    role:string
}

export interface AuthState{
    user:IUser | null,
    isLoggedIn:boolean,

}

export interface LoginPayload{
    email:string
    password:string
}