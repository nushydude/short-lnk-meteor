import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import './../imports/api/users';
import { Links } from './../imports/api/links';

import './../imports/startup/simple-schema-config';

Meteor.startup(() => {
  // code to run on server at startup

  // a middleware to redirect the shortlinks
  WebApp.connectHandlers.use((req, res, next) => {
     // cut the leading / from the url
    const _id = req.url.slice(1);

    // find the record matching the short url
    const link = Links.findOne({_id});

    // if a record is found, then redirect to that url
    if (link) {
      // set status to redirected
      res.statusCode = 302;
      res.setHeader('Location', link.url);
      // finalise the response
      res.end();
      Meteor.call('links.trackVisit', _id);
    } else {
      // just pass if this is not a short link stored in the links collection
      next();
    }
  });

});
