import { CLOCK_IN, CLOCK_OUT_DATA, CLOCK_OUT_LOADING_STATE, GET_ALL_TASK, GET_ALL_TASK_LOADING_STATE, GET_DAYLY_AGENDA_DATA, GET_DAYLY_AGENDA_LOADING_STATE, GET_EMPLOYEE_PERSONAL_DATA, GET_EMPLOYEE_PERSONAL_LOADING_STATE, GET_MONTHLY_AGENDA_DATA, GET_MONTHLY_AGENDA_LOADING_STATE, GET_SINGLE_TASK, GET_SINGLE_TASK_LOADING_STATE, GET_TIMEIN_TIMEOUT, GET_WEEKLY_AGENDA_DATA, GET_WEEKLY_AGENDA_LOADING_STATE, GET_WEEKLY_TIMEIN_TIMEOUT, GET_YEARLY_AGENDA_DATA, GET_YEARLY_AGENDA_LOADING_STATE, IS_UPDATED_EMPLOYEE_PERSONAL_DATA, LOADING_STATE, SAVING_LANGUAGE, TAKE_BREAK_LOADING_STATE, TIMEIN_TIMEOUT_LOADING_STATE, WEEKLY_TIMEIN_TIMEOUT_LOADING_STATE } from '../actionsTypes/MainActionsTypes';

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

const personalDataState = {
  personalDataLoadingState: false,
  isUpdatedEmployeeData: false,
  personalData: null,
};

export const getEmployeePersonalDataReducer = (state = personalDataState, action) => {
  switch (action.type) {
    case GET_EMPLOYEE_PERSONAL_DATA:
         return { 
           ...state,
           personalData: action.payload,
         };
         case GET_EMPLOYEE_PERSONAL_LOADING_STATE:
         return { 
           ...state,
           personalDataLoadingState: action.payload,
         };
         case IS_UPDATED_EMPLOYEE_PERSONAL_DATA:
         return { 
           ...state,
           isUpdatedEmployeeData: action.payload,
         };
    default:
      return state;
  }
};

const taskInitialState = {
  taskLoadingState: false,
  allTaskData: null,
};

export const getAllTasksByEmployeeReducer = (state = taskInitialState, action) => {
  switch (action.type) {
    case GET_ALL_TASK_LOADING_STATE:
         return { 
           ...state,
           taskLoadingState: action.payload,
         };
         case GET_ALL_TASK:
         return { 
           ...state,
           allTaskData: action.payload,
         };
    default:
      return state;
  }
};

const getEmployeeTaskInitialState = {
  singleTaskLoadingState: false,
  singleTaskData: null,
};

export const getSingleTaskReducer = (state = getEmployeeTaskInitialState, action) => {
  switch (action.type) {
    case GET_SINGLE_TASK_LOADING_STATE:
         return { 
           ...state,
           taskLoadingState: action.payload,
         };
         case GET_SINGLE_TASK:
         return { 
           ...state,
           singleTaskData: action.payload,
         };
    default:
      return state;
  }
};

const getDaylyAgendaInitialState = {
  daylyAgendaLoadingState: false,
  daylyAgendaData: null,
};

export const getDaylyAgendaReducer = (state = getDaylyAgendaInitialState, action) => {
  switch (action.type) {
    case GET_DAYLY_AGENDA_LOADING_STATE:
         return { 
           ...state,
           daylyAgendaLoadingState: action.payload,
         };
         case GET_DAYLY_AGENDA_DATA:
         return { 
           ...state,
           daylyAgendaData: action.payload,
         };
    default:
      return state;
  }
};

const getWeeklyAgendaInitialState = {
  weeklyAgendaLoadingState: false,
  weeklyAgendaData: null,
};

export const getWeeklyAgendaReducer = (state = getWeeklyAgendaInitialState, action) => {
  switch (action.type) {
    case GET_WEEKLY_AGENDA_LOADING_STATE:
         return { 
           ...state,
           weeklyAgendaLoadingState: action.payload,
         };
         case GET_WEEKLY_AGENDA_DATA:
         return { 
           ...state,
           weeklyAgendaData: action.payload,
         };
    default:
      return state;
  }
};

const getMonthlyAgendaInitialState = {
  monthlyAgendaLoadingState: false,
  monthlyAgendaData: null,
};

export const getMonthlyAgendaReducer = (state = getMonthlyAgendaInitialState, action) => {
  switch (action.type) {
    case GET_MONTHLY_AGENDA_LOADING_STATE:
         return { 
           ...state,
           monthlyAgendaLoadingState: action.payload,
         };
         case GET_MONTHLY_AGENDA_DATA:
         return { 
           ...state,
           monthlyAgendaData: action.payload,
         };
    default:
      return state;
  }
};

const getYearlyAgendaInitialState = {
  yearlyAgendaLoadingState: false,
  yearlyAgendaData: null,
};

export const getYearlyAgendaReducer = (state = getYearlyAgendaInitialState, action) => {
  switch (action.type) {
    case GET_YEARLY_AGENDA_LOADING_STATE:
         return { 
           ...state,
           yearlyAgendaLoadingState: action.payload,
         };
         case GET_YEARLY_AGENDA_DATA:
         return { 
           ...state,
           yearlyAgendaData: action.payload,
         };
    default:
      return state;
  }
};

const timerInitialState = {
  seconds: 0,
  isRunning: false,
};

export const timerReducer = (state = timerInitialState, action) => {
  switch (action.type) {
    case 'TIMER_TICK':
      return { ...state, seconds: action.payload, isRunning: true };
    case 'TIMER_RESET':
      return { ...state, seconds: 0, isRunning: true };
    case 'TIMER_STOP':
      return { ...state, isRunning: false };
    default:
      return state;
  }
}

const takeBreakInitialState = {
  takeBreakLoadingState: false,
};

export const takeABreakReducer = (state = takeBreakInitialState, action) => {
  switch (action.type) {
    case TAKE_BREAK_LOADING_STATE:
         return { 
           ...state,
           takeBreakLoadingState: action.payload,
         };
    default:
      return state;
  }
};

const clockOutInitialState = {
  clockOutLoadingState: false,
  clockOutData: null,
};

export const clockOutReducer = (state = clockOutInitialState, action) => {
  switch (action.type) {
    case CLOCK_OUT_LOADING_STATE:
         return { 
           ...state,
           clockOutLoadingState: action.payload,
         };
    case CLOCK_OUT_DATA: 
    return {
      ...state,
      clockOutData: action.payload,
    }
    default:
      return state;
  }
};

const savingLanguageInitialState = {
  language: null,
};

export const savingLanguageReducer = (state = savingLanguageInitialState, action) => {
  switch (action.type) {
    case SAVING_LANGUAGE: 
    return {
      ...state,
      language: action.payload,
    }
    default:
      return state;
  }
};