import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
  // this links and collection links are not the same

  // sadly, we cannot call Meteor.userId() to get the currently
  // logged in user. That's a design decision the meteor dev team
  // has taken


  // Meteor.publish('links', () => {
  //   return Links.find();
  // });

  // the way we can get access to the userId is through the
  // this keyword, and arrow functions do not have the this
  // binding, so we have to go back to es5 functions
  Meteor.publish('links', function() {
    return Links.find({
      userId: this.userId
    });
  });

  Meteor.methods({
    'links.insert'(url) {
      if (!this.userId) {
        throw new Meteor.Error('not-authorised');
      }

      // try {
      new SimpleSchema({
        url: {
          type: String,
          label: 'Your link', // this is for error message; just a label for this property
          regEx: SimpleSchema.RegEx.Url
        }
      }).validate({
        url
      });
      // } catch(e) {
      //   throw new Meteor.Error(400, e.message)
      // }

      Links.insert({
        _id: shortid.generate(),
        url,
        userId: this.userId,
        visible: true,
        visitedCount: 0,
        lastVisitedAt: null
      });
    },
    'links.setVisibility'(_id, visible) {
      // check if the user is logged in
      if (!this.userId) {
        throw new Meteor.Error('not-authorised')
      }

      new SimpleSchema({
        _id: {
          type: String,
          min: 1,
        },
        visible: {
          type: Boolean
        }
      }).validate({
        _id,
        visible
      });

      Links.update({_id}, {$set: {visible}});
    },
    'links.trackVisit'(_id) {
      new SimpleSchema({
        _id: {
          type: String,
          min: 1
        }
      }).validate({
        _id
      });

      Links.update({ _id }, {
        $set: {
          lastVisitedAt: new Date().getTime()
        },
        $inc: {
          visitedCount: +1
        }
      });
    }
  });
}
