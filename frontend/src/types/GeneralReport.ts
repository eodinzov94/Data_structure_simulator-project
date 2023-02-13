
/*export interface GeneralReport {
    Data: ChartProps[]
}*/


export interface GeneralReport {
    accountsData: AccountsData
    usersData: UsersData
}

export interface AccountsData {
    allRegisteredUsersCount: number
    activeUsersCount: number
}

export interface UsersData {
    usersGroupedByGender: UsersGroupedByGender[]
    usersGroupedByAge: UsersGroupedByAge[]
}

export interface UsersGroupedByGender {
    gender: string
    count: string
}

export interface UsersGroupedByAge {
    age: number
    count: string
}