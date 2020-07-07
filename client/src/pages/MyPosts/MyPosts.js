import React, { useState, useEffect } from 'react';
import { Layout, Card, Button } from 'antd';
import PostContext from '../../utils/PostContext';
import PostAPI from '../../utils/PostAPI';
import Switch from '../../components/Switch';
import '../../components/Switch/Switch.css';
import './MyPosts.css';
const { Header, Footer, Sider, Content } = Layout;

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
        <Content>
          {postState.myPosts.map((item) => (
            <div
              key={item._id}
              style={
                item.isSolved
                  ? {
                      border: '2px solid green',
                      borderRadius: '10px',
                      margin: '5px',
                    }
                  : {
                      border: '2px solid red',
                      borderRadius: '10px',
                      margin: '5px',
                    }
              }
            >
              <div className='postCard'>
                <h2>{item.title}</h2>
                <p>{item.body}</p>
                <div className='btnContainer'>
                  <Switch
                    id={item._id}
                    isOn={item.isSolved}
                    onColor={item.isSolved ? '#06D6A0' : '#D83564'}
                    handleToggle={() =>
                      postState.handleToggle(item._id, item.isSolved)
                    }
                  />
                  <button style={{marginRight:"10px"}} onClick={() => postState.handleDeletePost(item._id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Content>
      </PostContext.Provider>
    </>
  );
};

export default MyPosts;
