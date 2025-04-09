import { CLOCK_IN, GET_TIMEIN_TIMEOUT, GET_WEEKLY_TIMEIN_TIMEOUT, LOADING_STATE, TIMEIN_TIMEOUT_LOADING_STATE, WEEKLY_TIMEIN_TIMEOUT_LOADING_STATE } from '../actionsTypes/MainActionsTypes';

const initialState = {
    loadingState: false,
    clockInData: null,
};

export const MainReducers = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_STATE:
      return { 
        ...state,
        loadingState: action.payload,
      };
      case CLOCK_IN:
        return { 
          ...state,
          clockInData: action.payload,
        };
    default:
      return state;
  }
};

const getTimeInTimeOutState = {
  timeInTimeOutLoadingState: false,
  timeInTimeOutData: null,
};

export const getTimeinTimeoutReducer = (state = getTimeInTimeOutState, action) => {
  switch (action.type) {
    case GET_TIMEIN_TIMEOUT:
         return { 
           ...state,
           timeInTimeOutData: action.payload,
         };
         case TIMEIN_TIMEOUT_LOADING_STATE:
         return { 
           ...state,
           timeInTimeOutLoadingState: action.payload,
         };
    default:
      return state;
  }
};

const getWeeklyTimeInTimeOutState = {
  weeklyTimeInTimeOutLoadingState: false,
  weeklyTimeInTimeOutData: null,
};

export const getWeeklyTimeinTimeoutReducer = (state = getWeeklyTimeInTimeOutState, action) => {
  switch (action.type) {
    case GET_WEEKLY_TIMEIN_TIMEOUT:
         return { 
           ...state,
           weeklyTimeInTimeOutData: action.payload,
         };
         case WEEKLY_TIMEIN_TIMEOUT_LOADING_STATE:
         return { 
           ...state,
           weeklyTimeInTimeOutLoadingState: action.payload,
         };
    default:
      return state;
  }
};

const takeBreakState = {
  takeBreakLoadingState: false,
  takeBreakData: null,
};

export const takeBreakReducer = (state = takeBreakState, action) => {
  switch (action.type) {
    case GET_WEEKLY_TIMEIN_TIMEOUT:
         return { 
           ...state,
           takeBreakData: action.payload,
         };
         case WEEKLY_TIMEIN_TIMEOUT_LOADING_STATE:
         return { 
           ...state,
           takeBreakLoadingState: action.payload,
         };
    default:
      return state;
  }
};

