import { AUTH_DATA, LOADING_STATE } from '../actionsTypes/AuthActionsTypes';

const initialState = {
    loadingState: false,
    authData: null,
};

const AuthReducers = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_STATE:
      return { 
        ...state,
        loadingState: action.payload 
      };
    case AUTH_DATA:
      return {
        ...state,
        authData: action.payload,
      }
    default:
      return state;
  }
};

export default AuthReducers;
