import React, { Component } from 'react';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import ReactFlipMove from 'react-flip-move';

import { Links } from './../api/links';
import LinksListItem from './linksListItem';


export default class LinksList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: []
    };
  }

  componentDidMount() {
    this.linksTracker = Tracker.autorun(() => {
      // subscribe to our custom publication
      Meteor.subscribe('links');
      const links = Links.find({
        visible: Session.get('showVisible')
      }).fetch();
      this.setState({
        links
      });
    });
  }

  componentWillUnmount() {
    // stop the tracker
    this.linksTracker.stop();
  }

  renderLinksListItems() {
    if (this.state.links.length === 0) {
        return (
          <div className="item">
            <p className="item__status-message">No links found</p>
          </div>
        );
    }

    return this.state.links.map(link => {
      const shortUrl = Meteor.absoluteUrl(link._id);
      return (
        <LinksListItem
          key={link._id}
          shortUrl={shortUrl}
          {...link}
        />
      );
    })
  }

  render() {
    return (
      <div>
        <ReactFlipMove maintainContainerHeight={true}>
          {this.renderLinksListItems()}
        </ReactFlipMove>
      </div>
    );
  }
}
