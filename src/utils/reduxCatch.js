const reduxCatch = (errorHandler) => (store) => (next) => (action) => {
  try {
    return next(action);
  } catch (err) {
    errorHandler(err, store.getState, action, store.dispatch);
    return err;
  }
};

export default reduxCatch;
