import React, { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';
import { ACTION_TYPES } from '../../../utils/constants';

import {
  StyledButtonContainer,
  StyledButtonIcon,
  StyledPostButton,
  StyledPostFooter,
} from './styles';

import check from '../../../assets/images/check-solid.svg';
import trash from '../../../assets/images/trash-can-solid.svg';
import pen from '../../../assets/images/pen-to-square-solid-white.svg';
import xmark from '../../../assets/images/xmark-solid-white.svg';

import LikePost from '../LikePost/LikePost';

const PosterFooter = ({ post, state, dispatch, handleDelete, handleEdit }) => {
  const { user } = useContext(UserContext);

  const handleButton = () => {
    if (state.isDeleteMode) {
      dispatch({ type: ACTION_TYPES.TOGGLE_DELETE_MODE });
    } else {
      dispatch({
        type: ACTION_TYPES.TOGGLE_EDIT_MODE,
        payload: { text: post.text, picture: post.pictureUrl },
      });
    }
  };

  return (
    <StyledPostFooter>
      <LikePost likes={post.likes} postId={post._id} userId={user.userId} />
      {(user.userId === post.author._id || user.isAdmin) && (
        <StyledButtonContainer>
          <StyledPostButton
            aria-label={
              state.isDeleteMode || state.isEditMode
                ? 'Annuler'
                : 'Éditer le post'
            }
            onClick={handleButton}
          >
            {state.isDeleteMode || state.isEditMode ? (
              <StyledButtonIcon src={xmark} alt='Annuler' />
            ) : (
              <StyledButtonIcon src={pen} alt='Éditer' />
            )}
          </StyledPostButton>
          {state.isEditMode ? (
            (state.postText !== post.text ||
              state.postPicture !== post.pictureUrl ||
              state.file) && (
              <StyledPostButton
                aria-label='Confirmer la modification'
                onClick={handleEdit}
              >
                <>
                  <StyledButtonIcon src={check} alt='Confirmer' />
                  <span>Confirmer ?</span>
                </>
              </StyledPostButton>
            )
          ) : (
            <StyledPostButton
              aria-label={
                state.isDeleteMode
                  ? 'Confirmer la suppression'
                  : 'Supprimer le post'
              }
              onClick={handleDelete}
            >
              {state.isDeleteMode ? (
                <>
                  <StyledButtonIcon src={check} alt='Confirmer' />
                  <span>Supprimer ?</span>
                </>
              ) : (
                <StyledButtonIcon src={trash} alt='Supprimer' />
              )}
            </StyledPostButton>
          )}
        </StyledButtonContainer>
      )}
    </StyledPostFooter>
  );
};

export default PosterFooter;
