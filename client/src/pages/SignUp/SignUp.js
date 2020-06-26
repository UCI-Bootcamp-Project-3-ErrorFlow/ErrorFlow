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
    console.log(userState.username);
    console.log(userState.password);
  };

  return (
    <>
      <h1>SignUp page</h1>

      <div>
        <form>
          <label htmlFor='username'>username</label>
          <input
            type='text'
            name='username'
            onChange={userState.handleInputChange}
            value={userState.username}
          />
          <label htmlFor='username'>password</label>
          <input
            type='text'
            name='password'
            onChange={userState.handleInputChange}
            value={userState.password}
          />
          <button onClick={userState.handleSignUpBtn}>submit</button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
