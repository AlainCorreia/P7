import React, { useEffect, useState } from 'react';
import { api } from '../../utils/api';
import PostCard from '../PostCard';
import { StyledPostsContainer } from './styles';

const PostsContainer = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = () => {
      api
        .get('posts')
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
        return post._id !== postId;
      })
    );
  };

  const updatePost = (data) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        return post._id !== data._id ? post : { ...data, author: post.author };
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
          updatePost={updatePost}
        />
      ))}
    </StyledPostsContainer>
  );
};

export default PostsContainer;
