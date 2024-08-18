import { AppProps } from 'next/app';

export interface NavigationProps {
  props?: AppProps;
  className?: string;
  isLogin?: boolean;
  onLogout?(): void;
}
