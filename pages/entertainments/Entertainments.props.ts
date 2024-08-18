import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface EntertainmentsProps extends DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> {
  entertainments?: object[],
}
