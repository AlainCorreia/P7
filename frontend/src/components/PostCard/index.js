import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import {
  StyledCard,
  StyledImgContainer,
  StyledImg,
  StyledPostDate,
  StyledPostHeader,
  StyledPostUsername,
  StyledPostText,
} from './styles';

const PostCard = ({ id, authorName, authorId, text, image, likes, date }) => {
  const user = useContext(UserContext);

  return (
    <StyledCard>
      <StyledPostHeader>
        <StyledPostUsername>{authorName}</StyledPostUsername>
        <StyledPostDate>{date}</StyledPostDate>
      </StyledPostHeader>
      <StyledPostText>{text}</StyledPostText>
      {image && <StyledImgContainer>
        <StyledImg src={image} alt='Illustration du post' />
      </StyledImgContainer>}
      <p>Nombre de likes : {likes}</p>
      {user[0].userId === authorId && <p>C'est mon post</p>}
    </StyledCard>
  );
};

export default PostCard;
