import React, { useState, useEffect } from 'react';
import PostContext from '../../utils/PostContext'
import PostAPI from '../../utils/PostAPI'
import Switch from '../../components/Switch'
import '../../components/Switch/Switch.css'

const {
  // getPost,
  getMyPost,
  // addPost,
  updatePost,
  deletePost
} = PostAPI

const MyPosts = () => {
  const [postState, setPostState] = useState({
    myPosts: [],
    users: {},

  })

  postState.handleDeletePost = item => {
    deletePost(item._id)
      .then(() => {
        const items = JSON.parse(JSON.stringify(postState.posts))
        const itemsFiltered = items.filter(
          (MyPosts) => MyPosts._id !== item._id
        )
        setPostState({ ...postState, myPosts: itemsFiltered })
      })
      .catch((err) => console.error(err))
    // postState.handleViewBtn();
  }

  // postState.handleViewBtn = () => {
  //   getMyPost() ({
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('user')}`,
  //       },
  //     })
  //     .then(({ data }) => {
  //       console.log(data);
  //       setPostState({
  //         ...postState,
  //         myPosts: data.posts,
  //         users: data.username,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  postState.handleToggle = (id, isSolved) => {
    updatePost(id, {isSolved: !isSolved})
    .then(() => {
        const posts = JSON.parse(JSON.stringify(postState.posts))
        posts.forEach(solved => {
            if (solved._id === id) {
                solved.isSolved = !isSolved
            }
        })
        setPostState({...postState, posts})
    })
    .catch((err) => {
        console.log(err)
    })
        // postState.handleToggle =
        // .then(({ data }) => {
        //     console.log(data);
        //     setPostState({
        //       ...postState,
        //       isSolved: true,
        //       myPosts: data.posts,
        //       users: data.username,
        //     });
        //   })
        //   .catch((err) => {
        //     console.log(err);
      }

      useEffect(() => {
        getMyPost()
          .then(({ data }) => {
            console.log(data)
            setPostState({ ...postState, myPosts: data.posts })
          })
          .catch(err => console.error(err))
      }, [])

  return (
    <>
    <PostContext.Provider value={postState}>
      {postState.myPosts.map((item) => (
        <div key={item._id} style={
          item.isSolved
            ? { border: '1px solid green', margin: '5px' }
            : { border: '1px solid red', margin: '5px' }
        }>
          <h4>{item.title}</h4>
          <p>{item.body}</p>
          <Switch
            id={item._id}
            isOn={item.isSolved}
            handleToggle={(item) => postState.handleToggle(item._id, item.isSolved)} />
          <button onClick={(item) => postState.handleDeletePost(item)}>
            Delete
          </button>
        </div>
      ))}
      </PostContext.Provider>
    </>
  );
};

export default MyPosts;
