export interface storeTypes{
  token: string,
  isAdmin:boolean
}


export interface userDetail{
  name: string;
  total_ballance: boolean;
}

export interface userDetails{
  user:userDetail[]
}