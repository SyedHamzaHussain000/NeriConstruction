import { INCREMENT, DECREMENT, RESET } from '../actions/action';

const initialState = {
  count: 0,
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + action.payload };
    case DECREMENT:
      return { ...state, count: state.count - action.payload };
    case RESET:
      return { ...state, count: 0 };
    default:
      return state;
  }
};

export default counterReducer;
