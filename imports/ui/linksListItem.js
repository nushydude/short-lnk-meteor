import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';

class LinksListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false
    };
  }

  componentDidMount() {
    this.clipboard = new Clipboard(this.refs['copy-button']);

    this.clipboard.on('success', () => {
      this.setState({
        copied: true
      });
      setTimeout(() => {
        this.setState({
          copied: false
        });
      }, 1000);
    }).on('error', () => {
      console.log('Unable to copy the link');
    });
  }

  componentWillUnmount() {
    this.clipboard.destroy();
  }

  renderStats() {
    const visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits';
    let visitedMessage = null;
    if (this.props.lastVisitedAt) {
      visitedMessage =
      `(last visited ${moment(this.props.lastVisitedAt).fromNow()})`
    }
    return (
      <p className="item__message">{this.props.visitedCount} {visitMessage} {visitedMessage}</p>
    )
  }

  render() {
    return (
      <div className="item">
        <h2>{this.props.url}</h2>
        <p className="item__message">{this.props.shortUrl}</p>
        {this.renderStats()}
        <a
          className="button button--link button--pill"
          href={this.props.shortUrl}
          target="_blank"
        >
          Visit
        </a>
        <button
          className="button button--pill"
          ref="copy-button"
          data-clipboard-text={this.props.shortUrl}
        >
          {this.state.copied ? 'Copied': 'Copy'}
        </button>
        <button
          className="button button--pill"
          onClick={() => Meteor.call('links.setVisibility', this.props._id, !this.props.visible)}>
          {this.props.visible ? 'Hide' : 'Unhide'}
        </button>
      </div>
    );
  }
}

LinksListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  shortUrl: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  visitedCount: PropTypes.number.isRequired,
  lastVisitedAt: PropTypes.number
}

export default LinksListItem;
