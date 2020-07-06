import axios from 'axios';

const PostAPI = {
  getPost: () => axios.get('/api/posts'),
  getComment: () => axios.get('/api/comments'),
  getMyPost: () =>
    axios.get('/api/users/posts', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('user')}`,
      },
    }),
  addPost: (post) => axios.post('/api/myposts', post),
  deletePost: (id) =>
    axios.delete(`/api/myposts/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('user')}`,
      },
    }),
  deleteComment: (id) =>
    axios.delete(`/api/mycomments/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('user')}`,
      },
    }),
  updatePost: (id, updates) =>
    axios.put(`/api/myposts/${id}`, updates, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('user')}`,
      },
    }),
};

export default PostAPI;
