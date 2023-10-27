import { FieldErrors, UseFormRegister } from 'react-hook-form'

export interface IInputs {
  name: string
  email: string
  password: string
}

export interface IAuthPageInput {
  register: UseFormRegister<IInputs>
  errors: FieldErrors<IInputs>
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
