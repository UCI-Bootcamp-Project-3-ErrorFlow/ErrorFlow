import React, { useState } from 'react';
import axios from 'axios';

const Main = () => {
  const [postState, setPostState] = useState({
    username: '',
    title: '',
    body: '',
    isSolved: Boolean,
    posts: [],
  });

  postState.createNewPostBtn = (event) => {
    event.preventDefault();

    setPostState({
      ...postState,
      title: '',
      body: '',
    });
    axios
      .post(
        '/api/posts',
        {
          title: postState.title,
          body: postState.body,
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

  return (
    <>
      <h1>view all users posts</h1>
    </>
  );
};

export default Main;
