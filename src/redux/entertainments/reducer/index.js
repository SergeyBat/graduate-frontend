import {
  GET_EVENT_TYPE_START,
  GET_EVENT_TYPE_SUCCESS,
  GET_EVENT_TYPE_FAIL,
  GET_EVENT_INFO_START,
  GET_EVENT_INFO_SUCCESS,
  GET_EVENT_INFO_FAIL,
  GET_EVENT_REQUESTS_SUCCESS,
  GET_EVENT_REQUESTS_FAIL,
  CLEAR_EVENT_REQUESTS_SUCCESS,
  CREATE_COMPANY_EVENT_START,
  CREATE_COMPANY_EVENT_SUCCESS,
  CREATE_COMPANY_EVENT_FAIL,
  CREATE_EVENT_DATE_START,
  CREATE_EVENT_DATE_SUCCESS,
  CREATE_EVENT_DATE_FAIL,
  CHANGE_COMPANY_EVENT_START,
  CHANGE_COMPANY_EVENT_SUCCESS,
  CHANGE_COMPANY_EVENT_FAIL,
  CHANGE_EVENT_DATE_START,
  CHANGE_EVENT_DATE_SUCCESS,
  CHANGE_EVENT_DATE_FAIL,
} from '../types';

const INITIAL_STATE = {
  eventTypes: [],
  eventRequests: [],
  error: {},
  eventInfo: {},
};

const entertainments = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case GET_EVENT_TYPE_START:
      return {
        ...state,
      };
    case GET_EVENT_TYPE_SUCCESS:
      return {
        ...state,
        eventTypes: payload,
        error: {},
      };
    case GET_EVENT_TYPE_FAIL: {
      const { message } = payload;
      return {
        ...state,
        eventTypes: [],
        error: message,
      };
    }
    case GET_EVENT_INFO_START:
      return {
        ...state,
      };
    case GET_EVENT_INFO_SUCCESS:
      return {
        ...state,
        eventInfo: payload,
        error: {},
      };
    case GET_EVENT_INFO_FAIL: {
      const { message } = payload;
      return {
        ...state,
        eventInfo: {},
        error: message,
      };
    }
    case GET_EVENT_REQUESTS_SUCCESS:
      return {
        ...state,
        eventRequests: payload,
        error: {},
      };
    case GET_EVENT_REQUESTS_FAIL: {
      const { message } = payload;
      return {
        ...state,
        eventRequests: [],
        error: message,
      };
    }
    case CLEAR_EVENT_REQUESTS_SUCCESS:
      return {
        ...state,
        eventRequests: [],
      };
    default:
      return state;
  }
};

export default entertainments;
