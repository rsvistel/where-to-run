import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import CreateEvent from "./CreateEvent/СreateEvent";
import { Redirect } from "react-router-dom";
import MapContainer from "../../shared/MapContainer/MapContainer";

const Event = props => {
  const { onTryAutoSignup } = props;

  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  const [editor, showEditor] = useState(false);
  const [deleting, setDeleting] = useState(false);

  let event;
  let eventData;

  const deleteEvent = () => {
    props.onDeleteEvent(props.match.url.split('/')[2].toLowerCase(), props.match.params.eventId);
  };

  const loadEvent = () => {
    if (props.events[0]) {
      for (let i = 0; i < props.events.length; i++) {
        if (props.events[i].eventId && props.events[i].eventId === props.match.params.eventId) {
          event = props.events[i]
        }
      }
    }
    if (event) {
      const setNewId = (id) => {
        window.location.href = props.match.url + '#' + id
      };
      const editEvent = () => {
        props.onResetEvents();
        showEditor(true);
      };
      const reloadEvent = () => {
        showEditor(false);
        if (!window.location.href.split('#')[1]) {
          props.onFetchEvents(props.match.url.split('/')[2].toLowerCase(), props.match.params.userId);
        }
      };
      eventData = (
        <div>
          {editor ?
            <CreateEvent
              event={event}
              deleteCity={props.match.url.split('/')[2].toLowerCase()}
              deleteId={props.match.params.eventId}
              setNewId={(id) => setNewId(id)}
              onFinished={reloadEvent}/> :
            <div>
              {window.location.href.split('#')[1] ?
                <Redirect to={'/cities/' +
                props.match.url.split('/')[2] + '/event/' + window.location.href.split('#')[1] }/> : null}
              <h2>{event.name}</h2>
              <h3>{event.city}</h3>
              <h4>{event.location}</h4>
              <p>{event.description}</p>
              <b>{event.date}</b>
              {event.userId === props.userId ?
                <div>
                  <button onClick={() => {deleteEvent(); setDeleting(true)}}>Delete Event</button>
                  <button onClick={editEvent}>Edit Event</button>
                </div> : null
              }
              <div>
                <MapContainer lat={event.lat} lng={event.lng}/>
              </div>
            </div>
          }
        </div>
      );
    }
  };

  loadEvent();

  if (!event) {
    eventData = 'Loading...';
    props.onFetchEvents(props.match.url.split('/')[2].toLowerCase(), props.match.params.eventId);
  }

  if (!props.events.loading && event) {
    loadEvent()
  }

  return(
    <div>
      {props.loading ? 'Loading...' :
        <div>
          {deleting && props.deleted ?
            <Redirect to={'/cities/' + props.match.url.split('/')[2]}/>
            : eventData}
        </div>
      }
    </div>
  );
};

const mapStateToProps = state => {
  return {
    events: state.events.events,
    loading: state.events.loading,
    deleted: state.events.deleted,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchEvents: (city, eventId) =>
      dispatch(actions.fetchEvents(city, eventId)),
    onDeleteEvent: (city, eventId) =>
      dispatch(actions.deleteEvent(city, eventId)),
    onResetEvents: () => dispatch(actions.resetEvents()),
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Event);