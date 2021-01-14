import React, {Fragment} from 'react';

import {Provider} from 'react-redux';
import {Toast} from 'react-native-redux-toast';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from '~/store/index';

import App from './App';

import {LogBox} from 'react-native';

import '~/config/StatusBarConfig';

LogBox.ignoreLogs([
  'Cannot update a component from inside the function body',
  'Animated: `useNativeDriver` was not specified.',
]);

const Root = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Fragment>
        <App />
        <Toast />
      </Fragment>
    </PersistGate>
  </Provider>
);

export default Root;
