import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export interface CustomInputProps extends DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>, HTMLInputElement
> {
  backGroundImage?: string,
  disabled?: boolean,
  error?: string | any,
  id?: string,
  inputClass?: string,
  isTouched?: boolean | any,
  isValid?: boolean | any,
  mask?: string,
  type?: string,
  onChange(...args: any[]): void,
  withIcon?: boolean,
  withMask?: boolean,
}
