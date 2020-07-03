import React, { useState } from 'react';
import axios from 'axios';

// const Main = () => {
//   const [postState, setPostState] = useState({
//     username: '',
//     isSolved: Boolean,
//     posts: [],
//   });

//   // postState.handleLikePosts = (post) => {
//   //   axios
//   //     .post('/api/posts', {
//   //       title: post.title,
//   //       body: post.body,
//   //       isSolved: post.isSolved,
//   //       commentBody: [],
//   //       commentAuthor: [],
//   //       likeValue: {},
//   //       isLiked: true,
//   //     })
//   //     .then(({ data }) => {
//   //       const posts = postState.posts;
//   //       const postsFiltered = posts.filter((Post) => Post.id !== post.id);
//   //       setPostState({ ...postState, posts: postsFiltered });
//   //     })
//   //     .catch((err) => console.error(err));
//   // };

//   // postState.handleSolvePosts = (post) => {
//   //   axios
//   //     .post('/api/posts', {
//   //       title: post.title,
//   //       body: post.body,
//   //       isSolved: true,
//   //     })
//   //     .then(({ data }) => {
//   //       setPostState({ ...postState, posts: data })
//   //     })
//   //     .catch((err) => console.error(err));
//   // };

//   postState.renderAllPosts = (event) => {
//     event.preventDefault();
//     axios
//       .get('/api/posts')
//       .then(({ data }) => {
//         console.log(data);
//         setPostState({ ...postState, posts: data });
//       })
//       .catch((err) => console.error(err));
//   };

//   postState.handleInputNewPost = (event) => {
//     setPostState({ ...postState, [event.target.name]: event.target.value });
//   };

//   return (
//     <>
//       <h1>view all users posts</h1>
//       <button onClick={postState.renderAllPosts}>render</button>
//       {postState.posts.map((item) => (
//         <div
//           key={item._id}
//           style={
//             item.isSolved
//               ? { border: '1px solid green', margin: '5px' }
//               : { border: '1px solid red', margin: '5px' }
//           }
//         >
//           <h2>{item.title}</h2>
//           <h4>{`written by ${item.author.username}`}</h4>
//           <p>{item.body}</p>
          // <button onClick={() => postState.handleLikePosts(item)}>Like</button>
          // <button onClick={() => postState.handleSolvePosts(item)}>
//             It's Solved !
//           </button>
//         </div>
//       ))}
//     </>
//   );
// };

// export default Main;

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
    await axios
      .get('/api/posts')
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
      </>
    );
  }
}
export default Main;
