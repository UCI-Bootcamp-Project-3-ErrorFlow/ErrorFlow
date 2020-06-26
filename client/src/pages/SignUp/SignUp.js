import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [userState, setUserState] = useState({
    username: '',
    password: '',
    users: [],
  });

  userState.handleInputChange = (event) => {
    setUserState({ ...userState, [event.target.name]: event.target.value });
  };

  return (
    <>
      <h1>SignUp page</h1>

      <div>
        <form onSubmit={}>
          <input
            type='text'
            name='username'
            label='Username'
            value={userState.username}
          >
            {' '}
            username
          </input>
          <input
            type='text'
            name='password'
            label='Password'
            value={userState.password}
          >
            {' '}
            password
          </input>
          <button>submit</button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
