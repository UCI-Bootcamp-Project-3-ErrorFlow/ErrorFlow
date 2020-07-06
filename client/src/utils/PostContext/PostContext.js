import { createContext } from 'react';

const PostContext = createContext({
  post: '',
  posts: [],
  handleToggle: () => {},
  handleUpdatePost: () => {},
  handleUpdateLike: () => {},
  handleInputChange: () => {},
  handleGetPost: () => {},
  handleAddPost: () => {},
  handleGetMyPost: () => {},
  handleUpdatePost: () => {},
  handleDeletePost: () => {},
});

export default PostContext;
