import React, { Component } from 'react';

import PrivateHeader from './privateHeader';
import LinksList from './linksList';
import AddLink from './addLink';
import LinkListFilter from './linkListFilter';

export default class Link extends Component {
  render() {
    return (
      <div>
        <PrivateHeader title="Your Links" />
        <div className="page-content">
          <LinkListFilter />
          <AddLink />
          <LinksList />
        </div>
      </div>
    );
  }
}
