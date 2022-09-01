import React, { useRef } from 'react';
import { MIME_TYPES } from '../../../utils/constants';
import {
  StyledNewPostContainer,
  StyledTextArea,
  StyledSelectImgButton,
  StyledNewPostImg,
  StyledNewPostInput,
  StyledErrorMessage,
  StyledImgContainer
} from './styles';

const CreateOrEditPost = ({
  page,
  postText,
  postPicture,
  setPostText,
  setPostPicture,
  errorMessage,
  setErrorMessage,
  setFile,
}) => {
  const fileInput = useRef(null);
  
  const handlePicture = (e) => {
    if (MIME_TYPES[e.target.files[0].type]) {
      setPostPicture(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files[0]);
    } else {
      setErrorMessage(
        'Seuls les fichiers .jpeg, .jpg, .png, .webp, .gif sont autorisés.'
      );
    }
  };

  const deleteImage = () => {
    setPostPicture('');
    setFile();
    setErrorMessage('');
  };

  return (
    <StyledNewPostContainer page={page} aria-label='Rédiger un post'>
      <StyledTextArea
        name='text'
        id='text'
        rows='12'
        autoFocus
        defaultValue={postText}
        onFocus={() => setErrorMessage('')}
        onChange={(e) => setPostText(e.target.value)}
      />
      {postPicture && <StyledImgContainer><StyledNewPostImg src={postPicture} alt='' /></StyledImgContainer>}
      <StyledSelectImgButton
        onClick={() => [fileInput.current.click(), setErrorMessage('')]}
      >
        {postPicture ? "Modifier l'image" : 'Ajouter une image'}
      </StyledSelectImgButton>
      {postPicture && (
        <StyledSelectImgButton onClick={deleteImage}>
          Supprimer l'image
        </StyledSelectImgButton>
      )}
      <StyledNewPostInput
        type='file'
        accept='.jpg, .jpeg, .png, .webp, .gif'
        ref={fileInput}
        onChange={(e) => handlePicture(e)}
      />
      {errorMessage && <StyledErrorMessage>{errorMessage}</StyledErrorMessage>}
    </StyledNewPostContainer>
  );
};

export default CreateOrEditPost;
