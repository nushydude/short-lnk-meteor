import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';

// validateNewUser function will be called
// before createUser is called.
// if we return false, createUser will not be called
Accounts.validateNewUser((user) => {
  // console.log('This is the user:', user);
  const email = user.emails[0].address;

  // no need for try catch because we overrode the
  // behaviour in /imports/startup/simple-schema-config.js file
  //try {
  new SimpleSchema({
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.Email
    }
  }).validate({
    email
  });
  // } catch(e) {
  //   throw new Meteor.Error(400, e.message)
  // }

  return true;
})


/*
// generic error
try {
  throw new Error('This is a generic error');
} catch(e) {
  console.log(e);
}

// meteor error
try {
  throw new Meteor.Error(
    'This is the error',
    'This is the reason');
} catch (e) {
  console.log(e);
}
*/



/*
const employeeSchema = new SimpleSchema({
  name: {
    type: String,
    min: 1,
    max: 200,
  },
  hourlyWage: {
    type: Number,
    min: 0,
  },
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  }
});

employeeSchema.validate({
  name: 'Anusha',
  hourlyWage: 10.50,
  email: 'youdud@x.xx'
});*/
