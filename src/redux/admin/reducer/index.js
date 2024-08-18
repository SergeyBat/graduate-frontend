import {
  GET_ALL_COMPANY_SUCCESS,
  GET_ALL_COMPANY_START,
  GET_ALL_COMPANY_FAIL,
  GET_ALL_EVENTS_START,
  GET_ALL_EVENTS_SUCCESS,
  GET_ALL_EVENTS_FAIL,
  GET_ALL_USERS_START,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAIL,
} from '../types';

const INITIAL_STATE = {
  companiesList: [],
  entertainments: [],
  usersList: [],
};

const company = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case GET_ALL_COMPANY_SUCCESS:
      return {
        ...state,
        companiesList: payload,
      };

    case GET_ALL_EVENTS_SUCCESS:
      return {
        ...state,
        entertainments: payload,
      };

    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        usersList: payload,
      };

    default:
      return state;
  }
};

export default company;
