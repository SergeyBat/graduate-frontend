import React from 'react';
import Footer from '@components/shared/Footer';
import Navigation from '@components/shared/Navigation';
import bem from 'src/utils/bem';
import { Menu } from 'antd';
import styles from './index.module.scss';
import { LayoutManagerProps } from './LayoutManager.props';

const b = bem('layout-manager', styles);

const LayoutManager = ({ children, className: childrenClassName }: LayoutManagerProps): JSX.Element => (
  <div className={b('')}>
    <Navigation className={b('navigation')} />
    <div className={b('content', { mix: childrenClassName })}>
      {children}
    </div>
    <Footer className={b('footer')} />
  </div>
);

export default LayoutManager;
