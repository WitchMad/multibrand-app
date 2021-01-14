export function getMembersRequest() {
  return {
    type: '@members/GET_MEMBERS_REQUEST',
  };
}

export function getMembersSuccess(data) {
  return {
    type: '@members/GET_MEMBERS_SUCCESS',
    payload: {
      data,
    },
  };
}

export function openMemberModal() {
  return {
    type: '@members/OPEN_MEMBER_MODAL',
  };
}

export function closeMembersModal() {
  return {
    type: '@members/CLOSE_MEMBER_MODAL',
  };
}

export function createMembersRequest(data) {
  return {
    type: '@members/CREATE_MEMBER_REQUEST',
    payload: {
      data,
    },
  };
}

export function createMemberSuccess(member) {
  return {
    type: '@members/CREATE_MEMBER_SUCCESS',
    payload: {
      member,
    },
  };
}

export function updateMemberRequest(id, roles) {
  return {
    type: '@members/UPDATE_MEMBER_REQUEST',
    payload: {
      id,
      roles,
    },
  };
}

export function inviteMemberRequest(email) {
  return {
    type: '@members/INVITE_MEMBER_REQUEST',
    payload: {
      email,
    },
  };
}
