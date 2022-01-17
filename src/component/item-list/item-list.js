import React, { Component } from 'react';
import Spinner from '../spinner';

import './item-list.css';

export default class ItemList extends Component {
  renderItems(arr) {
    return arr.map(({id, name}) => {
      return (
        <li className="list-group-item"
            key={id}
            onClick={() => this.props.onPersonSelected(id)}>
          {name}
        </li>
      );
    });
  }

  render() {
    const {peopleList} = this.props;
    if (!peopleList) {
      return (
        <Spinner />
      )
    }

    const items = this.renderItems(peopleList);

    return (
      <ul className="item-list list-group">
        {items}
      </ul>
    );
  }
};
