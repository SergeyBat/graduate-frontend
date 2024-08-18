import { HYDRATE } from 'next-redux-wrapper';
import {
  GET_USER_INFO_SUCCESS,
  LOGOUT_SUCCESS,
} from '../types';
import checkHydrateData from '../../../utils/checkHydrateData';

const INITIAL_STATE = {
  firsName: '',
  secondName: '',
  role: '',
};

const user = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case HYDRATE: {
      const isDiff = checkHydrateData(state, payload.user);
      return isDiff
        ? {
          ...payload.user,
        }
        : state;
    }

    case GET_USER_INFO_SUCCESS: {
      return {
        ...payload,
      };
    }

    case LOGOUT_SUCCESS:
      return {
        ...INITIAL_STATE,
      };

    default:
      return state;
  }
};

export default user;
