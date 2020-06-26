import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [userState, setUserState] = useState({
    name: '',
    username: '',
    password: '',
    newUsername: '',
    newPassword: '',
    email: '',
    users: [],
  });

  userState.handleInputSignUp = (event) => {
    setUserState({ ...userState, [event.target.name]: event.target.value });
  };

  userState.handleInputSignIn = (event) => {
    setUserState({ ...userState, [event.target.name]: event.target.value });
  };

  userState.handleSignUpBtn = (event) => {
    event.preventDefault();
    //request to server here
    axios.post('/api/users/register', {
      username: userState.newUsername,
      password: userState.newPassword
    })
      .then(data => {
        if ({ data }) {
          console.log('successful signup')
          
        } else {
          console.log('Sign-up error')
        }
      })
      .catch(err => console.error(err))
      if (localStorage.getItem('user')) {
        axios
          .get('/api/users/authorize', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('user')}`,
            },
          })
          .then(() => {     
          setUserState({
            redirectTo: '/Main'})
          })
          .catch((err) => console.error(err));
      }
  };

  userState.handleSignInBtn = (event) => {
    event.preventDefault();
    axios.post('/api/users/login', {
            username: userState.username,
            password: userState.password,
          })
          .then(({ data }) => {
            if (data) {
              localStorage.setItem('user', data);
              window.location = '/Main';
            } else {
              alert('Incorrect username or password!');
            }
          })
          .catch((err) => console.error(err));
  }

  return (
    <>
      <h1>Sign In page</h1>
      <div>
        <form>
          <label htmlFor='username'>Username: </label>
          <input
            type='text'
            name='username'
            onChange={userState.handleInputSignIn}
            value={userState.username}
          />
          <label htmlFor='username'>Password: </label>
          <input
            type='password'
            name='password'
            onChange={userState.handleInputSignIn}
            value={userState.password}
          />
          <button onClick={userState.handleSignInBtn}>Submit:</button>
        </form>
      </div>

      <h3>Sign Up Form</h3>
      <form>
        <label
        htmlFor='name'
        >Name</label>
        <input
          type='text'
          name='name'
          label='name'
          value={userState.name}
          onChange={userState.handleInputSignUp}
        />
        <label
          htmlFor='email'
        >Email</label>
        <input
          type='text'
          name='email'
          label='email'
          value={userState.email}
          onChange={userState.handleInputSignUp}/>
        <label
        htmlFor='newUsername'
        >Username</label>
        <input
          type='text'
          name='newUsername'
          label='newUsername'
          value={userState.newUsername}
          onChange={userState.handleInputSignUp}/>
        <label
        htmlFor='newPassword'
        >Password</label>
        <input
          type='password'
          name='newPassword'
          label='newPassword'
          value={userState.newPassword}
          onChange={userState.handleInputSignUp}/>
        <button onClick={userState.handleSignUpBtn}>Submit:</button>
      </form>
    </>
  );
};

export default SignUp;
