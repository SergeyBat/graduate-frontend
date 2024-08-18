const checkHydrateData = (state, newState) => Boolean(
  newState
    && Object.keys(newState).length
    && JSON.stringify(state) !== JSON.stringify(newState),
);

export default checkHydrateData;
