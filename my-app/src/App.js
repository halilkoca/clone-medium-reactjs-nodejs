import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Feed from './components/Feed';
import Profile from './components/Profile';
import ArticleView from './components/ArticleView';
import Editor from './components/Editor';
import SignInWith from './components/SignInWith';
import requireAuthentication from './utils/requireAuth';

class App extends Component {
  render() {
    const pathname = window.location.pathname;
    return (
      <div>
        {!pathname.includes('editor') ? <Header /> : ''}
        <SignInWith />
        <Routes>
          <Route exact path="/" element={<Feed />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/articleview/:id" element={<ArticleView />} />
          <Route path="/editor" element={requireAuthentication(<Editor />)} />
          <Route path="*/*" element={<Feed />} />
        </Routes>
      </div>
    );
  }
}
export default App;