import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';

class Login extends Component {
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

    Meteor.loginWithPassword({email}, password, (err) => {
      if (err) {
        this.setState({
          error: 'Unable to login. Check email and password.'
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
          <h1>Short Lnk</h1>

          {this.renderError()}

          <form className="boxed-view__form" onSubmit={this.handleSubmit.bind(this)} noValidate>
            <input type="email" ref="input-email" name="email" placeholder="Email" />
            <input type="password" ref="input-password" name="password" placeholder="Password" />
            <button className="button" type="submit">Login</button>
          </form>

          <Link to="/signup">Don't have an account?</Link>
        </div>
      </div>
    );
  }
}

export default Login;
