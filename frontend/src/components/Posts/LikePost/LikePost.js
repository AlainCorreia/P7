import React, { useState } from 'react';
import { api } from '../../../utils/api';

import { StyledLikeButton, StyledLikeImg } from './styles';

import isLikedHeart from '../../../assets/images/heart-solid.svg';
import heart from '../../../assets/images/heart-regular.svg';

const LikePost = ({ likes, postId, userId }) => {
  const [isLiked, setIsLiked] = useState(likes.includes(userId));
  const [likeCount, setLikeCount] = useState(likes.length);

  const handleLike = () => {
    const data = isLiked ? { like: 0 } : { like: 1 };

    api
      .post(`posts/${postId}/like`, data)
      .then(() => {
        setIsLiked((prevIsLiked) => !prevIsLiked);
        setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
      })
      .catch((err) => console.log(err));
  };

  return (
    <StyledLikeButton
      aria-label='Liker le post et nombre de likes'
      role='switch'
      aria-checked={isLiked}
      onClick={handleLike}
    >
      {isLiked ? (
        <StyledLikeImg src={isLikedHeart} alt="J'aime" />
      ) : (
        <StyledLikeImg src={heart} alt="Je n'aime pas" />
      )}
      {likeCount}
    </StyledLikeButton>
  );
};

export default LikePost;
