import React, { useReducer, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { postReducer } from '../../reducers/postReducer';
import {
  ACTION_TYPES,
  MIME_TYPES,
  NEW_POST_INITIAL_STATE,
} from '../../utils/constants';
import { api } from '../../utils/api';

import { StyledMainContainer, StyledButton } from './styles';

import Header from '../../components/Header/Header';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import CreateOrEditPost from '../../components/Posts/CreateOrEditPost/CreateOrEditPost';

const NewPost = () => {
  const { user, isLoading } = useContext(UserContext);

  const navigate = useNavigate();

  const [state, dispatch] = useReducer(postReducer, NEW_POST_INITIAL_STATE);

  useEffect(() => {
    if (!user.username && !isLoading) {
      navigate('/login');
    }
  }, [user.username, navigate, isLoading]);

  const handleSubmit = () => {
    if (state.postText || state.file) {
      const data = new FormData();
      data.append('text', state.postText);
      if (state.file) data.append('image', state.file);

      if (!state.file || MIME_TYPES[state.file.type]) {
        api
          .post('posts', data)
          .then(() => navigate('/home'))
          .catch((err) => {
            if (err.response.data.message) {
              dispatch({
                type: ACTION_TYPES.ERROR,
                payload: err.response.data.message,
              });
            }
          });
      } else if (!MIME_TYPES[state.file.type]) {
        dispatch({
          type: ACTION_TYPES.ERROR,
          payload:
            'Seuls les fichiers .jpeg, .jpg, .png, .webp, .gif sont autorisés.',
        });
      }
    }
  };

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <>
      <Header page='newpost' />
      <StyledMainContainer>
        <CreateOrEditPost page='newpost' state={state} dispatch={dispatch} />
        <StyledButton onClick={handleSubmit}>Envoyer</StyledButton>
      </StyledMainContainer>
    </>
  );
};

export default NewPost;
