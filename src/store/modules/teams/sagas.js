import {takeLatest, call, put, all} from 'redux-saga/effects';
import {ToastActionsCreators} from 'react-native-redux-toast';
import api from '~/services/api';

import {getTeamsSuccess, createTeamSuccess, closeTeamModal} from './actions';

export function* getTeams() {
  try {
    const response = yield call(api.get, 'teams');

    yield put(getTeamsSuccess(response.data));
  } catch (err) {}
}

export function setActiveRehydrate({payload}) {
  if (!payload) {
    return;
  }
  const {active} = payload.teams;

  if (active) {
    api.defaults.headers.common.TEAM = active.slug;
  }
}

export function setActive({payload}) {
  if (!payload) {
    return;
  }
  api.defaults.headers.common.TEAM = payload.team.slug;
}

export function* createTeam({payload}) {
  const {name} = payload;
  try {
    const response = yield call(api.post, 'teams', {name});

    yield put(createTeamSuccess(response.data));
    yield put(closeTeamModal());
    yield put(ToastActionsCreators.displayInfo('Time criado'));
  } catch (err) {
    yield put(ToastActionsCreators.displayError('Erro ao criar time'));
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setActiveRehydrate),
  takeLatest('@teams/CREATE_TEAM_REQUEST', createTeam),
  takeLatest('@teams/GET_TEAMS_REQUEST', getTeams),
  takeLatest('@auth/SIGN_IN_SUCCESS', getTeams),
  takeLatest('@teams/SELECT_TEAM', setActive),
]);
