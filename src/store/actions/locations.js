import * as actionTypes from './actionTypes';
import axios from '../../axios-config';

export const createLocationSuccess = ( id, locationData ) => {
  return {
    type: actionTypes.CREATE_LOCATION_SUCCESS,
    locationId: id,
    locationData: locationData
  };
};

export const createLocationFail = ( error ) => {
  return {
    type: actionTypes.CREATE_LOCATION_FAIL,
    error: error
  };
};

export const createLocationStart = () => {
  return {
    type: actionTypes.CREATE_LOCATION_START
  };
};

export const createLocation = ( locationData ) => {
  return dispatch => {
    dispatch( createLocationStart() );
    axios.post( '/locations/' + locationData.locationData.city.toLowerCase() + '.json', locationData.locationData )
      .then( response => {
        dispatch( createLocationSuccess( response.data.name, locationData ) );
      } )
      .catch( error => {
        dispatch( createLocationFail( error ) );
      } );
  };
};

export const deleteLocationSuccess = () => {
  return {
    type: actionTypes.DELETE_LOCATION_SUCCESS
  };
};

export const deleteLocationStart = () => {
  return {
    type: actionTypes.DELETE_LOCATION_START
  };
};

export const deleteLocation = ( city, locationName, edit ) => {
  return dispatch => {
    dispatch( deleteLocationStart() );
    let queryParams = '';
    if (locationName) {
      queryParams = '?&orderBy="name"&equalTo="' + locationName + '"';
    }
    axios.get( '/locations/' + city + '.json' + queryParams)
      .then( response => {
        axios.delete( '/locations/' + city + '/' + Object.keys(response.data)[0] + '.json')
          .then( () => {
            dispatch(deleteLocationSuccess());
          } )
          .catch( error => {
            console.log(error)
          } );
      } )
      .catch( err => {
        dispatch(fetchLocationsFail(err));
      } );
  };
};

export const locationsInit = () => {
  return {
    type: actionTypes.LOCATIONS_INIT
  };
};

export const fetchLocationsSuccess = ( locations ) => {
  return {
    type: actionTypes.FETCH_LOCATIONS_SUCCESS,
    locations: locations
  };
};

export const fetchLocationsFail = ( error ) => {
  return {
    type: actionTypes.FETCH_LOCATIONS_FAIL,
    error: error
  };
};

export const fetchLocationsStart = () => {
  return {
    type: actionTypes.FETCH_LOCATIONS_START
  };
};

export const fetchLocations = (city, locationName) => {
  return dispatch => {
    dispatch(fetchLocationsStart());
    let queryParams = '';
    if (locationName) {
      queryParams = '?&orderBy="name"&equalTo="' + locationName + '"';
    }
    axios.get( '/locations/' + city + '.json' + queryParams)
      .then( res => {
        const fetchedLocations = [];
        for ( let key in res.data ) {
          fetchedLocations.push( {
            ...res.data[key],
          } );
        }
        dispatch(fetchLocationsSuccess(fetchedLocations));
      } )
      .catch( err => {
        dispatch(fetchLocationsFail(err));
      } );
  };
};

export const resetLocations = () => {
  return {
    type: actionTypes.RESET_LOCATIONS
  }
};