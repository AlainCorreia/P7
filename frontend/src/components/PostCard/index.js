import React, { useContext, useState, useRef, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import { api } from '../../utils/api';

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
  StyledLikeContainer,
  StyledLikeImg,
} from './styles';

import {
  StyledNewPostImg,
  StyledSelectImgButton,
  StyledNewPostInput,
} from '../../pages/NewPost/styles';

import isLikedHeart from '../../assets/images/heart-solid.svg';
import heart from '../../assets/images/heart-regular.svg';

const PostCard = ({
  id,
  authorName,
  authorId,
  text,
  image,
  likes,
  date,
  removePost,
  updatePost,
}) => {
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [messageText, setMessageText] = useState(text);
  const [postPicture, setPostPicture] = useState(image);
  const [file, setFile] = useState();
  const [isLiked, setIsLiked] = useState(false);
  const fileInput = useRef(null);
  const user = useContext(UserContext);

  useEffect(() => {
    likes.includes(user[0].userId) ? setIsLiked(true) : setIsLiked(false);
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
          updatePost(res.data.docs);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleLike = () => {
    const data = isLiked ? { like: 0 } : { like: 1 };

    api
      .post(`posts/${id}/like`, data)
      .then((res) => updatePost(res.data.docs))
      .catch((err) => console.log(err));
  };

  const deleteImage = () => {
    setPostPicture('');
    setFile();
  };

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
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
        <StyledSelectImgButton onClick={() => fileInput.current.click()}>
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
        ref={fileInput}
        onChange={(e) => handlePicture(e)}
      />
      <StyledPostFooter>
        <StyledLikeContainer onClick={handleLike}>
          {isLiked ? (
            <StyledLikeImg src={isLikedHeart} alt="J'aime" />
          ) : (
            <StyledLikeImg src={heart} alt="Je n'aime pas" />
          )}{' '}
          {likes.length}
        </StyledLikeContainer>
        {(user[0].userId === authorId || user[0].isAdmin) && (
          <div>
            <StyledPostButton onClick={handleButton}>
              {isDeleteMode || isEditMode ? 'Annuler' : 'Éditer'}
            </StyledPostButton>
            {isEditMode ? (
              <StyledPostButton onClick={handleEdit}>
                Confirmer la modification
              </StyledPostButton>
            ) : (
              <StyledPostButton onClick={handleDelete}>
                {isDeleteMode ? 'Confirmer la suppression' : 'Supprimer'}
              </StyledPostButton>
            )}
          </div>
        )}
      </StyledPostFooter>
    </StyledCard>
  );
};

export default PostCard;
