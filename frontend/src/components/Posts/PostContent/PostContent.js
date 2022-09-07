import React from 'react';
import { formatDate } from '../../../utils/functions/functions';
import { StyledEditInfo, StyledImg, StyledImgContainer, StyledPostText } from './styles';

const PostContent = ({post}) => {
  return (
    <>
      {post.text && <StyledPostText>{post.text}</StyledPostText>}
      {post.pictureUrl && (
        <StyledImgContainer>
          <StyledImg src={post.pictureUrl} alt='Illustration du post' />
        </StyledImgContainer>
      )}
      {post.lastEdited && (
        <StyledEditInfo>
          Edité par {post.editedBy.username} le {formatDate(post.lastEdited)}
        </StyledEditInfo>
      )}
    </>
  );
};

export default PostContent;