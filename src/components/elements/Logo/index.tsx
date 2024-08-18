import React from 'react';
import bem from '@utils/bem';
import { LogoProps } from '@components/elements/Logo/Logo.props';
import LogoImage from 'public/img/Logo.png';
import { Image } from 'antd';
import styles from './index.module.scss';
import constants from './constants';

const b = bem('logo', styles);

const {
  LOGO_TITLE,
} = constants;

function Logo({ withoutTitle = false, withImage = false }: LogoProps): JSX.Element {
  return (
    <div className={b()}>
      {withImage && <Image src={LogoImage.src} className={b('image')} preview={false} />}
      {!withoutTitle && <span className={b('title')}>{LOGO_TITLE}</span>}
    </div>
  );
}

export default Logo;
