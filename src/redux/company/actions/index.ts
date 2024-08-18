import axios from 'axios';
import URL from 'src/redux/urls';
import {
  GET_COMPANY_INFO_SUCCESS,
  GET_COMPANY_INFO_START,
  GET_COMPANY_INFO_FAIL,
  GET_COMPANY_EVENTS_START,
  GET_COMPANY_EVENTS_SUCCESS,
  GET_COMPANY_EVENTS_FAIL,
  GET_SELECTED_COMPANY_START,
  GET_SELECTED_COMPANY_SUCCESS,
  GET_SELECTED_COMPANY_FAIL,
  GET_ONE_COMPANY_REVIEWS_START,
  GET_ONE_COMPANY_REVIEWS_SUCCESS,
  GET_ONE_COMPANY_REVIEWS_FAIL,
  CREATE_COMPANY_REVIEWS_START,
  CREATE_COMPANY_REVIEWS_SUCCESS,
  CREATE_COMPANY_REVIEWS_FAIL,
  CREATE_COMPANY_START,
  CREATE_COMPANY_SUCCESS,
  CREATE_COMPANY_FAIL,
  CHANGE_COMPANY_START,
  CHANGE_COMPANY_SUCCESS,
  CHANGE_COMPANY_FAIL,
} from '../types';

const getAllCompaniesInfo = (filters: any): any => async (dispatch: any) => {
  try {
    dispatch({ type: GET_COMPANY_INFO_START });
    const { data: { data } } = await axios.get(
      `${URL.COMPANY}/all`,
      {
        params: {
          ...filters,
        },
      },
    );
    dispatch({ type: GET_COMPANY_INFO_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_COMPANY_INFO_FAIL, payload: error });
  }
};

const getCompanyEntertainments = (): any => async (dispatch: any, getState: any) => {
  const {
    auth: {
      token,
    },
  } = getState();
  try {
    dispatch({ type: GET_COMPANY_EVENTS_START });
    const { data: { data } } = await axios.get(
      `${URL.COMPANY_EVENTS}/all`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    dispatch({ type: GET_COMPANY_EVENTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_COMPANY_EVENTS_FAIL, payload: error });
  }
};

const getCompanyEntertainmentsFilters = (filters: any): any => async (dispatch: any) => {
  try {
    dispatch({ type: GET_COMPANY_EVENTS_START });
    const { data: { data } } = await axios.get(
      `${URL.COMPANY_EVENTS}/all`,
      {
        params: {
          ...filters,
        },
      },
    );
    dispatch({ type: GET_COMPANY_EVENTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_COMPANY_EVENTS_FAIL, payload: error });
  }
};

const getCompany = (id: number): any => async (dispatch: any) => {
  try {
    dispatch({ type: GET_SELECTED_COMPANY_START });
    const { data } = await axios.get(
      `${URL.COMPANY}/id/${id}`,
    );
    dispatch({ type: GET_SELECTED_COMPANY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SELECTED_COMPANY_FAIL,
      payload: error,
    });
  }
};

const getMyCompany = (): any => async (dispatch: any, getState: any) => {
  const {
    auth: {
      token,
    },
  } = getState();
  try {
    dispatch({ type: GET_SELECTED_COMPANY_START });
    const { data } = await axios.get(
      URL.COMPANY,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    dispatch({ type: GET_SELECTED_COMPANY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SELECTED_COMPANY_FAIL,
      payload: error,
    });
  }
};

const getCompanyReviews = (id: number): any => async (dispatch: any, getState: any) => {
  const {
    auth: {
      token,
    },
  } = getState();
  try {
    dispatch({ type: GET_ONE_COMPANY_REVIEWS_START });
    const { data } = await axios.get(
      URL.ONE_COMPANY_REVIEWS(id),
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    dispatch({ type: GET_ONE_COMPANY_REVIEWS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ONE_COMPANY_REVIEWS_FAIL,
      payload: error,
    });
  }
};

const createCompanyReviews = (
  newReviews: any,
  updateCompanyInfo: any,
): any => async (dispatch: any, getState: any) => {
  const {
    auth: {
      token,
    },
  } = getState();
  try {
    dispatch({ type: CREATE_COMPANY_REVIEWS_START });
    const { data } = await axios.post(
      URL.COMPANY_REVIEWS,
      newReviews,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    dispatch({ type: CREATE_COMPANY_REVIEWS_SUCCESS, payload: data });
    updateCompanyInfo();
  } catch (error) {
    dispatch({
      type: CREATE_COMPANY_REVIEWS_FAIL,
      payload: error,
    });
  }
};

const createCompany = (newCompany: any) => async (dispatch: any, getState: any) => {
  const {
    auth: {
      token,
    },
  } = getState();
  try {
    dispatch({ type: CREATE_COMPANY_START });
    const { data } = await axios.post(
      URL.COMPANY,
      newCompany,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    dispatch({ type: CREATE_COMPANY_SUCCESS, payload: data });
    dispatch(getMyCompany());
  } catch (error) {
    dispatch({
      type: CREATE_COMPANY_FAIL,
      payload: error,
    });
  }
};

const changeCompany = (idCompany: any, newCompany: any) => async (dispatch: any, getState: any) => {
  const {
    auth: {
      token,
    },
  } = getState();
  try {
    dispatch({ type: CHANGE_COMPANY_START });
    const { data } = await axios.put(
      `${URL.COMPANY}/${idCompany}`,
      newCompany,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    dispatch({ type: CHANGE_COMPANY_SUCCESS, payload: data });
    dispatch(getMyCompany());
  } catch (error) {
    dispatch({
      type: CHANGE_COMPANY_FAIL,
      payload: error,
    });
  }
};

export default {
  getAllCompaniesInfo,
  getCompanyEntertainments,
  getCompany,
  getMyCompany,
  getCompanyReviews,
  createCompanyReviews,
  getCompanyEntertainmentsFilters,
  createCompany,
  changeCompany,
};
