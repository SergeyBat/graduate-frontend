import { combineReducers } from 'redux';
import auth from './auth/reducer';
import admin from './admin/reducer';
import user from './user/reducer';
import company from './company/reducer';
import entertainments from './entertainments/reducer';

const rootReducer = combineReducers({
  auth,
  admin,
  user,
  company,
  entertainments,
});

export default rootReducer;
