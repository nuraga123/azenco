import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form'

export interface IInputs {
  name: string
  email: string
  password: string
}

export interface IAuthPageInput {
  register: UseFormRegister<IInputs>
  errors: FieldErrors<IInputs>
}

export interface IAuthPageInputLogin extends IAuthPageInput {
  usernames: string[]
  setValue: UseFormSetValue<IInputs>
}

export interface ISingUpFx {
  username: string
  url: string
  email: string
  password: string
}

export interface ISignInFx {
  username: string
  password: string
  url: string
}
