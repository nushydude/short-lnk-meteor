import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    let email = this.refs['input-email'].value.trim();
    let password = this.refs['input-password'].value.trim();

    if (password.length < 6) {
      return this.setState({
        error: 'Password must be 6 or more characters long'
      });
    }

    Accounts.createUser({email, password}, (err) => {
      if (err) {
        this.setState({
          error: err.reason
        });
      } else {
        this.setState({
          error: ''
        });
      }
    })
  }

  renderError() {
    if (this.state.error) {
      return <p>{this.state.error}</p>
    }
  }

  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Join Short Lnk</h1>

          {this.renderError()}

          <form className="boxed-view__form" onSubmit={this.handleSubmit.bind(this)} noValidate>
            <input type="email" ref="input-email" name="email" placeholder="Email" />
            <input type="password" ref="input-password" name="password" placeholder="Password" />
            <button className="button" type="submit">Create Account</button>
          </form>

          <Link to="/">Already have an account?</Link>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {

};

export default Signup;
