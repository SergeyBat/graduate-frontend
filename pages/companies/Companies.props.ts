import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface CompaniesProps extends DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> {
  companyList?: object[],
}
