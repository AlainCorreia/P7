import React, { useContext, useState, useRef, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import { api } from '../../utils/api';
import { MIME_TYPES } from '../../utils/constants';

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
  StyledEditTextArea,
  StyledLikeButton,
  StyledLikeImg,
  StyledButtonIcon,
  StyledButtonContainer,
  StyledEditInfo,
} from './styles';

import {
  StyledNewPostImg,
  StyledSelectImgButton,
  StyledNewPostInput,
  StyledErrorMessage,
} from '../../styles/shared-styles';

import isLikedHeart from '../../assets/images/heart-solid.svg';
import heart from '../../assets/images/heart-regular.svg';
import check from '../../assets/images/check-solid.svg';
import trash from '../../assets/images/trash-can-solid.svg';
import pen from '../../assets/images/pen-to-square-solid-white.svg';
import xmark from '../../assets/images/xmark-solid-white.svg';

const PostCard = ({
  id,
  authorName,
  authorId,
  text,
  image,
  likes,
  date,
  editedBy,
  lastEdited,
  removePost,
  updatePost,
}) => {
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [messageText, setMessageText] = useState(text);
  const [postPicture, setPostPicture] = useState(image);
  const [file, setFile] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const fileInput = useRef(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    likes.includes(user.userId) ? setIsLiked(true) : setIsLiked(false);
  }, [likes, user]);

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
        .delete(`posts/${id}`)
        .then(() => removePost(id))
        .catch((err) => console.log(err));
    }
  };

  const handleButton = () => {
    if (isDeleteMode) {
      setIsDeleteMode((prevIsDeleteMode) => !prevIsDeleteMode);
    } else {
      setIsEditMode((prevIsEditMode) => !prevIsEditMode);
      setMessageText(text);
      setPostPicture(image);
      setFile();
      setErrorMessage('');
    }
  };

  const handleEdit = () => {
    if (messageText || file) {
      const data = new FormData();
      data.append('text', messageText);
      if (file) {
        data.append('image', file);
      } else {
        data.append('image', postPicture);
      }

      api
        .patch(`posts/${id}`, data)
        .then((res) => {
          setIsEditMode(false);
          updatePost({
            ...res.data.docs,
            editedBy: { username: user.username },
          });
        })
        .catch((err) => console.log(err));
    }
  };

  const handleLike = () => {
    const data = isLiked ? { like: 0 } : { like: 1 };

    api
      .post(`posts/${id}/like`, data)
      .then((res) =>
        updatePost({ ...res.data.docs, editedBy: { username: editedBy } })
      )
      .catch((err) => console.log(err));
  };

  const deleteImage = () => {
    setPostPicture('');
    setFile();
    setErrorMessage('');
  };

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

  return (
    <StyledCard isDeleteMode={isDeleteMode} isEditMode={isEditMode}>
      <StyledPostHeader>
        <StyledPostUsername>{authorName}</StyledPostUsername>
        <StyledPostDate>{formatDate(date)}</StyledPostDate>
      </StyledPostHeader>
      {isEditMode ? (
        <StyledEditTextArea
          rows={10}
          autoFocus
          defaultValue={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onFocus={() => setErrorMessage('')}
        />
      ) : (
        <StyledPostText>{text}</StyledPostText>
      )}
      {image && !isEditMode && (
        <StyledImgContainer>
          <StyledImg src={image} alt="Illustration du post" />
        </StyledImgContainer>
      )}
      {isEditMode && (file || postPicture) && (
        <StyledNewPostImg src={postPicture} alt="" />
      )}
      {isEditMode && (
        <StyledSelectImgButton
          onClick={() => [fileInput.current.click(), setErrorMessage('')]}
        >
          {postPicture ? "Modifier l'image" : 'Ajouter une image'}
        </StyledSelectImgButton>
      )}
      {postPicture && isEditMode && (
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
      <StyledErrorMessage>{errorMessage}</StyledErrorMessage>
      {lastEdited && (
        <StyledEditInfo>
          Edité par {editedBy} le {formatDate(lastEdited)}
        </StyledEditInfo>
      )}
      <StyledPostFooter>
        <StyledLikeButton
          aria-label='Liker le post et nombre de likes'
          role="switch"
          aria-checked={isLiked}
          onClick={handleLike}
        >
          {isLiked ? (
            <StyledLikeImg src={isLikedHeart} alt="J'aime" />
          ) : (
            <StyledLikeImg src={heart} alt="Je n'aime pas" />
          )}{' '}
          {likes.length}
        </StyledLikeButton>
        {(user.userId === authorId || user.isAdmin) && (
          <StyledButtonContainer>
            <StyledPostButton
              aria-label={
                isDeleteMode || isEditMode ? 'Annuler' : 'Éditer le post'
              }
              onClick={handleButton}
            >
              {isDeleteMode || isEditMode ? (
                <StyledButtonIcon src={xmark} alt="Annuler" />
              ) : (
                <StyledButtonIcon src={pen} alt="Éditer" />
              )}
            </StyledPostButton>
            {isEditMode ? (
              (messageText !== text || postPicture !== image || file) && (
                <StyledPostButton
                  aria-label="Confirmer la modification"
                  onClick={handleEdit}
                >
                  <>
                    <StyledButtonIcon src={check} alt="Confirmer" />
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
                    <StyledButtonIcon src={check} alt="Confirmer" />
                    <span>Supprimer ?</span>
                  </>
                ) : (
                  <StyledButtonIcon src={trash} alt="Supprimer" />
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
