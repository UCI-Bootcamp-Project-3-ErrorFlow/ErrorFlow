import React, { useState, useEffect } from 'react'
import axios from 'axios'

const LikedPosts = () => {
//   const [ likeState, setLikeState] = useState({
//     posts: []
//   })

//  useEffect(() => {
//     axios.get(`/api/posts/${posts._id}`)
//       .then(({ data }) => { 
//         setLikeState({ ...likeState, posts: data })
//       .then(({ data }) => {
//         const likeFiltered = data.filter( like => like.isLiked === true )
//         setLikeState({ ...likeState, posts: likeFiltered})
//       })
//       .catch(err => console.log(err))
//       })
    
//       .catch(err => console.error(err))
//   }, [])

  return (
    <>
    <h1>This is the Liked Page</h1>
    {
      // likeState.likes.map(like => (
      // <div title={likes.title}>Liked post
      // <h3>
      //   {likes.title}
      //   {likes.tag}
      //   {likes.commentBody}
      //   {likes.commentAuthor}
      //   {likes.likeValue}
      //   {likes.isLiked}
      //   {likes.author}
      // </h3>
      // </div>

      // ))
}
    </>
  )
};

export default LikedPosts;
