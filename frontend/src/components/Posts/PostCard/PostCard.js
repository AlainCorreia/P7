import React, { useContext, useState } from 'react';
import { UserContext } from '../../../context/UserContext';
import { api } from '../../../utils/api';
import LikePost from '../LikePost/LikePost';

import {
  StyledCard,
  StyledImgContainer,
  StyledImg,
  StyledPostDate,
  StyledPostHeader,
  StyledPostUsername,
  StyledPostText,
  StyledPostFooter,
  StyledPostButton,
  StyledButtonIcon,
  StyledButtonContainer,
  StyledEditInfo,
} from './styles';

import check from '../../../assets/images/check-solid.svg';
import trash from '../../../assets/images/trash-can-solid.svg';
import pen from '../../../assets/images/pen-to-square-solid-white.svg';
import xmark from '../../../assets/images/xmark-solid-white.svg';
import CreateOrEditPost from '../CreateOrEditPost/CreateOrEditPost';

const PostCard = ({ post, removePost, updatePost }) => {
  const { user } = useContext(UserContext);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [postText, setPostText] = useState(post.text);
  const [postPicture, setPostPicture] = useState(post.pictureUrl);
  const [file, setFile] = useState();
  const [errorMessage, setErrorMessage] = useState('');

  const formatDate = (value) => {
    const parsedDate = Date.parse(value);

    const formattedDate = new Date(parsedDate).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    return formattedDate;
  };

  const handleDelete = () => {
    if (!isDeleteMode) {
      setIsDeleteMode((prevIsDeleteMode) => !prevIsDeleteMode);
    } else {
      api
        .delete(`posts/${post._id}`)
        .then(() => removePost(post._id))
        .catch((err) => console.log(err));
    }
  };

  const handleButton = () => {
    if (isDeleteMode) {
      setIsDeleteMode((prevIsDeleteMode) => !prevIsDeleteMode);
    } else {
      setIsEditMode((prevIsEditMode) => !prevIsEditMode);
      setPostText(post.text);
      setPostPicture(post.pictureUrl);
      setFile();
    }
  };

  const handleEdit = () => {
    if (postText || file) {
      const data = new FormData();
      data.append('text', postText);
      if (file) {
        data.append('image', file);
      } else {
        data.append('image', postPicture);
      }

      api
        .patch(`posts/${post._id}`, data)
        .then((res) => {
          setIsEditMode(false);
          updatePost(res.data.docs);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <StyledCard isDeleteMode={isDeleteMode} isEditMode={isEditMode}>
      <StyledPostHeader>
        <StyledPostUsername>{post.author.username}</StyledPostUsername>
        <StyledPostDate>{formatDate(post.createdAt)}</StyledPostDate>
      </StyledPostHeader>
      {isEditMode ? (
        <CreateOrEditPost
          postText={postText}
          postPicture={postPicture}
          setPostText={setPostText}
          setPostPicture={setPostPicture}
          setFile={setFile}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      ) : (
        <>
          {post.text && <StyledPostText>{post.text}</StyledPostText>}
          {post.pictureUrl && (
            <StyledImgContainer>
              <StyledImg src={post.pictureUrl} alt='Illustration du post' />
            </StyledImgContainer>
          )}
          {post.lastEdited && (
            <StyledEditInfo>
              Edité par {post.editedBy.username} le{' '}
              {formatDate(post.lastEdited)}
            </StyledEditInfo>
          )}
        </>
      )}
      <StyledPostFooter>
        <LikePost likes={post.likes} postId={post._id} userId={user.userId} />
        {(user.userId === post.author._id || user.isAdmin) && (
          <StyledButtonContainer>
            <StyledPostButton
              aria-label={
                isDeleteMode || isEditMode ? 'Annuler' : 'Éditer le post'
              }
              onClick={handleButton}
            >
              {isDeleteMode || isEditMode ? (
                <StyledButtonIcon src={xmark} alt='Annuler' />
              ) : (
                <StyledButtonIcon src={pen} alt='Éditer' />
              )}
            </StyledPostButton>
            {isEditMode ? (
              (postText !== post.text ||
                postPicture !== post.pictureUrl ||
                file) && (
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
                  isDeleteMode
                    ? 'Confirmer la suppression'
                    : 'Supprimer le post'
                }
                onClick={handleDelete}
              >
                {isDeleteMode ? (
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
    </StyledCard>
  );
};

export default PostCard;
