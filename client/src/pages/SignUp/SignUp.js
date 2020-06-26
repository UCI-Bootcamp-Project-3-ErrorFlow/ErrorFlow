import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [userState, setUserState] = useState({
    name: '',
    username: '',
    password: '',
    email: '',
    users: [],
  });

  userState.handleInputChange = (event) => {
    setUserState({ ...userState, [event.target.name]: event.target.value });
  };

  userState.handleSignUpBtn = (event) => {
    event.preventDefault();
    console.log(userState.username);
    console.log(userState.password);
    //request to server here
    axios.post('/api/users/register', {
      username: userState.username,
      password: userState.password
    })
      .then(data => {
        console.log(data)
      })
      .catch(err => console.error(err))
  };

  return (
    <>
      <h1>Sign In page</h1>
      {/* <div>
        <form>
          <label htmlFor='username'>Username: </label>
          <input
            type='text'
            name='username'
            onChange={userState.handleInputChange}
            value={userState.username}
          />
          <label htmlFor='username'>Password: </label>
          <input
            type='password'
            name='password'
            onChange={userState.handleInputChange}
            value={userState.password}
          />
          <button onClick={userState.handleSignUpBtn}>Submit:</button>
        </form>
      </div> */}

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
          onChange={userState.handleInputChange}
        />
        <label
          htmlFor='email'
        >Email</label>
        <input
          type='text'
          name='email'
          label='email'
          value={userState.email}
          onChange={userState.handleInputChange}/>
        <label
        htmlFor='username'
        >Username</label>
        <input
          type='text'
          name='username'
          label='username'
          value={userState.username}
          onChange={userState.handleInputChange}/>
        <label
        htmlFor='password'
        >Password</label>
        <input
          type='password'
          name='password'
          label='password'
          value={userState.password}
          onChange={userState.handleInputChange}/>
        <button onClick={userState.handleSignUpBtn}>Submit:</button>
      </form>
    </>
  );
};

export default SignUp;
