import React, { useState } from 'react';
import { Switch, Link, Route, BrowserRouter as Router } from 'react-router-dom';
import Main from './pages/Main';
import SignUp from './pages/SignUp';
import LikedPosts from './pages/LikedPosts';
import MyPosts from './pages/MyPosts';
import NewPosts from './pages/NewPosts';
import { Layout, Button } from "antd";
import './App.css';

const { Header, Content, Footer, Sider } = Layout

function App() {
  const [postState] = useState({
  });
  
  postState.signOutBtn = () => {
    localStorage.removeItem('user');
    window.location = '/';
  };

  return (
    <>
    <div className="App">
      
       
      
  

      <Layout>
        <Header className="header">
          <h1 className="title">
            <Router>
      
            <Link className="navBarFont" to='/'>Sign-Up </Link>
            <Link className="navBarFont" to='/Main'>Main-Paige </Link>
            <Link className="navBarFont" to='/LikedPosts'>Liked-Post </Link>
            <Link className="navBarFont" to='/MyPosts'>My-Posts </Link>
            <Link className="navBarFont" to='/NewPosts'>New-Posts </Link>
            <Button className="signOutBtn" onClick={postState.signOutBtn}>Sign Out</Button>
          <Switch>
            <Route exact path='/'>
              <SignUp />
            </Route>
            <Route path='/Main'>
              <Main />
            </Route>
            <Route path='/LikedPosts'>
              <LikedPosts />
            </Route>
            <Route path='/MyPosts'>
              <MyPosts />
            </Route>
            <Route path='/NewPosts'>
              <NewPosts />
            </Route>
            <Route path='/'> 404 Page Not Found</Route>
          </Switch>
      </Router>
          </h1>
        </Header>
      </Layout>
     
    
    </div>
      
    </>
  );
}

export default App;
