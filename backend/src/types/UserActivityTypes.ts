export interface UserActivityAttributes extends UserActivityInput{
  id:number
  createdAt?: Date
}
export interface UserActivityInput{
  userID:number
  subject:string
  algorithm?:string
  action?:string
}

export interface ActivityBody{
  subject:string
  algorithm?:string
  action?:string
}