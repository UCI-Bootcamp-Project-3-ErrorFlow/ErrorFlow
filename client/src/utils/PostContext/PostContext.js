import { createContext } from 'react';

const PostContext = createContext({
  post: '',
  posts: [],
  handleToggle: () => {},
  handleInputChange: () => {},
  handleGetPost: () => {},
  handleAddPost: () => {},
  handleGetMyPost: () => {},
  handleUpdatePost: () => {},
  handleDeletePost: () => {},
})

export default PostContext;
