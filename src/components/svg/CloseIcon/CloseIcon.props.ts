import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface CloseIconProps extends DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>, HTMLOrSVGElement
>{
  fill?: string;
  width?: string;
  height?: string;
  stroke?: string;
}
