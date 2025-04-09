import { AUTH_DATA, EMAIL_VERIFY_LOADING_STATE, LOADING_STATE, RESEND_EMAIL_VERIFY_LOADING_STATE } from '../actionsTypes/AuthActionsTypes';

const initialState = {
    loadingState: false,
    resendLoadingState: false,
    authData: null,
};

const AuthReducers = (state = initialState, action) => {
  switch (action.type) {
    case RESEND_EMAIL_VERIFY_LOADING_STATE:
    case EMAIL_VERIFY_LOADING_STATE:
    case LOADING_STATE:
      return { 
        ...state,
        loadingState: action.payload 
      };
      // case RESEND_EMAIL_VERIFY_LOADING_STATE:
      //   return { 
      //     ...state,
      //     resendLoadingState: action.payload 
      //   };
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
