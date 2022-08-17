import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/api';
import { MIME_TYPES } from '../../utils/constants';
import Header from '../../components/Header';
import { StyledNewPostContainer, StyledTextArea } from './styles';
import {
  StyledButton,
  StyledErrorMessage,
  StyledNewPostImg,
  StyledNewPostInput,
  StyledSelectImgButton,
} from '../../styles/shared-styles';
import { UserContext } from '../../context/UserContext';

const NewPost = () => {
  const [messageText, setMessageText] = useState('');
  const [postPicture, setPostPicture] = useState('');
  const [file, setFile] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser, isLoading] = useContext(UserContext);
  const fileInput = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.username && !isLoading) {
      navigate('/login');
    }
  }, [user.username, navigate, isLoading]);

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

  const handleSubmit = () => {
    if (messageText || file) {
      const data = new FormData();
      data.append('text', messageText);
      if (file) data.append('image', file);

      if (!file || MIME_TYPES[file.type]) {
        api
          .post('posts', data)
          .then(() => navigate('/home'))
          .catch((err) => {
            if (err.response.data.message) {
              setErrorMessage(err.response.data.message);
            }
          });
      } else if (!MIME_TYPES[file.type]) {
        setErrorMessage(
          'Seuls les fichiers .jpeg, .jpg, .png, .webp, .gif sont autorisés.'
        );
      }
    }
  };

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <Header page="newpost" />
      <main>
        <StyledNewPostContainer aria-label="Rédiger un post">
          <StyledTextArea
            name="text"
            id="text"
            rows="12"
            autoFocus
            onFocus={() => setErrorMessage('')}
            onChange={(e) => setMessageText(e.target.value)}
          />
          {file && <StyledNewPostImg src={postPicture} alt="" />}
          <StyledSelectImgButton
            onClick={() => [fileInput.current.click(), setErrorMessage('')]}
          >
            {file ? "Modifier l'image" : 'Ajouter une image'}
          </StyledSelectImgButton>
          {file && (
            <StyledSelectImgButton onClick={deleteImage}>
              Supprimer l'image
            </StyledSelectImgButton>
          )}
          <StyledNewPostInput
            type="file"
            accept=".jpg, .jpeg, .png, .webp, .gif"
            ref={fileInput}
            onChange={(e) => handlePicture(e)}
          />
          <StyledErrorMessage page="newpost">{errorMessage}</StyledErrorMessage>
          <StyledButton onClick={handleSubmit}>Envoyer</StyledButton>
        </StyledNewPostContainer>
      </main>
    </>
  );
};

export default NewPost;
