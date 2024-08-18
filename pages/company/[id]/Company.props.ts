import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface CompanyProps extends DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> {
  company?: object[],
}
