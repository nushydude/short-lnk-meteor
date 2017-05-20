import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';

export default class AddLink extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '',
      isOpen: false,
      error: ''
    };
  }

  handleUrlChange(e) {
    const url = e.target.value.trim();
    this.setState({
      url
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    Meteor.call('links.insert', this.state.url, (err, res) => {
      if (!err) {
        this.handleModalClose();
      } else {
        this.setState({ error: err.reason });
      }
    });
  }

  handleModalClose() {
    this.setState({
      url: '',
      isOpen: false
    });
  }

  render() {
    return (
      <div>
        <button className="button" onClick={() => this.setState({isOpen: true})}>+ Add Link</button>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel="Add link"
          onAfterOpen={() => this.refs.url.focus()}
          onRequestClose={this.handleModalClose.bind(this)}
          className="boxed-view__box"
          overlayClassName="boxed-view boxed-view--modal"
        >
          <h2>Add Link</h2>
          {
            this.state.error &&
            <p>{this.state.error}</p>
          }
          <form className="boxed-view__form" onSubmit={this.handleSubmit.bind(this)}>
            <input
              type="text"
              ref="url"
              placeholder="URL"
              value={this.state.url}
              onChange={this.handleUrlChange.bind(this)}
            />
            <button className="button" type="submit" disabled={!this.state.url}>Add link</button>
            <button className="button button--secondary" type="button" onClick={this.handleModalClose.bind(this)}>Cancel</button>
          </form>
        </Modal>
      </div>
    );
  }
}
