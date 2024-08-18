import React, { useState } from 'react';
import bem from 'src/utils/bem';
import dynamic from 'next/dynamic';
import { NavigationProps } from 'src/components/shared/Navigation/Navigation.props';
import Portal from 'src/HOC/Portal';
import Login from 'src/components/elements/Login';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { connect } from 'react-redux';
import { Button, Dropdown } from 'antd';
import actions from 'src/redux/user/actions/index';
import { useAppDispatch, useAppSelector } from 'src/hooks/reduxHooks/hooks';
import Logo from 'src/components/elements/Logo';
import User from 'src/components/svg/User';
import styles from './index.module.scss';
import constants from './constants';

const b = bem('navigation', styles);

const {
  LINKS,
  USER_LINKS,
} = constants;

function Navigation(props: NavigationProps) {
  const dispatch = useAppDispatch();
  const {
    className = '',
  } = props;

  const {
    roleId,
    firstName,
    lastName,
    isLogin = false,
  } = useAppSelector(({ auth, user }) => ({ ...auth, ...user }));
  // const [showLogin, setShowLogin] = useState(false);
  const path = usePathname();

  const profileItemsLinks: any = USER_LINKS.map((item, index) => {
    const {
      path: pathLinks = '',
      title,
      forManager,
      forAdmin,
      isLogoutBtn,
    } = item;
    if (isLogoutBtn) {
      return {
        key: String(index),
        label: (
          <Button onClick={() => dispatch(actions.onLogout())} className={b('logout-btn')}>
            {title}
          </Button>
        ),
      };
    }
    if ((forManager && roleId !== 2) || (forAdmin && roleId !== 1)) {
      return null;
    }
    return {
      key: String(index),
      label: (
        <Link href={pathLinks} className={b('profile-link')} key={pathLinks}>
          {title}
        </Link>
      ),
    };
  });

  return (
    <nav className={b('', { mix: className })}>
      <div className={b('nav-wrapper')}>
        <Link className={b('logo-wrap')} href="/">
          <Logo />
        </Link>
        <div className={b('actions')}>
          <div
            className={b('links')}
          >
            {LINKS.map((item) => (
              <Link href={item.path} className={b('link', { 'active-tab': path === item.path })} key={item.path}>
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        {path !== '/login' && (isLogin
          ? (
            <div className={b('user-wrapper')}>
              {firstName
                && lastName
                && <span className={b('user-info')}>{`${firstName} ${lastName}`}</span>}
              <Dropdown
                menu={{ items: profileItemsLinks }}
                placement="bottomLeft"
                overlayClassName={b('dropdown-overlay')}
              >
                <Button className={b('button-user')}>
                  <User fill="#fff" className={b('user-icon')} />
                </Button>
              </Dropdown>
            </div>
          ) : (
            <Link
              className={b('login-button')}
              href="/login"
            >
              Войти
            </Link>
          )
        )}
      </div>
    </nav>
  );
}

export default Navigation;
