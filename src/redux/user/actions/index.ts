import axios from 'axios';
import URL from 'src/redux/urls';
import authActions from 'src/redux/auth/actions/index';
import {
  GET_USER_INFO_FAIL,
  GET_USER_INFO_START, GET_USER_INFO_SUCCESS,
  LOGOUT_SUCCESS,
} from '../types';

const {
  removeToken,
} = authActions;

const getUserInfo = ():any => async (dispatch: any, getState: any) => {
  const {
    auth: {
      token,
    },
  } = getState();
  try {
    await dispatch({ type: GET_USER_INFO_START });
    const { data } = await axios.get(
      URL.USER_INFO,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    await dispatch({ type: GET_USER_INFO_SUCCESS, payload: data });
  } catch (error: any) {
    const {
      response: {
        data: {
          message,
        },
      },
    } = error;
    await dispatch({ type: GET_USER_INFO_FAIL, payload: message });
  }
};

const onLogout = (): any => async (dispatch: any) => {
  dispatch(removeToken());
  await dispatch({ type: LOGOUT_SUCCESS });
};

export default {
  onLogout,
  getUserInfo,
};
