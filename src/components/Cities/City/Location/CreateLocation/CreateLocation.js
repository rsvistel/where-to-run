import React, {useEffect, useState} from 'react';
import * as actions from '../../../../../store/actions/index';
import { connect } from 'react-redux';
import { Link, Redirect } from "react-router-dom";

const CreateLocation = props => {
  const { onTryAutoSignup } = props;

  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  let location = {
    name: '',
    city: '',
    location: '',
    category: '',
    userId: '',
  };

  let editing = false;

  if (props.locationItem) {
    location = props.locationItem;
    editing = true;
  }

  const [form, setForm] = useState({
    name: {
      type: 'text',
      placeholder: 'Name',
      value: location.name
    },
    city: {
      type: 'text',
      placeholder: 'City',
      value: location.city
    },
    location: {
      type: 'text',
      placeholder: 'Location',
      value: location.location
    },
    category: {
      type: 'text',
      placeholder: 'Category',
      value: location.category
    }
  });

  const locationHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formElementIdentifier in form) {
      formData[formElementIdentifier] = form[formElementIdentifier].value;
    }
    formData['userId'] = props.userId;
    formData['locationId'] = formData['name'].toLowerCase().split(' ').join('-');
    const newLocation = {
      locationData: formData
    };

    if (props.locationItem) {
      props.delete();
    }
    props.onCreateLocation(newLocation);
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = {
      ...form[inputIdentifier],
      ...{value: event.target.value}
    };
    const updatedLocationForm = {
      ...form,
      ...{[inputIdentifier]: updatedFormElement}
    };
    setForm(updatedLocationForm);
  };

  const formElementsArray = [];
  for (let key in form) {
    formElementsArray.push({
      id: key,
      config: form[key]
    });
  }

  const fields = (
    formElementsArray.map(formElement => (
      <input
        key={formElement.id}
        type={formElement.config.type}
        placeholder={formElement.config.placeholder}
        value={formElement.config.value}
        onChange={event => inputChangedHandler(event, formElement.id)}
      />
    ))
  );

  if (!props.isAuthenticated) {
    props.onSetAuthRedirectPath(props.match.url)
  }

  return (
    <div>
      {props.loading ? 'Loading...' :
        <div>
          <h3>{props.locationItem ? <span>Edit</span> : <span>Create</span>} Location</h3>
          {props.isAuthenticated ?
            <form onSubmit={locationHandler}>
              {fields}
              {props.locationItem ? <button>Edit</button> : <button>Create</button>}
            </form> :
            <div>
              You need to authenticate to create location
              <Link to="/auth">Auth</Link>
            </div>
          }
          {props.created && editing ? props.onFinished() : null}
          {props.created && !editing ?
            <div>
              <Redirect to={'/cities/' + props.match.url.split('/')[2]}/>
            </div>
            : null}
        </div>
      }
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    userId: state.auth.userId,
    created: state.locations.created,
    loading: state.locations.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCreateLocation: (locationData) =>
      dispatch(actions.createLocation(locationData)),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateLocation);