import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface CustomSwitchProps extends DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>, HTMLDivElement
> {
  firstText: string;
  secondText: string;
  activeTab: any;
  values: {
    valueFirst: string | number | [] | object,
    valueSecond: string | number | [] | object,
  };
  toggleActiveTab(value: any): void;
  buttonClassName?: string;
  wrapperClassName?: string;
}
