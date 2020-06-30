import React from 'react';
import { Switch, Link, Route, BrowserRouter as Router } from 'react-router-dom';
import Main from './pages/Main';
import SignUp from './pages/SignUp';
import LikedPosts from './pages/LikedPosts';
import MyPosts from './pages/MyPosts';
import NewPosts from './pages/NewPosts';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <div>
          <nav>
            <Link to='/'>Sign Up</Link>
            <Link to='/Main'>Main</Link>
            <Link to='/LikedPosts'>Liked Post</Link>
            <Link to='/MyPosts'>My Posts</Link>
            <Link to='/NewPosts'>New Posts</Link>
          </nav>
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
        </div>
      </Router>
    </>
  );
}

export default App;
