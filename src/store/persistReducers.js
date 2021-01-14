import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer} from 'redux-persist';

export default (reducers) => {
  const persistedReducer = persistReducer(
    {
      key: '@Omninative',
      storage: AsyncStorage,
      whitelist: ['auth', 'teams', 'projects', 'members'],
    },
    reducers,
  );
  return persistedReducer;
};
