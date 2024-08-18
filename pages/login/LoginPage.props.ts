import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface LoginPageProps extends DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> {
  companyList?: object[],
}
