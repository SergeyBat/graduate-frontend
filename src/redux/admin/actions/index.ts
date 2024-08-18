import axios from 'axios';
import URL from 'src/redux/urls';
import entertainmentsActions from 'src/redux/entertainments/actions';
import {
  GET_ALL_COMPANY_START,
  GET_ALL_COMPANY_SUCCESS,
  GET_ALL_COMPANY_FAIL,
  GET_ALL_EVENTS_START,
  GET_ALL_EVENTS_SUCCESS,
  GET_ALL_EVENTS_FAIL,
  DELETE_EVENT_START,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAIL,
  GET_ALL_USERS_START,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAIL,
  CHANGE_USER_ROLE_START,
  CHANGE_USER_ROLE_SUCCESS,
  CHANGE_USER_ROLE_FAIL,
  CHANGE_COMPANY_START,
  CHANGE_COMPANY_SUCCESS,
  CHANGE_COMPANY_FAIL,
  CREATE_EVENT_TYPE_START,
  CREATE_EVENT_TYPE_SUCCESS,
  CREATE_EVENT_TYPE_FAIL,
  CHANGE_EVENT_TYPE_START,
  CHANGE_EVENT_TYPE_SUCCESS,
  CHANGE_EVENT_TYPE_FAIL,
} from '../types';

const { getEventTypes } = entertainmentsActions;

const getAllCompanies = (): any => async (dispatch: any, getState: any) => {
  const {
    auth: {
      token,
    },
  } = getState();
  try {
    dispatch({ type: GET_ALL_COMPANY_START });
    const { data: { data } } = await axios.get(
      `${URL.ADMIN_COMPANY}/all`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    dispatch({ type: GET_ALL_COMPANY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_COMPANY_FAIL, payload: error });
  }
};

const getAllEntertainments = (): any => async (dispatch: any, getState: any) => {
  const {
    auth: {
      token,
    },
  } = getState();
  try {
    dispatch({ type: GET_ALL_EVENTS_START });
    const { data: { data } } = await axios.get(
      `${URL.COMPANY_EVENTS}/all`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    dispatch({ type: GET_ALL_EVENTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_EVENTS_FAIL, payload: error });
  }
};

const deleteEntertainments = (
  id: any,
  values: any,
): any => async (
  dispatch: any,
  getState: any,
) => {
  const {
    auth: {
      token,
    },
  } = getState();
  try {
    dispatch({ type: DELETE_EVENT_START });
    const { data: { data } } = await axios.put(
      `${URL.COMPANY_EVENTS}/${id}`,
      values,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    dispatch({ type: DELETE_EVENT_SUCCESS, payload: data });
    dispatch(getAllEntertainments());
  } catch (error) {
    dispatch({ type: DELETE_EVENT_FAIL, payload: error });
  }
};

const getAllUsers = (): any => async (dispatch: any, getState: any) => {
  const {
    auth: {
      token,
    },
  } = getState();
  try {
    dispatch({ type: GET_ALL_USERS_START });
    const { data } = await axios.get(
      `${URL.ADMIN_USERS}/all`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    dispatch({ type: GET_ALL_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_USERS_FAIL, payload: error });
  }
};

const changeUserRole = (
  userId: number,
  newUserRole: any,
): any => async (dispatch: any, getState: any) => {
  const {
    auth: {
      token,
    },
  } = getState();
  try {
    dispatch({ type: CHANGE_USER_ROLE_START });
    const { data } = await axios.put(
      `${URL.ADMIN_USERS}/${userId}`,
      newUserRole,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    dispatch({ type: CHANGE_USER_ROLE_SUCCESS, payload: data });
    dispatch(getAllUsers());
  } catch (error) {
    dispatch({ type: CHANGE_USER_ROLE_FAIL, payload: error });
  }
};

const changeCompany = (
  companyId: number,
  values: any,
): any => async (dispatch: any, getState: any) => {
  const {
    auth: {
      token,
    },
  } = getState();
  try {
    dispatch({ type: CHANGE_COMPANY_START });
    const { data } = await axios.put(
      `${URL.ADMIN_COMPANY}/${companyId}`,
      values,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    dispatch({ type: CHANGE_COMPANY_SUCCESS, payload: data });
    dispatch(getAllCompanies());
  } catch (error) {
    dispatch({ type: CHANGE_COMPANY_FAIL, payload: error });
  }
};

const changeEventTypes = (
  eventId: number,
  event: any,
): any => async (
  dispatch: any,
  getState: any,
) => {
  const {
    auth: {
      token,
    },
  } = getState();
  try {
    dispatch({ type: CHANGE_EVENT_TYPE_START });
    const { data } = await axios.put(
      `${URL.EVENT_TYPES}/${eventId}`,
      event,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    await dispatch({
      type: CHANGE_EVENT_TYPE_SUCCESS,
      payload: data,
    });
    await dispatch(getEventTypes());
  } catch (error) {
    dispatch({
      type: CHANGE_EVENT_TYPE_FAIL,
      payload: error,
    });
  }
};

const createEventTypes = (
  event: any,
): any => async (
  dispatch: any,
  getState: any,
) => {
  const {
    auth: {
      token,
    },
  } = getState();
  try {
    dispatch({ type: CREATE_EVENT_TYPE_START });
    const { data } = await axios.post(
      URL.EVENT_TYPES,
      event,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    await dispatch({
      type: CREATE_EVENT_TYPE_SUCCESS,
      payload: data,
    });
    await dispatch(getEventTypes());
  } catch (error) {
    dispatch({
      type: CREATE_EVENT_TYPE_FAIL,
      payload: error,
    });
  }
};

export default {
  getAllCompanies,
  getAllEntertainments,
  getAllUsers,
  changeUserRole,
  changeCompany,
  changeEventTypes,
  createEventTypes,
  deleteEntertainments,
};
