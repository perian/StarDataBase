import React, { Component } from 'react';

import ItemList from '../item-list/item-list';
import PersonDetails from '../person-details/person-details';
import ErrorIndicator from '../error-indicator/error-indicator';
import SwapiService from '../../services/swapi-service';

import './people-page.css';

export default class PeoplePage extends Component {

  state = {
    selectedPerson: 3,
    hasError: false,
  };

  componentDidCatch(error, info) {
    debugger;
    this.setState({
      hasError: true,
    });
  }

  swapiService = new SwapiService();
  
  componentDidMount() {
    this.swapiService
      .getAllPeople()
      .then((peopleList) => {
        this.setState({
          peopleList
        });
      });
  }
  
  onPersonSelected = (id) => {
    this.setState({
      selectedPerson: id,
    })
  }

  render() {
    const {selectedPerson, peopleList, hasError} = this.state;

    if (hasError) {
      return (
        <ErrorIndicator />
      )
    }

    return (
      <div className="row mb2">
          <div className="col-md-6">
            <ItemList onPersonSelected={this.onPersonSelected} peopleList={peopleList}/>
          </div>
          <div className="col-md-6">
            <PersonDetails personId={selectedPerson}/>
          </div>
        </div>
    );
  }
}
