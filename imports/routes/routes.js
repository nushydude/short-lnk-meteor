import {Meteor} from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Link from './../ui/link';
import Login from './../ui/login';
import NotFound from './../ui/notfound';
import Signup from './../ui/signup';

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];

onEnterPublicPage = () => {
  if (Meteor.userId()) {
    browserHistory.replace('/links');
  }
}

onEnterPrivatePage = () => {
  if (!Meteor.userId()) {
    browserHistory.replace('/');
  }
}

export const onAuthChange = (isAuthenticated) => {  
  const pathname = browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  console.log('isAuthenticated:', isAuthenticated);

  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace('/links');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/');
  }
}

export const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} onEnter={onEnterPublicPage} />
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPage} />
    <Route path="/links" component={Link} onEnter={onEnterPrivatePage}/>
    <Route path="*" component={NotFound} />
  </Router>
);
