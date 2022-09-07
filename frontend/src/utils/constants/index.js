export const API_BASE_PATH = 'http://localhost:5000/api';

export const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
};

export const NEW_POST_INITIAL_STATE = {
  postText: '',
  postPicture: '',
  errorMessage: '',
  file: null,
};

export const EDIT_POST_INITIAL_STATE = {
  isDeleteMode: false,
  isEditMode: false,
  postText: '',
  postPicture: '',
  errorMessage: '',
  file: null,
};

export const ACTION_TYPES = {
  EDIT_TEXT: 'edit-text',
  SELECT_PICTURE: 'select-picture',
  DELETE_PICTURE: 'delete-picture',
  ERROR: 'error',
  REMOVE_ERROR: 'remove-error',
  TOGGLE_DELETE_MODE: 'toggle-delete-mode',
  TOGGLE_EDIT_MODE: 'toggle-edit-mode',
  EXIT_EDIT_MODE: 'exit-edit-mode',
};
