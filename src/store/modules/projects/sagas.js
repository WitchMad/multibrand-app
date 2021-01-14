import {takeLatest, call, put, all} from 'redux-saga/effects';
import {ToastActionsCreators} from 'react-native-redux-toast';
import api from '~/services/api';

import {getProjectsSuccess, createProjectSuccess} from './actions';

export function* getProjects() {
  try {
    const response = yield call(api.get, 'projects');

    yield put(getProjectsSuccess(response.data));
  } catch (err) {}
}

export function* createProject({payload}) {
  try {
    const response = yield call(api.post, 'projects', payload);

    yield put(createProjectSuccess(response.data));
    yield put(ToastActionsCreators.displayInfo('Projeto criado'));
  } catch (err) {
    yield put(ToastActionsCreators.displayError('Erro ao criar projeto'));
  }
}

export default all([
  takeLatest('@projects/GET_PROJECTS_REQUEST', getProjects),
  takeLatest('@teams/SELECT_TEAM', getProjects),
  takeLatest('@projects/CREATE_PROJECT_REQUEST', createProject),
]);
