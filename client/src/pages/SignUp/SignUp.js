import React, { useState } from 'react';
import { Layout, Card} from 'antd';
import axios from 'axios';
import './SignUp.css'


const { Header, Footer, Sider, Content } = Layout;

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
    axios
      .post('/api/users/register', {
        username: userState.newUsername,
        password: userState.newPassword,
      })
      .then((data) => {
        if ({ data }) {
          console.log('successful signup');
        } else {
          console.log('Sign-up error');
        }
      })
      .catch((err) => console.error(err));
    if (localStorage.getItem('user')) {
      axios
        .get('/api/users/authorize', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('user')}`,
          },
        })
        .then(() => {
          setUserState({
            redirectTo: '/Main',
          });
        })
        .catch((err) => console.error(err));
    }
    setUserState({
      name: '',
      username: '',
      password: '',
      newUsername: '',
      newPassword: '',
      email: '',
    });
  };

  userState.handleSignInBtn = (event) => {
    event.preventDefault();
    localStorage.setItem('username', userState.username);
    axios
      .post('/api/users/login', {
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
  };

  return (
    
    <>
  
    <Content>
      
      {localStorage.getItem('user') ? (
        window.location= '/Main'
      ) : (

       
        <Card classNAme="sign-In-Body">
          <div className="sign-In">
          <h3>Sign In</h3>
          <form>
              <input
                placeholder="Username"
                type='text'
                name='username'
                onChange={userState.handleInputSignIn}
                value={userState.username}
              />
              <br></br>
              <input
                placeholder="Password"
                type='password'
                name='password'
                onChange={userState.handleInputSignIn}
                value={userState.password}
              />
          <br></br>
          <br></br>
            <button onClick={userState.handleSignInBtn}>Sign In</button>
          </form>
          </div>
        </Card>
        
      )}
    </Content>
    <Content>
      <Card className ="card">
        <div className = "sign-Up">
      <h3>Sign Up</h3>
      <form>
        <input
         placeholder="Name"
          type='text'
          name='name'
          label='name'
          value={userState.name}
          onChange={userState.handleInputSignUp}
        />
        <br></br>
        <input
          placeholder="Email"
          type='text'
          name='email'
          label='email'
          value={userState.email}
          onChange={userState.handleInputSignUp}
        />
        <br></br>
        <input
         placeholder="Username"
          type='text'
          name='newUsername'
          label='newUsername'
          value={userState.newUsername}
          onChange={userState.handleInputSignUp}
        />
        <br></br>
        <input
          placeholder="Password"
          type='password'
          name='newPassword'
          label='newPassword'
          value={userState.newPassword}
          onChange={userState.handleInputSignUp}
        />
        <br></br>
        <br></br>
        <button onClick={userState.handleSignUpBtn}>Sign Up</button>
      </form>
      </div>
      </Card>
      </Content>
      
       <Footer className= "footer" style={{ textAlign: 'center' }}>ErrorFlow ©2020 Created by Flow Team</Footer>
    </>
  );
};

export default SignUp;
