import { combineReducers, legacy_createStore as createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {thunk} from 'redux-thunk'; // Import redux-thunk
import {AuthReducers, workProReducer} from './reducers/AuthReducers.js';
import { clockOutReducer, getAllTasksByEmployeeReducer, getDaylyAgendaReducer, getEmployeePersonalDataReducer, getMonthlyAgendaReducer, getSingleTaskReducer, getTimeinTimeoutReducer, getWeeklyAgendaReducer, getWeeklyTimeinTimeoutReducer, getYearlyAgendaReducer, MainReducers, takeABreakReducer, takeBreakReducer, timerReducer } from './reducers/MainReducers.js';

// Redux Persist Configuration
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  // counter: counterReducer,
  auth: AuthReducers,
  work: workProReducer,
  main: MainReducers,
  getTimeInTimeOut: getTimeinTimeoutReducer,
  getWeeklyTimeinTimeout: getWeeklyTimeinTimeoutReducer,
  takeBreak: takeBreakReducer,
  getEmployeePersonalData: getEmployeePersonalDataReducer,
  getAllTasksByEmployee: getAllTasksByEmployeeReducer,
  getSingleTask: getSingleTaskReducer,
  getDaylyAgenda: getDaylyAgendaReducer,
  getWeeklyAgenda: getWeeklyAgendaReducer,
  getMonthlyAgenda: getMonthlyAgendaReducer,
  getYearlyAgenda: getYearlyAgendaReducer,
  timer: timerReducer,
  break: takeABreakReducer,
  clockOut: clockOutReducer
  // Add other reducers here if necessary
});

// Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create Store with redux-thunk middleware
export const store = createStore(
  persistedReducer, // Use the persisted reducer
  applyMiddleware(thunk) // Apply redux-thunk middleware
);

// Persistor
export const persistor = persistStore(store);
