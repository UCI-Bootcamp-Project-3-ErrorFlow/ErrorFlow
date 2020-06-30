import React, { useState } from 'react';
import axios from 'axios';
// import TextEditor from '../../components/myEditor';

const Main = () => {
  const [postState, setPostState] = useState({
    username: '',
    title: '',
    body: '',
    tag: '',
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
          tag: postState.tag,
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
        <label htmlFor='body'>
          Description:
          <textarea
            name='body'
            onChange={postState.handleInputNewPost}
            value={postState.body}
          />
          {/* <TextEditor
            editorState={this.state.editorState}
            onChange={this.onChange}
          /> */}
        </label>
        <button onClick={postState.createNewPostBtn}>New Post</button>
      </form>
    </>
  );
};

export default Main;
