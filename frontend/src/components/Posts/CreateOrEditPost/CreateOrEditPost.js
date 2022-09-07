import React, { useRef } from 'react';
import { ACTION_TYPES, MIME_TYPES } from '../../../utils/constants';

import {
  StyledNewPostContainer,
  StyledTextArea,
  StyledSelectImgButton,
  StyledNewPostImg,
  StyledNewPostInput,
  StyledErrorMessage,
  StyledImgContainer,
} from './styles';

const CreateOrEditPost = ({ page, state, dispatch }) => {
  const fileInput = useRef(null);

  const handlePicture = (e) => {
    if (MIME_TYPES[e.target.files[0].type]) {
      dispatch({
        type: ACTION_TYPES.SELECT_PICTURE,
        payload: e.target.files[0],
      });
    } else {
      dispatch({
        type: ACTION_TYPES.ERROR,
        payload:
          'Seuls les fichiers .jpeg, .jpg, .png, .webp, .gif sont autorisés.',
      });
    }
  };

  const deletePicture = () => {
    dispatch({ type: ACTION_TYPES.DELETE_PICTURE });
  };

  return (
    <StyledNewPostContainer page={page} aria-label='Rédiger un post'>
      <StyledTextArea
        name='text'
        id='text'
        rows='12'
        autoFocus
        defaultValue={state.postText}
        onFocus={() => dispatch({ type: ACTION_TYPES.REMOVE_ERROR })}
        onChange={(e) =>
          dispatch({ type: ACTION_TYPES.EDIT_TEXT, payload: e.target.value })
        }
      />
      {state.postPicture && (
        <StyledImgContainer>
          <StyledNewPostImg src={state.postPicture} alt='' />
        </StyledImgContainer>
      )}
      <StyledSelectImgButton
        onClick={() => [
          fileInput.current.click(),
          dispatch({ type: ACTION_TYPES.REMOVE_ERROR }),
        ]}
      >
        {state.postPicture ? "Modifier l'image" : 'Ajouter une image'}
      </StyledSelectImgButton>
      {state.postPicture && (
        <StyledSelectImgButton onClick={deletePicture}>
          Supprimer l'image
        </StyledSelectImgButton>
      )}
      <StyledNewPostInput
        type='file'
        accept='.jpg, .jpeg, .png, .webp, .gif'
        ref={fileInput}
        onChange={(e) => handlePicture(e)}
      />
      {state.errorMessage && (
        <StyledErrorMessage>{state.errorMessage}</StyledErrorMessage>
      )}
    </StyledNewPostContainer>
  );
};

export default CreateOrEditPost;
