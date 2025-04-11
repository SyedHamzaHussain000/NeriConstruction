import { AUTH_DATA, EMAIL_VERIFY_LOADING_STATE, FORGOT_PASSWORD_LOADING_STATE, LOADING_STATE, NEW_PASSWORD_LOADING_STATE, RESEND_EMAIL_VERIFY_LOADING_STATE, WORK_PROFILE_LOADING_STATE } from '../actionsTypes/AuthActionsTypes';

const initialState = {
    loadingState: false,
    resendLoadingState: false,
    authData: null,
};

export const AuthReducers = (state = initialState, action) => {
  switch (action.type) {
    case NEW_PASSWORD_LOADING_STATE:
    case FORGOT_PASSWORD_LOADING_STATE:
    case WORK_PROFILE_LOADING_STATE:
    case RESEND_EMAIL_VERIFY_LOADING_STATE:
    case EMAIL_VERIFY_LOADING_STATE:
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

const workInitialState = {
  workLoadingState: false,
};

export const workProReducer = (state = workInitialState, action) => {
switch (action.type) {
  case WORK_PROFILE_LOADING_STATE:
    return { 
      ...state,
      workLoadingState: action.payload 
    };
  default:
    return state;
}
};
