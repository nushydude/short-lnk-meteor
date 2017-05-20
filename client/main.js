import {Meteor} from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import { routes, onAuthChange } from './../imports/routes/routes';
import { Links } from './../imports/api/links';
import './../imports/startup/simple-schema-config';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

Meteor.startup(() => {
  Session.set('showVisible', true);
  ReactDOM.render(
    routes, document.getElementById('app'));
});
