import { createContext } from 'react';

const CommentContext = createContext({
  comment: '',
  comments: [],
  handleInputChange: ()=> {},
  handleDeleteComment: ()=>{},
  handleAddComment: ()=> {}
});

export default CommentContext;
