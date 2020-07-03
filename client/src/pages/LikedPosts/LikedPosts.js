import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LikedPosts = () => {
  const [postState, setPostState] = useState({
    posts: [],
  });

  // useEffect(() => {
  //   axios
  //     .get('/api/posts/')
  //     .then(({ data }) => {
  //       setPostState({ ...postState, posts: data });
  //     })
  //     .catch((err) => console.error(err));
  // }, []);

  // bookState.handleDeleteBook = (book) => {
  //   axios
  //     .delete(`/api/books/${book._id}`)
  //     .then(() => {
  //       const books = JSON.parse(JSON.stringify(bookState.books));
  //       const booksFiltered = books.filter(
  //         (googleBook) => googleBook._id !== book._id
  //       );
  //       setBookState({ ...bookState, books: booksFiltered });
  //     })
  //     .catch((err) => console.error(err));
  // };

  return (
    <>
      <h1>This is the Liked Page</h1>
      {/* {postState.posts.map((item) => (
        <div title={item.title}>
          Liked post
          <h3>
            {item.title}
            {item.commentBody}
            {item.commentAuthor}
            {item.likeValue}
            {item.isLiked}
            {item.author}
          </h3>
        </div>
      ))} */}
    </>
  );
};

export default LikedPosts;
