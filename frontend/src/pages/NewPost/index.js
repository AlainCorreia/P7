import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header';
import {
  StyledNewPostContainer,
  StyledNewPostImg,
  StyledNewPostInput,
  StyledSelectImgButton,
  StyledTextArea,
} from './styles';
import { StyledButton } from '../../styles/shared-styles';
import { UserContext } from '../../context/UserContext';

const NewPost = () => {
  const [messageText, setMessageText] = useState('');
  const [postPicture, setPostPicture] = useState('');
  const [file, setFile] = useState();
  const [user, setUser, isLoading] = useContext(UserContext);
  const fileInput = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.username && !isLoading) {
      navigate('/login');
    }
  }, [user.username, navigate, isLoading]);


  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const deleteImage = () => {
    setPostPicture('');
    setFile();
  };

  const handleSubmit = () => {
    if (messageText || file) {
      const data = new FormData();
      data.append('text', messageText);
      if (file) data.append('image', file);

      axios
        .post('http://localhost:5000/api/posts', data, {
          withCredentials: true,
        })
        .then(() => navigate('/home'))
        .catch((err) => console.log(err));
    }
  };

  return (
    isLoading ? <h1>Loading...</h1> :
    <>
      <Header page='newpost' />
      <StyledNewPostContainer>
        <StyledTextArea
          name='text'
          id='text'
          rows='12'
          autoFocus
          onChange={(e) => setMessageText(e.target.value)}
        />
        {file && <StyledNewPostImg src={postPicture} alt='' />}
        <StyledSelectImgButton onClick={() => fileInput.current.click()}>
          {file ? "Modifier l'image" : 'Ajouter une image'}
        </StyledSelectImgButton>
        {file && (
          <StyledSelectImgButton onClick={deleteImage}>
            Supprimer l'image
          </StyledSelectImgButton>
        )}
        <StyledNewPostInput
          type='file'
          ref={fileInput}
          onChange={(e) => handlePicture(e)}
        />
        <StyledButton onClick={handleSubmit}>Envoyer</StyledButton>
      </StyledNewPostContainer>
    </>
  );
};

export default NewPost;
