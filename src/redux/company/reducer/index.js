import {
  GET_COMPANY_INFO_SUCCESS,
  GET_COMPANY_EVENTS_SUCCESS,
  GET_SELECTED_COMPANY_SUCCESS,
  GET_ONE_COMPANY_REVIEWS_SUCCESS,
  CREATE_COMPANY_START,
  CREATE_COMPANY_SUCCESS,
  CREATE_COMPANY_FAIL,
  CHANGE_COMPANY_START,
  CHANGE_COMPANY_SUCCESS,
  CHANGE_COMPANY_FAIL,
} from '../types';

const INITIAL_STATE = {
  companiesList: [],
  companyEntertainments: [],
  selectedCompany: null,
  companyReviews: [],
};

const company = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case GET_COMPANY_INFO_SUCCESS:
      return {
        ...state,
        companiesList: payload,
      };
    case GET_COMPANY_EVENTS_SUCCESS:
      return {
        ...state,
        companyEntertainments: payload,
      };
    case GET_SELECTED_COMPANY_SUCCESS:
      return {
        ...state,
        selectedCompany: payload,
      };
    case GET_ONE_COMPANY_REVIEWS_SUCCESS:
      return {
        ...state,
        companyReviews: payload,
      };
    default:
      return state;
  }
};

export default company;
