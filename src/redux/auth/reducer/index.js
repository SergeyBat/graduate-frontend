import checkHydrateData from 'src/utils/checkHydrateData';
import { HYDRATE } from 'next-redux-wrapper';
import {
  REMOVE_TOKEN,
  LOGIN_FAIL,
  LOGIN_START,
  LOGIN_SUCCESS,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL, CHECK_AUTHORIZATION,
} from '../types';

const INITIAL_STATE = {
  token: '',
  isLogin: false,
};

const auth = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case HYDRATE: {
      const isDiff = checkHydrateData(state, payload.auth);
      return isDiff
        ? {
          ...payload.auth,
        }
        : state;
    }

    case LOGIN_START:
      return {
        ...state,
      };

    case LOGIN_SUCCESS: {
      const { token } = payload;
      return {
        ...state,
        token,
        isLogin: true,
      };
    }

    case LOGIN_FAIL: {
      return {
        ...INITIAL_STATE,
        error: payload,
      };
    }

    case SIGNUP_START:
      return {
        ...state,
      };

    case SIGNUP_SUCCESS: {
      const { token } = payload;
      return {
        ...state,
        token,
        isLogin: true,
      };
    }

    case SIGNUP_FAIL:
      return {
        ...INITIAL_STATE,
        error: payload,
      };

    case REMOVE_TOKEN: {
      return {
        ...INITIAL_STATE,
      };
    }

    case CHECK_AUTHORIZATION: {
      const {
        token,
      } = payload;
      return {
        token,
        isLogin: Boolean(token),
      };
    }

    default:
      return state;
  }
};

export default auth;
