import {updateObject} from "../../shared/utility";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  locations: [],
  loading: false,
  created: false,
  deleted: false
};

const createLocationInit = ( state, action ) => {
  return updateObject( state, { created: false } );
};

const createLocationStart = ( state, action ) => {
  return updateObject( state, { loading: true } );
};

const createLocationSuccess = ( state, action ) => {
  const newLocation = updateObject( action.locationData, { id: action.locationId } );
  return updateObject( state, {
    loading: false,
    created: true,
    locations: state.locations.concat( newLocation )
  } );
};

const createLocationFail = ( state, action ) => {
  return updateObject( state, { loading: false } );
};

const fetchLocationsStart = ( state, action ) => {
  return updateObject( state, { loading: true } );
};

const fetchLocationsSuccess = ( state, action ) => {
  return updateObject( state, {
    locations: action.locations,
    loading: false
  } );
};

const fetchLocationsFail = ( state, action ) => {
  return updateObject( state, { loading: false } );
};

const deleteLocationSuccess = ( state, action ) => {
  return updateObject( state, {
    loading: false,
    deleted: true,
  } );
};

const deleteLocationStart = ( state, action ) => {
  return updateObject( state, { loading: true } );
};

const resetLocations = ( state, action ) => {
  return updateObject( state, { created: false, deleted: false } )
};

const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case actionTypes.LOCATIONS_INIT: return createLocationInit( state, action );
    case actionTypes.CREATE_LOCATION_START: return createLocationStart( state, action );
    case actionTypes.CREATE_LOCATION_SUCCESS: return createLocationSuccess( state, action );
    case actionTypes.CREATE_LOCATION_FAIL: return createLocationFail( state, action );
    case actionTypes.RESET_LOCATIONS: return resetLocations( state, action );
    case actionTypes.FETCH_LOCATIONS_START: return fetchLocationsStart( state, action );
    case actionTypes.FETCH_LOCATIONS_SUCCESS: return fetchLocationsSuccess( state, action );
    case actionTypes.FETCH_LOCATIONS_FAIL: return fetchLocationsFail( state, action );
    case actionTypes.DELETE_LOCATION_START: return deleteLocationStart( state, action );
    case actionTypes.DELETE_LOCATION_SUCCESS: return deleteLocationSuccess( state, action );
    default: return state;
  }
};

export default reducer;