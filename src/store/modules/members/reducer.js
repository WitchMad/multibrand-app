import produce from 'immer';

const INITIAL_STATE = {
  data: [],
  membersModalOpen: false,
};

export default function members(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@members/GET_MEMBERS_SUCCESS': {
        draft.data = action.payload.data;
        break;
      }
      case '@members/OPEN_MEMBER_MODAL': {
        draft.membersModalOpen = true;
        break;
      }
      case '@members/CLOSE_MEMBER_MODAL': {
        draft.membersModalOpen = false;
        break;
      }
      case '@members/CREATE_MEMBER_SUCCESS': {
        draft.data = [...draft.data, action.payload.member];
        break;
      }
      case '@members/UPDATE_MEMBER_REQUEST': {
        draft.data = draft.data.map((member) => {
          if (member.id === action.payload.id) {
            return {
              ...member,
              roles: action.payload.roles,
            };
          }
          return member;
        });
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.data = [];
        break;
      }
      default:
    }
  });
}
