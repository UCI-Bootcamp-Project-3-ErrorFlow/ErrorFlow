import React from 'react';
import { Switch, Link, Route, BrowserRouter as Router } from 'react-router-dom';
import Main from './pages/Main';
import SignUp from './pages/SignUp';
// import LikedPost from './pages/LikedPost';
import './App.css';
// import TextEditor from './components/textEditor';

function App() {
  return (
    <>
      <Router>
        <div>
          <nav>
            <Link to='/'>SignUp</Link>
            <Link to='/Main'>Main</Link>
            {/* <Link to='/LikedPost'>LikedPost</Link> */}
          </nav>
          <Switch>
            <Route exact path='/'>
              <SignUp />
            </Route>
            <Route path='/Main'>
              <Main />
            </Route>
            {/* <Route path='/LikedPost'>
              <LikedPost />
            </Route> */}
            <Route path='/'> 404 Page Not Found</Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
