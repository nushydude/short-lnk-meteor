import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

class LinkListFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showVisible: true
    };
  }

  componentDidMount() {
    this.tracker = Tracker.autorun(() => {
      this.setState({
        showVisible: Session.get('showVisible')
      })
    });
  }

  componentWillUnmount() {
    this.tracker.flush();
  }

  render() {
    return (
      <div>
        <label className="checkbox">
          <input
            className="checkbox__box"
            type="checkbox"
            value={!this.state.showVisible}
            checked={!this.state.showVisible}
            onChange={e => Session.set('showVisible', !e.target.checked)}
          />
          Show hidden links
        </label>
      </div>
    );
  }
}

LinkListFilter.propTypes = {
  showHidden: PropTypes.bool,
};

export default LinkListFilter;
