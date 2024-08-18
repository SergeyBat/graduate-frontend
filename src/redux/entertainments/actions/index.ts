import axios from 'axios';
import URL from 'src/redux/urls';

import {
  GET_EVENT_TYPE_START,
  GET_EVENT_TYPE_SUCCESS,
  GET_EVENT_TYPE_FAIL,
  GET_EVENT_REQUESTS_START,
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
  GET_EVENT_INFO_START,
  GET_EVENT_INFO_SUCCESS,
  GET_EVENT_INFO_FAIL,
  GET_EVENT_REQUEST_START,
  GET_EVENT_REQUEST_FAIL,
} from '../types';

const getEventTypes = (): any => async (dispatch: any) => {
  try {
    dispatch({ type: GET_EVENT_TYPE_START });
    const { data } = await axios.get(URL.EVENT_TYPES);
    await dispatch({
      type: GET_EVENT_TYPE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_EVENT_TYPE_FAIL,
      payload: error,
    });
  }
};

const getEventRequests = (params: any): any => async (dispatch: any) => {
  try {
    dispatch({ type: GET_EVENT_REQUESTS_START });
    const { eventDateId, userId } = params;
    const { data } = await axios.get(`${URL.EVENT_REQUESTS}/all`, {
      params: {
        eventDateId,
        userId,
      },
    });
    await dispatch({
      type: GET_EVENT_REQUESTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_EVENT_REQUESTS_FAIL,
      payload: error,
    });
  }
};

const clearEventRequests = (): any => async (dispatch: any) => {
  await dispatch({ type: CLEAR_EVENT_REQUESTS_SUCCESS });
};

const createCompanyEvent = (
  newEvent: any,
  updateEventInfo: any,
): any => async (dispatch: any, getState: any) => {
  const {
    auth: {
      token,
    },
  } = getState();
  try {
    dispatch({ type: CREATE_COMPANY_EVENT_START });
    const { data } = await axios.post(
      URL.COMPANY_EVENTS,
      newEvent,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    dispatch({ type: CREATE_COMPANY_EVENT_SUCCESS, payload: data });
    updateEventInfo();
  } catch (error) {
    dispatch({
      type: CREATE_COMPANY_EVENT_FAIL,
      payload: error,
    });
  }
};

const createEventDate = (
  newEvent: any,
  updateEventDate: any,
): any => async (dispatch: any, getState: any) => {
  const {
    auth: {
      token,
    },
  } = getState();
  try {
    dispatch({ type: CREATE_EVENT_DATE_START });
    const { data } = await axios.post(
      `${URL.COMPANY_EVENTS}/date`,
      newEvent,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    dispatch({ type: CREATE_EVENT_DATE_SUCCESS, payload: data });
    updateEventDate();
  } catch (error) {
    dispatch({
      type: CREATE_EVENT_DATE_FAIL,
      payload: error,
    });
  }
};

const changeCompanyEvent = (
  id: number,
  changedEvent: any,
  updateEventInfo: any,
): any => async (dispatch: any, getState: any) => {
  const {
    auth: {
      token,
    },
  } = getState();
  try {
    dispatch({ type: CHANGE_COMPANY_EVENT_START });
    const { data } = await axios.put(
      `${URL.COMPANY_EVENTS}/${id}`,
      changedEvent,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    dispatch({ type: CHANGE_COMPANY_EVENT_SUCCESS, payload: data });
    updateEventInfo();
  } catch (error) {
    dispatch({
      type: CHANGE_COMPANY_EVENT_FAIL,
      payload: error,
    });
  }
};

const changeEventDate = (
  id: number,
  changedEventDate: any,
  updateEventDate: any,
): any => async (dispatch: any, getState: any) => {
  const {
    auth: {
      token,
    },
  } = getState();
  try {
    dispatch({ type: CHANGE_EVENT_DATE_START });
    const { data } = await axios.put(
      `${URL.COMPANY_EVENTS}/date/${id}`,
      changedEventDate,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    dispatch({ type: CHANGE_EVENT_DATE_SUCCESS, payload: data });
    updateEventDate();
  } catch (error) {
    dispatch({
      type: CHANGE_EVENT_DATE_FAIL,
      payload: error,
    });
  }
};

const deleteDateEvent = (
  id: number,
  updateEventDate: any,
): any => async (dispatch: any, getState: any) => {
  const {
    auth: {
      token,
    },
  } = getState();
  try {
    dispatch({ type: CHANGE_EVENT_DATE_START });
    const { data } = await axios.delete(
      `${URL.COMPANY_EVENTS}/date/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    dispatch({ type: CHANGE_EVENT_DATE_SUCCESS, payload: data });
    updateEventDate();
  } catch (error) {
    dispatch({
      type: CHANGE_EVENT_DATE_FAIL,
      payload: error,
    });
  }
};

const getEventInfo = (id: number): any => async (dispatch: any, getState: any) => {
  const {
    auth: {
      token,
    },
  } = getState();
  try {
    dispatch({ type: GET_EVENT_INFO_START });
    const { data } = await axios.get(
      `${URL.COMPANY_EVENTS}/event/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    dispatch({ type: GET_EVENT_INFO_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_EVENT_INFO_FAIL,
      payload: error,
    });
  }
};

const eventRequest = (value: any): any => async (dispatch: any, getState: any) => {
  const {
    auth: {
      token,
    },
  } = getState();
  const { event, callBack } = value;
  try {
    dispatch({ type: GET_EVENT_REQUEST_START });
    await axios.post(
      `${URL.EVENT_REQUESTS}`,
      event,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    callBack();
  } catch (error) {
    dispatch({
      type: GET_EVENT_REQUEST_FAIL,
      payload: error,
    });
  }
};

export default {
  getEventTypes,
  getEventRequests,
  clearEventRequests,
  createCompanyEvent,
  createEventDate,
  changeCompanyEvent,
  changeEventDate,
  deleteDateEvent,
  getEventInfo,
  eventRequest,
};
