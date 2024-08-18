import React, { useEffect, useState } from 'react';
import Layout from 'src/components/shared/Layout';
import bem from 'src/utils/bem';
import Login from '@components/elements/Login';
import getImageUrl from '@utils/getImageUrl';
import styles from './index.module.scss';

const b = bem('login-page', styles);

export async function getServerSideProps() {
  const backgroundImageUrl = await getImageUrl('backround_login.jpg');
  return { props: { backgroundImageUrl } };
}

export default function LoginPage(props: any) {
  const {
    backgroundImageUrl,
  }: {backgroundImageUrl: string} = props;

  return (
    <Layout className={b('')} withoutFooter backgroundImageUrl={backgroundImageUrl}>
      <div
        className={b('login-wrapper')}
      >
        <Login
          className={b('login')}
        />
      </div>
    </Layout>
  );
}
