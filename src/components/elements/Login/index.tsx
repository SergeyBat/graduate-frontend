import React, { useEffect, useRef, useState } from 'react';
import bem from 'src/utils/bem';
import {
  ISignInAction,
  ISignUpAction,
  LoginProps,
} from 'src/components/elements/Login/Login.props';
import { Formik } from 'formik';
import * as Yup from 'yup';
import dynamic from 'next/dynamic';
import DICTIONARY from 'src/constants/dictionary';
import INPUTS_NAMES from 'src/constants/inputsNames';
import ERRORS from 'src/constants/errors';
import CustomInput from 'src/components/inputs/CustomInput';
import { connect } from 'react-redux';
import actions from 'src/redux/auth/actions/index';
import { useRouter } from 'next/router';
import styles from './index.module.scss';

const CloseIcon = dynamic(() => import('src/components/svg/CloseIcon'));
const CustomSwitch = dynamic(() => import('src/components/inputs/CustomSwitch'));

const b = bem('login', styles);

const {
  LOGIN,
  FORGOT_PASSWORD,
  REGISTER,
  EMAIL,
  PASSWORD,
  FIRST_NAME,
  LAST_NAME,
  CONFIRM_PASSWORD,
  SIGNUP,
  SIGN_UP_PHONE,
} = DICTIONARY;

const {
  SHOULD_BE_FILLED,
  INVALID_EMAIL,
  SHORT_PASSWORD,
  WRONG_LOGIN,
  ENTER_NAME,
  CONFIRM_PASSWORD_ERROR,
  ENTER_PHONE,
} = ERRORS;

const schema = Yup.object().shape({
  email: Yup.string().email(INVALID_EMAIL).trim().required(SHOULD_BE_FILLED),
  password: Yup.string().min(6, SHORT_PASSWORD).required(SHOULD_BE_FILLED),
});

const schemaSingUp = Yup.object().shape({
  email: Yup.string().email(INVALID_EMAIL).trim().required(SHOULD_BE_FILLED),
  password: Yup.string().min(6, SHORT_PASSWORD).required(SHOULD_BE_FILLED),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], CONFIRM_PASSWORD_ERROR)
    .required(SHOULD_BE_FILLED),
  firstName: Yup.string().required(ENTER_NAME),
  lastName: Yup.string().required(ENTER_NAME),
  phone: Yup.string().min(11, ENTER_PHONE).required(SHOULD_BE_FILLED),
});

