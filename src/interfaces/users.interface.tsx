export interface LoginI {
  username: string;
  password: string;
}

export interface RootUser {
  code: number
  message: string
  data: DataUserI
}

export interface DataUserI {
  id: string
  username: string
  password: string
  roles: string
}
