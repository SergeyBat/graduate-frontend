import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface UserProps extends DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> {
  companyList?: object[],
}
