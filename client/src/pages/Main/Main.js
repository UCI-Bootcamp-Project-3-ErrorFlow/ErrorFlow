import React, { useState, useEffect } from 'react';
import PostContext from '../../utils/PostContext';
import PostAPI from '../../utils/PostAPI';
// import Join from '../../components/Join'
// import Chat from '../../components/Chat'


const {
  getPost,
  // getMyPost,
  // addPost,
  updatePost,
  // deletePost
} = PostAPI;

//if you want to render as we go into the page.
const Main = () => {
  const [postState, setPostState] = useState({
    comments: '',
    likeCount: 0,
    posts: [],
  });

  postState.handleInputChange = (event) => {
    setPostState({ ...postState, [event.target.name]: event.target.value });
  };

  postState.handleUpdateComent = (item, comment) => {
    console.log(`${item} and ${comment}`);
    // updatePost(item._id, {
    //   commentBody: comment,
    // })
    //   .then(() => {
    //     const postsCopy = JSON.parse(JSON.stringify(postState.posts));
    //     setPostState({ ...postState, posts: postsCopy });
    //   })
    //   .catch((err) => console.error(err));
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
  }, []);

  return (
    <>
      <PostContext.Provider value={postState}>
        <h1>view all users posts</h1>
        <div>
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
              <form>
                <input
                  type='text'
                  name='comments'
                  label='comments'
                  value={postState.comments}
                  onChange={postState.handleInputChange}
                  placeholder={'Add new comments'}
                ></input>
                <button
                  onClick={() =>
                    postState.handleUpdateComent(item, postState.comments)
                  }
                >
                  add comment
                </button>
                <button
                  // {/* style={{ cursor: 'pointer' }} */}
                  value={item.isLiked}
                  name={item.isLiked ? '👎' : '👍'}
                  onClick={() => postState.handleUpdateLike(item, item.isLiked)}
                >
                  {item.isLiked ? '👎' : '👍'}
                  {item.likeValue}
                </button>
              </form>
            </div>
          ))}
        </div>
      </PostContext.Provider>
    </>
  );
};

export default Main;
