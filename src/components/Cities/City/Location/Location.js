import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import CreateLocation from './CreateLocation/CreateLocation';
import { Redirect } from 'react-router-dom';

import AddFeedback from './AddFeedback/AddFeedback';

const Location = props => {
  const { onTryAutoSignup } = props;

  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  const [editor, showEditor] = useState(false);
  const [deleting, setDeleting] = useState(false);

  let location;
  let locationData;

  const deleteLocation = () => {
    props.onDeleteLocation(props.match.url.split('/')[2].toLowerCase(), props.match.params.name);
  };

  const loadLocation = () => {
    if (props.locations[0]) {
      for (let i = 0; i < props.locations.length; i++) {
        if (props.locations[i].name && props.locations[i].name.toLowerCase()
          === props.match.params.name.toLowerCase()) {
          location = props.locations[i]
        }
      }
    }
    if (location) {
      const editLocation = () => {
        props.onResetLocations();
        showEditor(true);
      };
      const reloadLocation = () => {
        showEditor(false);
        props.onFetchLocations(props.match.url.split('/')[2].toLowerCase(), props.match.params.name);
      };
      locationData = (
        <div>
          {editor ?
            <CreateLocation locationItem={location} delete={deleteLocation} onFinished={reloadLocation}/> :
            <div>
              <h2>{location.name}</h2>
              <h3>{location.category}</h3>
              <p>{location.location}</p>
              <p>Rating: </p>
              {location.userId === props.userId ?
                <div>
                  <button onClick={() => {deleteLocation(false); setDeleting(true)}}>Delete Location</button>
                  <button onClick={editLocation}>Edit Location</button>
                </div> : null
              }
              <AddFeedback url={ props.match.url } locationName={ location.name }/>
            </div>
          }
        </div>
      );
    }
  };

  loadLocation();

  if (!location) {
    locationData = 'Loading...';
    props.onFetchLocations(props.match.url.split('/')[2].toLowerCase(), props.match.params.name);
  }

  if (!props.locations.loading && location) {
    loadLocation()
  }

  return(
    <div>
      {props.loading ? 'Loading...' :
        <div>
          {deleting && props.deleted ?
            <Redirect to={'/cities/' + props.match.url.split('/')[2]}/>
            : locationData}
        </div>
      }
    </div>
  )
};

const mapStateToProps = state => {
  return {
    locations: state.locations.locations,
    loading: state.locations.loading,
    deleted: state.locations.deleted,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchLocations: (city) =>
      dispatch(actions.fetchLocations(city)),
    onDeleteLocation: (city, locationName) =>
      dispatch(actions.deleteLocation(city, locationName)),
    onResetLocations: () => dispatch(actions.resetLocations()),
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Location);