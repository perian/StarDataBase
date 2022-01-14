import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import './random-planet.css';

export default class RandomPlanet extends Component {

  swapiService = new SwapiService();

  state = {
    name: null,
    diameter: null,
    population: null,
    rotationPeriod: null,
  };

  updatePlanet() {
    const PLANET_AMMOUNT = 25;
    const FIRST_PLANET = 1;
    const id = Math.floor(Math.random() * PLANET_AMMOUNT) + FIRST_PLANET;
    this.swapiService.getPlanet(22).then((planet) => {
      this.setState({
        id,
        name: planet.name,
        diameter: planet.diameter,
        population: planet.population,
        rotationPeriod: planet.rotation_period,
      })
    })
  };
 
  constructor() {
    super();
    this.updatePlanet();
  }

  render() {
    const {
      id,
      name,
      diameter,
      population,
      rotationPeriod,
    } = this.state;

    return (
      <div className="random-planet jumbotron rounded">
        <img className="planet-image"
             src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
        <div>
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Population</span>
              <span>{population}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Rotation period</span>
              <span>{rotationPeriod}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Diameter</span>
              <span>{diameter}</span>
            </li>
          </ul>
        </div>
      </div>
    );
  };
};

