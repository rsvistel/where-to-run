import * as actionTypes from './actionTypes';
import axios from '../../axios-config';

export const createEventSuccess = ( id, eventData ) => {
  return {
    type: actionTypes.CREATE_EVENT_SUCCESS,
    eventId: id,
    eventData: eventData
  };
};

export const createEventFail = ( error ) => {
  return {
    type: actionTypes.CREATE_EVENT_FAIL,
    error: error
  };
};

export const createEventStart = () => {
  return {
    type: actionTypes.CREATE_EVENT_START
  };
};

export const createEvent = ( eventData ) => {
  return dispatch => {
    dispatch( createEventStart() );
    axios.post( '/events/' + eventData.eventData.city.toLowerCase() + '.json', eventData.eventData )
      .then( response => {
        dispatch( createEventSuccess( response.data.name, eventData ) );
      } )
      .catch( error => {
        dispatch( createEventFail( error ) );
      } );
  };
};

export const deleteEventSuccess = () => {
  return {
    type: actionTypes.DELETE_EVENT_SUCCESS
  };
};

export const deleteEventStart = () => {
  return {
    type: actionTypes.DELETE_EVENT_START
  };
};

export const deleteEvent = ( city, eventId ) => {
  return dispatch => {
    dispatch( deleteEventStart() );
    let queryParams = '';
    if (eventId) {
      queryParams = '?&orderBy="eventId"&equalTo="' + eventId + '"';
    }
    axios.get( '/events/' + city + '.json' + queryParams)
      .then( response => {
        axios.delete( '/events/' + city + '/' + Object.keys(response.data)[0] + '.json')
          .then( () => {
            dispatch(deleteEventSuccess());
          } )
          .catch( error => {
            console.log(error)
          } );
      } )
      .catch( err => {
        dispatch(fetchEventsFail(err));
      } );
  };
};

export const eventsInit = () => {
  return {
    type: actionTypes.EVENTS_INIT
  };
};

export const fetchEventsSuccess = ( events ) => {
  return {
    type: actionTypes.FETCH_EVENTS_SUCCESS,
    events: events
  };
};

export const fetchEventsFail = ( error ) => {
  return {
    type: actionTypes.FETCH_EVENTS_FAIL,
    error: error
  };
};

export const fetchEventsStart = () => {
  return {
    type: actionTypes.FETCH_EVENTS_START
  };
};

export const fetchEvents = (city, eventId) => {
  return dispatch => {
    dispatch(fetchEventsStart());
    let queryParams = '';
    if (eventId) {
      queryParams = '?&orderBy="eventId"&equalTo="' + eventId + '"';
    }
    axios.get( '/events/' + city + '.json' + queryParams)
      .then( res => {
        const fetchedEvents = [];
        for ( let key in res.data ) {
          fetchedEvents.push( {
            ...res.data[key],
          } );
        }
        dispatch(fetchEventsSuccess(fetchedEvents));
      } )
      .catch( err => {
        dispatch(fetchEventsFail(err));
      } );
  };
};

export const resetEvents = () => {
  return {
    type: actionTypes.RESET_EVENTS
  }
};