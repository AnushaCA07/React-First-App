import { updateObject } from '../../utils/utils';
const initialState = {
  deleteRosterResponse: {
    Status: false,
    Message: '',
  },
  isDeleteClick: false,
};

export const clearRosterDelete = (state) => {
  return updateObject(state, {
    deleteRosterResponse: {
      Status: false,
      Message: '',
    },
    isDeleteClick: false,
  });
};
export const postRosterDeleteSuccess = (state, action) => {
  return updateObject(state, {
    deleteRosterResponse: action.deleteRosterResponse,
    isDeleteClick: action.isDeleteClick,
  });
};
export const postRosterDeleteFailed = (state, action) => {
  return updateObject(state, {
    deleteRosterResponse: action.deleteRosterResponse,
    isDeleteClick: action.isDeleteClick,
  });
};
export const deleteRosterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'POST_ROSTERDELETE_SUCCESS':
      return postRosterDeleteSuccess(state, action);

    case 'POST_ROSTERDELETE_FAILED':
      return postRosterDeleteFailed(state, action);

    case 'CLEAR_ROSTERDELETE':
      return clearRosterDelete(state);

    default:
      return state;
  }
};
