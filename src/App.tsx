import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes/Routes';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <NavigationContainer  >
      <Routes/>
    </NavigationContainer>
    </PersistGate>
  </Provider>
  );
};

export default App;
