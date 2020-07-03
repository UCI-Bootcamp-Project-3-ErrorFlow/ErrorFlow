import React, { useState } from 'react';
import PostContext from '../../utils/PostContext'
import PostAPI from '../../utils/PostAPI'

const {
  getPost,
  // getMyPost,
  // addPost,
  // updatePost,
  // deletePost
} = PostAPI

//if you want to render as we go into the page.
class Main extends React.Component {
  state = {
    username: '',
    isLoading: true,
    isSolved: Boolean,
    posts: [],
  };

  // postState.handleInputNewPost = (event) => {
  //   setPostState({ ...postState, [event.target.name]: event.target.value });
  // };

  renderAllPosts = async () => {
    // event.preventDefault();
    await getPost()
      .then(({ data }) => {
        console.log(data);
        this.setState({ posts: data, isLoading: false });
      })
      .catch((err) => console.error(err));
  };

  componentDidMount() {
    this.renderAllPosts();
  }
  render() {
    const { isLoading, posts } = this.state;
    return (
      <>
      <PostContext.Provider value={this.state.isSolved}>
        <section>
          <h1>view all users posts</h1>
          {isLoading ? (
            <div>
              <span>loading...</span>
            </div>
          ) : (
            <div>
              {posts.map((item) => (
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
                </div>
              ))}
            </div>
          )}
        </section>
        </PostContext.Provider>
      </>
    );
  }
}
export default Main;