const Login = ({
  isModal = false,
  isWrongLogin = false,
  onClose,
  signInAction,
  signUpAction,
}: LoginProps) => {
  const CustomSwitchValue = {
    valueFirst: 'authorisation',
    valueSecond: 'registration',
  };
  const router = useRouter();

  const [activeTab, changeActiveTab] = useState();
  const [isForgotType, setForgotTypeState] = useState(false);

  const rootEl = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClick = (event: Event) => {
      const target = event.target as HTMLDivElement;
      if (
        rootEl
        && rootEl.current
        && rootEl.current
        && !rootEl.current.contains(target)
      ) {
        onClose();
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [onClose]);

  const onSubmitSignIn = ({ email, password }: ISignInAction) => {
    signInAction({
      email,
      password,
      callBack: () => router.push('/'),
    });
  };

  const onSubmitSignUp = ({
    firstName,
    lastName,
    email,
    password,
    phone,
  }: ISignUpAction) => {
    signUpAction({
      firstName,
      lastName,
      email,
      password,
      phone,
      callBack: () => router.push('/'),
    });
  };

  return (
    <div className={b('', { 'is-modal': isModal })}>
      <div className={b('login-wrapper')} ref={isModal ? rootEl : null}>
        <div className={b('control')}>
          <CustomSwitch
            className={b('switch')}
            firstText={LOGIN}
            secondText={REGISTER}
            toggleActiveTab={changeActiveTab}
            activeTab={activeTab}
            values={CustomSwitchValue}
          />
          {isModal && (
            <button
              className={b('close-button')}
              type="button"
              onClick={() => onClose()}
            >
              <CloseIcon />
            </button>
          )}
        </div>
        <div className={b('form-wrapper')}>
          {
            activeTab === CustomSwitchValue.valueFirst ? (
              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={schema}
                onSubmit={(values: ISignInAction) => onSubmitSignIn(values)}
              >
                {({
                  errors,
                  handleSubmit,
                  touched,
                  handleChange,
                  values,
                }) => {
                  const {
                    email,
                    password,
                  } = values;
                  return (
                    <form onSubmit={handleSubmit} name={CustomSwitchValue.valueFirst}>
                      <fieldset className={b('fieldset')}>
                        <CustomInput
                          id="login-email"
                          className={b('input-wrapper')}
                          inputClass={b('input')}
                          onChange={handleChange}
                          name={INPUTS_NAMES.email}
                          placeholder={EMAIL}
                          value={email}
                          isTouched={touched.email}
                          error={errors.email}
                          isValid={!errors.email}
                          withMask={false}
                        />
                        <CustomInput
                          id="login-password"
                          className={b('input-wrapper')}
                          inputClass={b('input')}
                          onChange={handleChange}
                          name={INPUTS_NAMES.password}
                          placeholder={PASSWORD}
                          type={PASSWORD}
                          value={password}
                          isTouched={touched.password}
                          error={errors.password}
                          isValid={!errors.password}
                          withMask={false}
                        />
                        {isWrongLogin && <p className={b('invalid')}>{WRONG_LOGIN}</p>}
                        <div className={b('container')}>
                          <button
                            className={b('forgot')}
                            type="button"
                            onClick={() => {}}
                          >
                            {FORGOT_PASSWORD}
                          </button>
                        </div>
                        <button className={b('btn')} type="submit">
                          {SIGNUP}
                        </button>
                      </fieldset>
                    </form>
                  );
                }}
              </Formik>
            ) : (
              <Formik
                initialValues={{
                  email: '',
                  password: '',
                  confirmPassword: '',
                  firstName: '',
                  lastName: '',
                  phone: '',
                }}
                validationSchema={schemaSingUp}
                onSubmit={(values: ISignUpAction) => onSubmitSignUp(values)}
              >
                {({
                  errors,
                  handleSubmit,
                  touched,
                  handleChange,
                  values,
                }) => {
                  const {
                    firstName,
                    lastName,
                    email,
                    password,
                    confirmPassword,
                    phone,
                  } = values;
                  return (
                    <form onSubmit={handleSubmit} name={CustomSwitchValue.valueSecond}>
                      <fieldset className={b('fieldset')}>
                        <div className={b('names')}>
                          <CustomInput
                            className={b('input-wrapper')}
                            inputClass={b('input')}
                            onChange={handleChange}
                            name={INPUTS_NAMES.firstName}
                            placeholder={FIRST_NAME}
                            value={firstName}
                            isTouched={touched.firstName}
                            error={errors.firstName}
                            isValid={!errors.firstName}
                            withMask={false}
                          />
                          <CustomInput
                            className={b('input-wrapper')}
                            inputClass={b('input')}
                            onChange={handleChange}
                            name={INPUTS_NAMES.lastName}
                            placeholder={LAST_NAME}
                            value={lastName}
                            isTouched={touched.lastName}
                            error={errors.lastName}
                            isValid={!errors.lastName}
                            withMask={false}
                          />
                        </div>
                        <CustomInput
                          id="login-email"
                          className={b('input-wrapper')}
                          inputClass={b('input')}
                          onChange={handleChange}
                          name={INPUTS_NAMES.email}
                          placeholder={EMAIL}
                          value={email}
                          isTouched={touched.email}
                          error={errors.email}
                          isValid={!errors.email}
                          withMask={false}
                        />
                        {' '}
                        <CustomInput
                          id="login-email"
                          className={b('input-wrapper')}
                          inputClass={b('input')}
                          onChange={handleChange}
                          name={INPUTS_NAMES.phone}
                          placeholder={SIGN_UP_PHONE}
                          value={phone}
                          isTouched={touched.phone}
                          error={errors.phone}
                          isValid={!errors.phone}
                          withMask={false}
                        />
                        <CustomInput
                          id="login-password"
                          className={b('input-wrapper')}
                          inputClass={b('input')}
                          onChange={handleChange}
                          name={INPUTS_NAMES.password}
                          placeholder={PASSWORD}
                          type={PASSWORD}
                          value={password}
                          isTouched={touched.password}
                          error={errors.password}
                          isValid={!errors.password}
                          withMask={false}
                        />
                        <CustomInput
                          className={b('input-wrapper')}
                          inputClass={b('input')}
                          onChange={handleChange}
                          name={INPUTS_NAMES.confirmPassword}
                          placeholder={CONFIRM_PASSWORD}
                          type={PASSWORD}
                          value={confirmPassword}
                          isTouched={touched.confirmPassword}
                          error={errors.confirmPassword}
                          isValid={!errors.confirmPassword}
                          withMask={false}
                        />
                        {isWrongLogin && <p className={b('invalid')}>{WRONG_LOGIN}</p>}
                        <button className={b('btn')} type="submit">
                          {SIGNUP}
                        </button>
                      </fieldset>
                    </form>
                  );
                }}
              </Formik>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default connect(null, actions)(Login);
