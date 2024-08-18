import {
  createStore,
  compose,
  applyMiddleware, Action,
} from 'redux';
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import { nextReduxCookieMiddleware, wrapMakeStore } from 'next-redux-cookie-wrapper';
import { createWrapper } from 'next-redux-wrapper';
import reduxCatch from 'src/utils/reduxCatch';
// import { composeWithDevTools } from '@redux-devtools/extension';
import { configureStore } from '@reduxjs/toolkit';
import reducersList from './reducers';

const paths = [
  { subtree: 'auth', secure: false },
  { subtree: 'user', secure: false },
];

const errorHandler = (error: any, getState: any, lastAction: any) => {
  console.error('--==redux middleware error==--', error);
  console.debug('--==last action was==--', lastAction && lastAction.type ? lastAction.type : lastAction);
};

const makeStore = wrapMakeStore(() => {
  const middleware = [
    reduxCatch(errorHandler),
    thunkMiddleware,
    nextReduxCookieMiddleware({
      subtrees: paths,
      secure: false,
      compress: false,
      sameSite: false,
    }),
  ];
  return configureStore({
    reducer: reducersList,
    middleware: [...middleware],
    devTools: true,
  });
});

const wrapper = createWrapper(makeStore, { debug: false });
type Store = ReturnType<typeof makeStore>;

export type AppDispatch = Store['dispatch'];
export type RootState = ReturnType<Store['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export default wrapper;
