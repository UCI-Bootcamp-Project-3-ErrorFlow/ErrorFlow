import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { Button } from 'antd';
import { Switch, Link, Route, BrowserRouter as Router } from 'react-router-dom';
import Main from './pages/Main';
import SignUp from './pages/SignUp';
import MyPosts from './pages/MyPosts';
import NewPosts from './pages/NewPosts';
import Join from './components/Join';
import Chat from './components/Chat';
import './App.css';

const { Header } = Layout;

function App() {
  const [postState] = useState({});

  postState.signOutBtn = () => {
    localStorage.removeItem('user');
    window.location = '/';
  };

  return (
    <>
      <Router>
        <div>
          <Header className='navBar'>
            <Button className='navBtns'>
              <Link to='/'>Sign Up</Link>
            </Button>
            <Button className='navBtns'>
              <Link to='/Main'>Main</Link>
            </Button>

            <Button className='navBtns'>
              <Link to='/MyPosts'>My Posts</Link>
            </Button>
            <Button className='navBtns'>
              <Link to='/NewPosts'>New Posts</Link>
            </Button>
            <Button className='navBtns'>
              <Link to='/join'>Join chat</Link>
            </Button>

            <Button className='navBtns' onClick={postState.signOutBtn}>
              Sign Out
            </Button>
            <h2 className='navHeader'>ErrorFlow</h2>
          </Header>
          <Switch>
            <Route exact path='/'>
              <SignUp />
            </Route>
            <Route path='/Main'>
              <Main />
            </Route>
            <Route path='/MyPosts'>
              <MyPosts />
            </Route>
            <Route path='/NewPosts'>
              <NewPosts />
            </Route>
            <Route path='/join'>
              <Join />
            </Route>
            <Route path='/chat' component={Chat}></Route>
            <Route path='/'> 404 Page Not Found</Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
