const INITIAL_STATE = {
  apiState: {
    isSuccess: false,
    isError: false,
    message: '',
  },
  loading: false,
};

function MainReducer(state = INITIAL_STATE, action) {
  switch (action.payload) {
    default:
      return state;
  }
}

export default MainReducer;
