import React, { useState, useEffect } from 'react';
import { Layout, Card, Button } from 'antd';
import PostContext from '../../utils/PostContext';
import PostAPI from '../../utils/PostAPI';
import CommentContext from '../../utils/CommentContext'
import axios from 'axios';
import './Main.css'
// import Join from '../../components/Join'
// import Chat from '../../components/Chat'

const { Header, Footer, Sider, Content } = Layout;

const {
  getPost,
  getComment,
  // getMyPost,
  // addPost,
  updatePost,
  // deletePost
  deleteComment,
} = PostAPI;

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
          console.log(data);
          setCommentState({ ...commentState, comments: data, });
        })
        .catch((err) => console.error(err));
        // console.log([data]);
        // const newCommentsArray = [data]
        // setCommentState({ ...commentState, comments: newCommentsArray });
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
        console.log(data);
        setPostState({ ...postState, posts: data });
      })
      .catch((err) => console.error(err));
    getComment()
      .then(({ data }) => {
        console.log(data);
        setCommentState({ ...commentState, comments: data });
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
    
      
      <Layout>
      <PostContext.Provider value={postState}>
        <Content>
        <h1>view all users posts</h1>
          {postState.posts.map((item) => (
            <div
              key={item._id}
              style={
                item.isSolved
                  ? { border: '1px solid green', margin: '5px' }
                  : { border: '1px solid red', margin: '5px' }
              }
            >
              <h2>{item.title}</h2>
              <h4>{`written by ${item.author.username}`}</h4>
              <span>{item.body}</span>
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
                    {`👍 ${item.likeValue}`}
                  </Button>
                </form>
              </div>
            </div>
          ))}
          </Content>
          </PostContext.Provider>
          <CommentContext.Provider value={commentState}>
          <Sider className="messageFeed">
          <input
            type='comment'
            name='comment'
            label='comment'
            value={commentState.comment}
            onChange={commentState.handleInputChange}
          />
          <div>
            <button onClick={commentState.handleAddComment}>Submit</button>
            {commentState.comments.map((comment) => (
                <Card className="commentCard">
                  <p>{comment.commentBody}</p>
                <Button 
                  className="commentBtn"
                  onClick={() => commentState.handleDeleteComment(comment._id)}
                >
                  🗑
                </Button>
                </Card>
            ))}
          </div>
          </Sider>
          </CommentContext.Provider>
        </Layout>
      
    
    </>
  );
};

export default Main;
