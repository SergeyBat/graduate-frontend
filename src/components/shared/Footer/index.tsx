import React from 'react';
import bem from 'src/utils/bem';
import dynamic from 'next/dynamic';
import { FooterProps } from './Footer.props';
import styles from './index.module.scss';
import constants from './constants';

const Logo = dynamic(() => import('src/components/elements/Logo'));
const LogoTelegram = dynamic(() => import('src/components/svg/LogoTelegram'));
const LogoVk = dynamic(() => import('src/components/svg/LogoVk'));

const b = bem('footer', styles);
const {
  EMAIL,
  POLITIC,
  ABOUT_US,
  COPYRIGHT_TEXT,
} = constants;

function Footer({ className }: FooterProps): JSX.Element {
  return (
    <footer className={b({ mix: className })}>
      <div className={b('container')}>
        <div className={b('copyright-text')}>
          {COPYRIGHT_TEXT}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
