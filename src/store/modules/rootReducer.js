import {combineReducers} from 'redux';

import auth from './auth/reducer';
import teams from './teams/reducer';
import projects from './projects/reducer';
import members from './members/reducer';
import {toastReducer as toast} from 'react-native-redux-toast';

export default combineReducers({
  auth,
  teams,
  projects,
  members,
  toast,
});
