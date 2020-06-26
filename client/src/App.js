import React from 'react';
import { Switch, Link, Route, BrowserRouter as Router } from 'react-router-dom';
import Main from './pages/Main';
import SignUp from './pages/SignUp';
import LikedPost from './pages/LikedPost';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <div>
          <nav>
            <Link></Link>
            <Link></Link>
            <Link></Link>
          </nav>
        </div>
      </Router>
    </>
  );
}

export default App;
