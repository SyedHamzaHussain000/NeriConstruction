import { INCREMENT, DECREMENT, RESET } from '../actions/action';
import { GET_TIMEIN_TIMEOUT, TIMEIN_TIMEOUT_LOADING_STATE } from '../actionsTypes/MainActionsTypes';

const initialState = {
  timeInTimeOutLoadingState: false,
  timeInTimeOutData: null,
};

const counterReducer = (state = initialState, action) => {
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

export default counterReducer;
