import React, { useState} from 'react';
import axios from 'axios';

const MyPosts = () => {
  const [postState, setPostState] = useState({
    myPosts: [],
    users: {},
  });

  postState.handleViewBtn = (event) => {
    event.preventDefault();
    axios
      .get('/api/users/posts', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('user')}`,
        },
      })
      .then(({ data }) => {
        console.log(data);
        setPostState({ ...postState, myPosts: data.posts, users: data.username});
        // postState.myPosts.push({user:postState.username})
        // console.log(postState.users)
      })
      .catch((err) => {
        console.log(err);
      });
    };
  

  return (
    <>
      <form>
        <button onClick={postState.handleViewBtn}>View All My Posts</button>
      </form>
      {/* {postState.users.map((item) => (
          <h1>{item}</h1>
      ))} */}
      {postState.myPosts.map((item) => (
        <div style={{ border: '1px solid black' }}> 
          <h4>{item.title}</h4>
          <p>{item.body}</p>
        </div>
      ))}
    </>
  );
};

export default MyPosts;
