import React, { useState } from 'react';
// import axios from 'axios';

const SignUp = () => {
  const [userState, setUserState] = useState({
    username: '',
    password: '',
    users: [],
  });

  userState.handleInputChange = (event) => {
    setUserState({ ...userState, [event.target.name]: event.target.value });
  };

  userState.handleSignUpBtn = (event) => {
    event.preventDefault();
    console.log('ping')
    
  };

  return (
    <>
      <h1>SignUp page</h1>

      <div>
        <form>
          <input
            type='text'
            name='username'
            label='Username'
            value={userState.username}
          />
          username
          <input
            type='text'
            name='password'
            label='Password'
            value={userState.password}
          />
          password
          <button onClick={userState.handleSignUpBtn}> submit</button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
