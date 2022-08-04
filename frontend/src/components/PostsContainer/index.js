import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from '../PostCard';
import { StyledPostsContainer } from './styles';

const PostsContainer = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = () => {
      axios
        .get('http://localhost:5000/api/posts', { withCredentials: true })
        .then((res) => {
          setPosts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchPosts();
  }, []);

  const removePost = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.filter((post) => {
        return post.id !== postId;
      })
    );
  };

  return (
    <StyledPostsContainer>
      {posts.map((post) => (
        <PostCard
          key={post._id}
          id={post._id}
          authorName={post.author.username}
          authorId={post.author._id}
          text={post.text}
          likes={post.likes}
          image={post.pictureUrl}
          date={post.createdAt}
          removePost={removePost}
        />
      ))}
    </StyledPostsContainer>
  );
};

export default PostsContainer;
