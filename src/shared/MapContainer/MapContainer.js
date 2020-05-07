import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const MapContainer = props => {

  const mapStyles = {
    width: '500px',
    height: '500px',
  };

  return (
    <Map
      google={props.google}
      zoom={15}
      style={mapStyles}
      initialCenter={{ lat: props.lat, lng: props.lng}}
    >
      <Marker position={{ lat: props.lat, lng: props.lng}} />
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBQc8Q4z9lLSbg4vl0rMeGAkMH5n74NZfg'
})(MapContainer);