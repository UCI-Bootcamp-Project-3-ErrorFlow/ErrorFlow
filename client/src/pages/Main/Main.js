import React, { useState } from 'react';
// import Posts from '../../components/Posts';
// import PostContext from '../../utils/PostContext';
import axios from 'axios';
// import { post } from '../../../../routes';

const Main = () => {
  const [postState, setPostState] = useState({
    username: '',
    title: '',
    body: '',
    multerImage: '',
    isSolved: Boolean,
    posts: [],
  });

  postState.uploadImage = (e, method) => {
    console.log(e.target.files[0]);
    let imageEvent = e.target.files[0];
    let imageFormObj = new FormData();
    if (method === 'multer') {
      imageFormObj.append('imageName', 'multer-image' + Date.now());
    }

    setPostState({
      ...postState,
      multerImage: URL.createObjectURL(imageEvent),
    });

    axios
      .post('/api/image/uploadmulter', imageFormObj)
      .then(({ data }) => {
        if (data.success) {
          console.log('successfully uploaded image');
          postState.setDefaultImage('multer');
        }
      })
      .catch((err) => {
        console.log(err);
        postState.setDefaultImage('multer');
      });

    postState.setDefaultImage = (uploadType) => {
      if (uploadType === 'multer') {
        setPostState({
          ...postState,
          multerImage: URL.createObjectURL(imageEvent),
        });
      }
    };
  };

  postState.createNewPostBtn = (event) => {
    event.preventDefault();
    
    setPostState({ ...postState, title: '', body: '', multerImage: '' });
    axios
      .post(
        '/api/posts',
        {
          title: postState.title,
          body: postState.body,
          image: postState.multerImage,
          isSolved: false,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('user')}`,
          },
        }
      )
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => console.error(err));
  };

  postState.handleInputNewPost = (event) => {
    setPostState({ ...postState, [event.target.name]: event.target.value });
  };

  postState.signOutBtn = (event) => {
    event.preventDefault();
    localStorage.removeItem('user');
    window.location = '/';
  };

  return (
    <>
      <h1>Main page</h1>
      <form>
        <button onClick={postState.signOutBtn}>Sign Out</button>
      </form>
      <form>
        <label htmlFor='title'>
          Title:
          <input
            type='text'
            name='title'
            onChange={postState.handleInputNewPost}
            value={postState.title}
          />
        </label>

        <input
          type='file'
          onChange={(e) => postState.uploadImage(e, 'multer')}
        ></input>
        <img src={postState.multerImage} alt='image' />

        <label htmlFor='body'>
          Description:
          <textarea
            name='body'
            onChange={postState.handleInputNewPost}
            value={postState.body}
          />
        </label>
        <button onClick={postState.createNewPostBtn}>New Post</button>
      </form>
    </>
  );
};

export default Main;
