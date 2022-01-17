import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';

import './app.css';
import PeoplePage from '../people-page';


export default class App extends Component {
  state = {
    peopleList: null,
  };

  render() {
    
    return (
      <div>
        <Header />
        <RandomPlanet />
  
        <PeoplePage />
        <PeoplePage />
        <PeoplePage />
      </div>
    );
  };
};
