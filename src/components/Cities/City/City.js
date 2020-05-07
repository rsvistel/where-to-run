import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../../store/actions/index';

const City = props => {
  const { onFetchEvents } = props;
  const { onFetchLocations } = props;

  useEffect(() => {
    onFetchEvents(props.match.params.name.toLowerCase());
    props.onResetEvents();
  }, [onFetchEvents]);

  useEffect(() => {
    onFetchLocations(props.match.params.name.toLowerCase());
  }, [onFetchLocations]);

  let events = 'Loading...';
  if (!props.events.loading) {
    events = props.events.events.map(event => (
      <Link key={event.eventId} to={'/cities/'+ props.match.params.name + '/event/' + event.eventId}>
        <div key={event.name}>
          <h4>{event.name} | {event.city}</h4>
          <h5>{event.location}</h5>
          <p><b>{event.date}</b></p>
        </div>
      </Link>
    ))
  }

  let locations = 'Loading...';
  if (!props.locations.loading) {
    locations = props.locations.locations.map(location => (
      <Link key={location.name} to={'/cities/'+ props.match.params.name + '/location/' + location.name}>
        <div>
          <h4>{location.name}</h4>
          <h5>{location.category}</h5>
          <p>{location.location}</p>
        </div>
      </Link>
    ))
  }

  return(
    <div>
      <h2>{props.match.params.name}</h2>
      <h3>Events</h3>
      {events}
      <Link to={'/cities/'+ props.match.params.name + '/create-event'}>Create New Event</Link>
      <h3>Locations</h3>
      {locations}
      <Link to={'/cities/'+ props.match.params.name + '/create-location'}>Create New Location</Link>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    events: state.events,
    locations: state.locations
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchEvents: (city) =>
      dispatch(actions.fetchEvents(city)),
    onResetEvents: () => dispatch(actions.resetEvents()),
    onFetchLocations: (city) =>
      dispatch(actions.fetchLocations(city))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(City);