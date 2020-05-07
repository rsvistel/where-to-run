import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  events: [],
  loading: false,
  created: false,
  deleted: false
};

const createEventInit = ( state, action ) => {
  return updateObject( state, { created: false } );
};

const createEventStart = ( state, action ) => {
  return updateObject( state, { loading: true } );
};

const createEventSuccess = ( state, action ) => {
  const newEvent = updateObject( action.eventData, { id: action.eventId } );
  return updateObject( state, {
    loading: false,
    created: true,
    events: state.events.concat( newEvent )
  } );
};

const createEventFail = ( state, action ) => {
  return updateObject( state, { loading: false } );
};

const fetchEventsStart = ( state, action ) => {
  return updateObject( state, { loading: true } );
};

const fetchEventsSuccess = ( state, action ) => {
  return updateObject( state, {
    events: action.events,
    loading: false
  } );
};

const fetchEventsFail = ( state, action ) => {
  return updateObject( state, { loading: false } );
};

const deleteEventSuccess = ( state, action ) => {
  return updateObject( state, {
    loading: false,
    deleted: true,
  } );
};

const deleteEventStart = ( state, action ) => {
  return updateObject( state, { loading: true } );
};

const resetEvents = ( state, action ) => {
  return updateObject( state, { created: false, deleted: false } )
};

const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case actionTypes.EVENTS_INIT: return createEventInit( state, action );
    case actionTypes.CREATE_EVENT_START: return createEventStart( state, action );
    case actionTypes.CREATE_EVENT_SUCCESS: return createEventSuccess( state, action );
    case actionTypes.CREATE_EVENT_FAIL: return createEventFail( state, action );
    case actionTypes.RESET_EVENTS: return resetEvents( state, action );
    case actionTypes.FETCH_EVENTS_START: return fetchEventsStart( state, action );
    case actionTypes.FETCH_EVENTS_SUCCESS: return fetchEventsSuccess( state, action );
    case actionTypes.FETCH_EVENTS_FAIL: return fetchEventsFail( state, action );
    case actionTypes.DELETE_EVENT_START: return deleteEventStart( state, action );
    case actionTypes.DELETE_EVENT_SUCCESS: return deleteEventSuccess( state, action );
    default: return state;
  }
};

export default reducer;