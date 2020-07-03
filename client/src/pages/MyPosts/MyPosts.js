import React, { useState } from 'react';
import axios from 'axios';
import Switch from '../../components/Switch'
import '../../components/Switch/Switch.css'
import { post } from '../../../../routes/postRoutes';

const MyPosts = () => {
  const [postState, setPostState] = useState({
    myPosts: [],
    users: {},

  })

  postState.handleDeletePost = (item) => {
    axios
      .delete(`/api/myposts/${item._id}`, {
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

//   postState.handleToggle = (id, isSolved) => {
//     axios
//     .put(`/api/myposts/${id}`, isSolved), {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('user')}`, }
//         })
//     .then(() => {
//         isSolved: !isSolved
//         const posts = JSON.parse(JSON.stringify(postState.posts))
//         posts.forEach(solved => {
//             if (solved._id === id) {
//                 post.isSolved = !isSolved
//             }
//         })
//         setPostState({...postState, posts})
//     })
//     .catch((err) => {
//         console.log(err)
//     }
//         postState.handleToggle =
//         .then(({ data }) => {
//             console.log(data);
//             setPostState({
//               ...postState,
//               isSolved: true,
//               myPosts: data.posts,
//               users: data.username,
//             });
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       };

  return (
    <>
      <div>
        <button onClick={postState.handleViewBtn}>View All My Posts</button>
      </div>
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
    </>
  );
};

export default MyPosts;
