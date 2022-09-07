import React, { useReducer } from 'react';
import { postReducer } from '../../../reducers/postReducer';
import {
  ACTION_TYPES,
  EDIT_POST_INITIAL_STATE,
} from '../../../utils/constants';
import { api } from '../../../utils/api';

import { StyledCard } from './styles';

import CreateOrEditPost from '../CreateOrEditPost/CreateOrEditPost';
import PostContent from '../PostContent/PostContent';
import PostHeader from '../PostHeader/PostHeader';
import PosterFooter from '../PostFooter/PostFooter';

const PostCard = ({ post, removePost, updatePost }) => {
  const [state, dispatch] = useReducer(postReducer, EDIT_POST_INITIAL_STATE);

  const handleDelete = () => {
    if (!state.isDeleteMode) {
      dispatch({ type: ACTION_TYPES.TOGGLE_DELETE_MODE });
    } else {
      api
        .delete(`posts/${post._id}`)
        .then(() => removePost(post._id))
        .catch((err) => console.log(err));
    }
  };

  const handleEdit = () => {
    if (state.postText || state.file) {
      const data = new FormData();
      data.append('text', state.postText);
      if (state.file) {
        data.append('image', state.file);
      } else {
        data.append('image', state.postPicture);
      }

      api
        .patch(`posts/${post._id}`, data)
        .then((res) => {
          dispatch({ type: ACTION_TYPES.EXIT_EDIT_MODE });
          updatePost(res.data.docs);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <StyledCard state={state}>
      <PostHeader post={post} />
      {state.isEditMode ? (
        <CreateOrEditPost state={state} dispatch={dispatch} />
      ) : (
        <PostContent post={post} />
      )}
      <PosterFooter
        post={post}
        state={state}
        dispatch={dispatch}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </StyledCard>
  );
};

export default PostCard;
