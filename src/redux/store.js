import { combineReducers, legacy_createStore as createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {thunk} from 'redux-thunk'; // Import redux-thunk
import AuthReducers from './reducers/AuthReducers.js';
import MainReducers from './reducers/MainReducers.js';

// Redux Persist Configuration
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  // counter: counterReducer,
  auth: AuthReducers,
  main: MainReducers,
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
