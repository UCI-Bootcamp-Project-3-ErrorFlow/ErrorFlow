import {
  DeleteOutlined,
  HeartOutlined,
  HeartTwoTone,
  CommentOutlined,
} from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { Layout, Card, Button } from 'antd';
import PostContext from '../../utils/PostContext';
import PostAPI from '../../utils/PostAPI';
import CommentContext from '../../utils/CommentContext';
import axios from 'axios';
import './Main.css';

const { Header, Footer, Sider, Content } = Layout;

const { getPost, getComment, updatePost, deleteComment } = PostAPI;

//if you want to render as we go into the page.
const Main = () => {
  const [postState, setPostState] = useState({
    likeCount: 0,
    posts: [],
  });

  const [commentState, setCommentState] = useState({
    comment: '',
    comments: [],
  });

  commentState.handleInputChange = (event) => {
    setCommentState({
      ...commentState,
      [event.target.name]: event.target.value,
    });
  };

  commentState.handleDeleteComment = (id) => {
    deleteComment(id)
      .then(() => {
        const commentCopy = JSON.parse(JSON.stringify(commentState.comments));
        const itemsFiltered = commentCopy.filter(
          (comment) => comment._id !== id
        );
        setCommentState({ ...commentState, comments: itemsFiltered });
      })
      .catch((err) => console.error(err));
  };

  commentState.handleAddComment = () => {
    axios
      .post(
        '/api/mycomments',
        {
          commentBody: commentState.comment,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('user')}`,
          },
        }
      )
      .then(({ data }) => {
        getComment()
          .then(({ data }) => {
            setCommentState({ ...commentState, comments: data });
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  postState.handleUpdateLike = (item, isLiked) => {
    if (isLiked === false) {
      updatePost(item._id, {
        isLiked: !isLiked,
        likeValue: item.likeValue + 1,
      })
        .then(() => {
          const postsCopy = JSON.parse(JSON.stringify(postState.posts));
          setPostState({
            ...postState,
            posts: postsCopy,
            likeCount: postsCopy.likeValue,
          });
        })
        .catch((err) => console.error(err));
    } else if (item.isLiked === true) {
      updatePost(item._id, {
        isLiked: !isLiked,
        likeValue: item.likeValue - 1,
      })
        .then(() => {
          const postsCopy = JSON.parse(JSON.stringify(postState.posts));
          setPostState({
            ...postState,
            posts: postsCopy,
            likeCount: postsCopy.likeValue,
          });
        })
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    getPost()
      .then(({ data }) => {
        setPostState({ ...postState, posts: data });
      })
      .catch((err) => console.error(err));
    getComment()
      .then(({ data }) => {
        setCommentState({ ...commentState, comments: data });
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Layout>
        <PostContext.Provider value={postState}>
          <Content>
            <h1 className='mainHeader'>Error Board</h1>
            {postState.posts.map((item) => (
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
                  <h4>{`written by ${item.author.username}`}</h4>
                  <p>{item.body}</p>
                </div>
                <div>
                  <form>
                    <Button
                      // style={{ cursor: 'pointer' }}
                      value={item.isLiked}
                      name={item.isLiked ? '👎' : '👍'}
                      onClick={() =>
                        postState.handleUpdateLike(item, item.isLiked)
                      }
                    >
                      {item.isLiked ? <HeartTwoTone /> : <HeartOutlined />}
                    </Button>
                  </form>
                </div>
              </div>
            ))}
          </Content>
        </PostContext.Provider>
        <CommentContext.Provider value={commentState}>
          <Sider className='messageFeed'>
            <input
              style={{ width: '90%' }}
              type='comment'
              name='comment'
              label='comment'
              value={commentState.comment}
              onChange={commentState.handleInputChange}
              placeholder='Send A Chat...'
            />
            <Button onClick={commentState.handleAddComment}>
              <CommentOutlined />
            </Button>
            <div>
              {commentState.comments.map((comment) => (
                <Card className='commentCard'>
                  <p className='commentBody'>{comment.commentBody}</p>
                  <div className='commentBtn'>
                    <Button
                      onClick={() =>
                        commentState.handleDeleteComment(comment._id)
                      }
                    >
                      <DeleteOutlined />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </Sider>
        </CommentContext.Provider>
        <Footer className='footer' style={{ textAlign: 'center' }}>
          ErrorFlow ©2020 Created by Flow Team
        </Footer>
      </Layout>
    </>
  );
};

export default Main;
