import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface LayoutManagerProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children: ReactNode;
  navColor?: string;
}
