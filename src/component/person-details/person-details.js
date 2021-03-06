import React, { Component } from 'react';
import Spinner from '../spinner';
import SwapiService from '../../services/swapi-service';
import './person-details.css';
import ErrorButton from '../error-button/';
export default class PersonDetails extends Component {
  swapiService = new SwapiService();

  state = {
    person: null,
  }

  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps) {
    if (this.props.personId !== prevProps.personId) {
      this.updatePerson();
    }
  }

  updatePerson() {
    const {personId} = this.props;
    if (!personId) {
      return;
    }

    this.swapiService
      .getPerson(personId)
      .then((person) => {
        this.setState({
          person,
        });
      });
  }

  render() {
  const {person, loading} = this.state

    if (!person) {
      return (
        <div className="person-details card">
          <Spinner />
      </div>
      )
    }
    
    const content = loading ? <Spinner /> : <PersonView person={person} />;

    return (
      <div className="person-details card">
        {content}
      </div>
    )
  }
}

const PersonView = ({person}) => {

  const {
    id,
    name,
    gender,
    eyeColor,
    birthYear,
  } = person;

  return (
    <React.Fragment>
       <img className="person-image"
          src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} />

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year</span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color</span>
              <span>{eyeColor}</span>
            </li>
          </ul>
          <ErrorButton />
        </div>
    </React.Fragment>
  )
}