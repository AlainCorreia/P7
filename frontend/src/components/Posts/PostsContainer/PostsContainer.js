import React, { useEffect, useState, useRef } from 'react';
import { api } from '../../../utils/api';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import PostCard from '../PostCard/PostCard';
import { StyledMainContainer, StyledPostsContainer } from './styles';

const PostsContainer = () => {
  const [posts, setPosts] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [skip, setSkip] = useState(0);
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current || process.env.NODE_ENV !== 'development') {
      const fetchPosts = () => {
        setIsDataFetched(false);

        api
          .get(`posts?skip=${skip}`)
          .then((res) => {
            setPosts((prevPosts) => [...prevPosts, ...res.data]);
            setIsDataFetched(true);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      
      fetchPosts();
    }

    return () => {
      effectRan.current = true;
    };
  }, [skip]);

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
        return post._id !== data._id ? post : data;
      })
    );
  };

  const handleScroll = (e) => {
    const { offsetHeight, scrollTop, scrollHeight } = e.target;
    if (offsetHeight + scrollTop >= scrollHeight - 1) {
      setSkip(posts.length);
    }
  };

  return (
    <StyledMainContainer onScroll={handleScroll}>
      <StyledPostsContainer aria-label='Liste des posts' posts={posts}>
        {!isDataFetched && <LoadingSpinner />}
        <ul>
          {posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              removePost={removePost}
              updatePost={updatePost}
            />
          ))}
        </ul>
      </StyledPostsContainer>
    </StyledMainContainer>
  );
};

export default PostsContainer;
