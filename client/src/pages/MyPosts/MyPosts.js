import React, { useState } from 'react';
import axios from 'axios';

const MyPosts = () => {
  const [postState, setPostState] = useState({
    myPosts: [],
    users: {},
  });

  postState.handleDeletePost = (item) => {
    axios
      .delete(`/api/posts/${item._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('user')}`,
        },
      })
      .then(() => {
        const items = JSON.parse(JSON.stringify(postState.item));
        const itemsFiltered = items.filter(
          (MyPosts) => MyPosts._id !== item._id
        );
        setPostState({ ...postState, myPosts: itemsFiltered });
        // work on this tomorrow *****
      })
      .catch((err) => console.error(err));
    postState.handleViewBtn();
  };

  postState.handleViewBtn = () => {
    axios
      .get('/api/users/posts', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('user')}`,
        },
      })
      .then(({ data }) => {
        console.log(data);
        setPostState({
          ...postState,
          myPosts: data.posts,
          users: data.username,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div>
        <button onClick={postState.handleViewBtn}>View All My Posts</button>
      </div>
      {postState.myPosts.map((item) => (
        <div key={item._id} style={{ border: '1px solid black' }}>
          <h4>{item.title}</h4>
          <p>{item.body}</p>
          <button onClick={() => postState.handleDeletePost(item)}>
            Delete
          </button>
        </div>
      ))}
    </>
  );
};

export default MyPosts;
