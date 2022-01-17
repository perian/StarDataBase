import React, { Component } from 'react';
import Spinner from '../spinner'
import SwapiService from '../../services/swapi-service';
import ErrorIndicator from '../error-indicator'
import './random-planet.css';

export default class RandomPlanet extends Component {

  swapiService = new SwapiService();

  state = {
    planet: {},
    loading: true,
  };

  onPlanetLoaded = (planet) => {
    this.setState({
      planet,
      loading: false,
      error: false
    })
  }

  updatePlanet = () => {
    const PLANET_AMMOUNT = 25;
    const FIRST_PLANET = 1;
    const id = Math.floor(Math.random() * PLANET_AMMOUNT) + FIRST_PLANET;

    this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError);
      
    console.log('update');
  };

  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    })
  }

  componentDidMount() {
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, 10000);
    
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
    clearInterval(this.setInterval);
  }

  render() {
    console.log('render()');
    const {planet, loading, error} = this.state;
    const hasData = !(loading || error);
    const errorMessage = error ? <ErrorIndicator/> :null
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <PlanetView planet={planet}/> : null

    return (
      <div className="random-planet jumbotron rounded">
        {errorMessage}
        {spinner}
        {content}
      </div>
    )
  };
};

const PlanetView = ({planet}) => {
  const {
    id,
    name,
    diameter,
    population,
    rotationPeriod,
  } = planet;

  return (
    <React.Fragment>
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
    </React.Fragment>
  )
}
