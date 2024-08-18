import axios from 'axios';
import URL from 'src/redux/urls';
import notification from 'src/components/notification';
import actions from 'src/redux/user/actions/index';
import {
  REMOVE_TOKEN,
  LOGIN_FAIL,
  LOGIN_START,
  LOGIN_SUCCESS,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
} from '../types';

const removeToken = () => async (dispatch: any) => {
  await dispatch({ type: REMOVE_TOKEN });
};

const signInAction = (payload: any): any => async (dispatch: any) => {
  const {
    email, password, callBack,
  } = payload;
  try {
    dispatch({ type: LOGIN_START });
    const { data: { accessToken } } = await axios.post(
      URL.SIGN_IN,
      {
        email,
        password,
      },
    );
    await dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        token: accessToken,
      },
    });
    dispatch(actions.getUserInfo());
    if (callBack) {
      callBack();
    }
  } catch (error: any) {
    const {
      response: {
        data: {
          message,
        },
      },
    } = error;
    dispatch(removeToken());
    notification('error', message);
    dispatch({ type: LOGIN_FAIL, payload: error });
  }
};

const signUpAction = (payload: any): any => async (dispatch: any) => {
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    callBack,
  } = payload;
  try {
    dispatch({ type: SIGNUP_START });
    const { data: { accessToken } } = await axios.post(
      URL.SIGN_UP,
      {
        firstName,
        lastName,
        email,
        password,
        phone,
      },
    );
    await dispatch({
      type: SIGNUP_SUCCESS,
      payload: {
        token: accessToken,
      },
    });
    dispatch(actions.getUserInfo());
    if (callBack) {
      callBack();
    }
  } catch (error) {
    dispatch({
      type: SIGNUP_FAIL,
      payload: error,
    });
  }
};

export default {
  removeToken,
  signInAction,
  signUpAction,
};
