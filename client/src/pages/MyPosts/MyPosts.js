import React, { useState, useEffect } from 'react';
import PostContext from '../../utils/PostContext';
import PostAPI from '../../utils/PostAPI';
import Switch from '../../components/Switch';
import '../../components/Switch/Switch.css';

const { getMyPost, updatePost, deletePost } = PostAPI;

const MyPosts = () => {
  const [postState, setPostState] = useState({
    myPosts: [],
    users: {},
  });

  postState.handleDeletePost = (id) => {
    deletePost(id)
      .then(() => {
        const postsCopy = JSON.parse(JSON.stringify(postState.myPosts));
        const itemsFiltered = postsCopy.filter((post) => post._id !== id);
        setPostState({ ...postState, myPosts: itemsFiltered });
      })
      .catch((err) => console.error(err));
  };

  postState.handleToggle = (id, isSolved) => {
    updatePost(id, {
      isSolved: !isSolved,
    })
      .then(() => {
        const postsCopy = JSON.parse(JSON.stringify(postState.myPosts));
        postsCopy.forEach((post) => {
          if (post._id === id) {
            post.isSolved = !isSolved;
          }
        });
        setPostState({ ...postState, myPosts: postsCopy });
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getMyPost()
      .then(({ data }) => {
        console.log(data);
        setPostState({ ...postState, myPosts: data.posts });
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <PostContext.Provider value={postState}>
        {postState.myPosts.map((item) => (
          <div
            key={item._id}
            style={
              item.isSolved
                ? { border: '1px solid green', margin: '5px' }
                : { border: '1px solid red', margin: '5px' }
            }
          >
            <h4>{item.title}</h4>
            <p>{item.body}</p>
            <Switch
              id={item._id}
              isOn={item.isSolved}
              onColor={item.isSolved ? '#06D6A0' : '#D83564'}
              handleToggle={() =>
                postState.handleToggle(item._id, item.isSolved)
              }
            />
            <button onClick={() => postState.handleDeletePost(item._id)}>
              Delete
            </button>
          </div>
        ))}
      </PostContext.Provider>
    </>
  );
};

export default MyPosts;
