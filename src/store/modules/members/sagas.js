import {takeLatest, call, put, all} from 'redux-saga/effects';
import {ToastActionsCreators} from 'react-native-redux-toast';
import api from '~/services/api';

import {getMembersSuccess, createMemberSuccess} from './actions';

export function* getMembers() {
  try {
    const response = yield call(api.get, 'members');

    yield put(getMembersSuccess(response.data));
  } catch (err) {}
}

export function* createMember({payload}) {
  try {
    const response = yield call(api.post, 'members', payload);

    yield put(createMemberSuccess(response.data));
  } catch (err) {}
}

export function* updateMember({payload}) {
  const {id, roles} = payload;
  try {
    yield call(api.put, `members/${id}`, {roles: roles.map((role) => role.id)});
    yield put(ToastActionsCreators.displayInfo('Membro atualizado'));
  } catch (err) {
    yield put(ToastActionsCreators.displayError('Erro ao atualizar membro'));
  }
}

export function* inviteMember({payload}) {
  try {
    yield call(api.post, 'invites', {invites: [payload.email]});
    yield put(ToastActionsCreators.displayInfo('Convite realizado'));
  } catch (err) {
    yield put(ToastActionsCreators.displayError('Erro ao realizar convite'));
  }
}

export default all([
  takeLatest('@members/GET_MEMBERS_REQUEST', getMembers),
  takeLatest('@members/CREATE_MEMBER_REQUEST', createMember),
  takeLatest('@members/UPDATE_MEMBER_REQUEST', updateMember),
  takeLatest('@members/INVITE_MEMBER_REQUEST', inviteMember),
  takeLatest('@teams/SELECT_TEAM', getMembers),
]);
