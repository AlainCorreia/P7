import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
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
} from './styles';

const PostCard = ({ id, authorName, authorId, text, image, likes, date, removePost }) => {
  const [isDelete, setIsDelete] = useState(false);
  const user = useContext(UserContext);

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
    if (!isDelete) {
      setIsDelete((prevIsDelete) => !prevIsDelete);
    } else {
      axios
        .delete(`http://localhost:5000/api/posts/${id}`, {
          withCredentials: true,
        })
        .then(() => removePost(id))
        .catch((err) => console.log(err));
    }
  };

  const handleEdit = () => {
    if (isDelete) {
      setIsDelete((prevIsDelete) => !prevIsDelete);
    }
  };

  return (
    <StyledCard>
      <StyledPostHeader>
        <StyledPostUsername>{authorName}</StyledPostUsername>
        <StyledPostDate>{formatDate(date)}</StyledPostDate>
      </StyledPostHeader>
      <StyledPostText>{text}</StyledPostText>
      {image && (
        <StyledImgContainer>
          <StyledImg src={image} alt='Illustration du post' />
        </StyledImgContainer>
      )}
      <StyledPostFooter>
        <p>Likes : {likes.length}</p>
        {user[0].userId === authorId && (
          <div>
            <StyledPostButton onClick={handleEdit}>
              {isDelete ? 'Annuler' : 'Editer'}
            </StyledPostButton>
            <StyledPostButton onClick={handleDelete}>
              {isDelete ? 'Confirmer la suppression' : 'Supprimer'}
            </StyledPostButton>
          </div>
        )}
      </StyledPostFooter>
    </StyledCard>
  );
};

export default PostCard;
