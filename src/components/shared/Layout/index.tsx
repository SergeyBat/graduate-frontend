import React from 'react';
import Footer from '@components/shared/Footer';
import Navigation from '@components/shared/Navigation';
import bem from 'src/utils/bem';
import styles from './index.module.scss';
import { LayoutProps } from './Layout.props';

const b = bem('layout', styles);

const Layout = ({
  children, className: childrenClassName, withoutFooter = false, backgroundImageUrl = '',
}: LayoutProps): JSX.Element => (
  <div
    className={b('', { withoutFooter })}
  >
    <Navigation className={b('navigation')} />
    <div
      className={b('content', { mix: childrenClassName })}
      style={backgroundImageUrl ? { backgroundImage: `url(${backgroundImageUrl})` } : {}}
    >
      {children}
    </div>
    {!withoutFooter && <Footer className={b('footer')} />}
  </div>
);

export default Layout;
