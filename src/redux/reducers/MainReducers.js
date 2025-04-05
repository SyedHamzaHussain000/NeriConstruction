import { LOADING_STATE } from '../actionsTypes/MainActionsTypes';

const initialState = {
    loadingState: false,
};

const MainReducers = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_STATE:
      return { 
        ...state,
        loadingState: action.payload
      };
    default:
      return state;
  }
};

export default MainReducers;
