import React from 'react';
import { formatDate } from '../../../utils/functions/functions';

import { StyledPostDate, StyledPostHeader, StyledPostUsername } from './styles';

const PostHeader = ({ post }) => {
  return (
    <StyledPostHeader>
      <StyledPostUsername>{post.author.username}</StyledPostUsername>
      <StyledPostDate>{formatDate(post.createdAt)}</StyledPostDate>
    </StyledPostHeader>
  );
};

export default PostHeader;
