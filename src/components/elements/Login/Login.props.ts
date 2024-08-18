import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ISignInAction {
  email: string;
  password: string;
  callBack?(): void;
}
export interface ISignUpAction {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  phone: string;
  callBack?(): void;
}

export interface LoginProps extends DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>, HTMLDivElement
> {
  isModal?: boolean;
  isWrongLogin?: boolean;
  onClose(...args: any[]): void;
  signInAction({
    email,
    password,
    callBack,
  }: ISignInAction): void,
  signUpAction({
    firstName,
    lastName,
    email,
    password,
    phone,
    callBack,
  }: ISignUpAction): void,
}
