import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface AdminProps extends DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> {
  companyList?: object[],
}
