import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { api } from '../../utils/api';
import { MIME_TYPES } from '../../utils/constants';

import { StyledMainContainer, StyledButton } from './styles';

import Header from '../../components/Header/Header';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import CreateOrEditPost from '../../components/Posts/CreateOrEditPost/CreateOrEditPost';

const NewPost = () => {
  const { user, isLoading } = useContext(UserContext);
  const [postText, setPostText] = useState('');
  const [postPicture, setPostPicture] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [file, setFile] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.username && !isLoading) {
      navigate('/login');
    }
  }, [user.username, navigate, isLoading]);

  const handleSubmit = () => {
    if (postText || file) {
      const data = new FormData();
      data.append('text', postText);
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
    <LoadingSpinner />
  ) : (
    <>
      <Header page='newpost' />
      <StyledMainContainer>
        <CreateOrEditPost
          page='newpost'
          postText={postText}
          setPostText={setPostText}
          postPicture={postPicture}
          setPostPicture={setPostPicture}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          setFile={setFile}
        />
        <StyledButton onClick={handleSubmit}>Envoyer</StyledButton>
      </StyledMainContainer>
    </>
  );
};

export default NewPost;
