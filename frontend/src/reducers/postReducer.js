import { ACTION_TYPES } from '../utils/constants';

export const postReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.EDIT_TEXT:
      return {
        ...state,
        postText: action.payload,
      };
    case ACTION_TYPES.SELECT_PICTURE:
      return {
        ...state,
        postPicture: URL.createObjectURL(action.payload),
        file: action.payload,
      };
    case ACTION_TYPES.DELETE_PICTURE:
      return {
        ...state,
        postPicture: '',
        file: null,
        errorMessage: '',
      };
    case ACTION_TYPES.ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case ACTION_TYPES.REMOVE_ERROR:
      return {
        ...state,
        errorMessage: '',
      };
    case ACTION_TYPES.TOGGLE_DELETE_MODE:
      return {
        ...state,
        isDeleteMode: !state.isDeleteMode,
      };
    case ACTION_TYPES.TOGGLE_EDIT_MODE:
      return {
        ...state,
        isEditMode: !state.isEditMode,
        postText: action.payload.text,
        postPicture: action.payload.picture,
        file: null,
      };
    case ACTION_TYPES.EXIT_EDIT_MODE:
      return {
        ...state,
        isEditMode: false,
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};
