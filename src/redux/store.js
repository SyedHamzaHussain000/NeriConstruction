import { combineReducers, legacy_createStore as createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import counterReducer from './reducers/reducer';
// import rootReducer from './reducers';

// Redux Persist Configuration
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
    counter: counterReducer,
});

// Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create Store
export const store = createStore(persistedReducer);

// Persistor
export const persistor = persistStore(store);
