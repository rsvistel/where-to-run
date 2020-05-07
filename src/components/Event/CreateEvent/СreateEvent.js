import React, {useEffect, useState} from 'react';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import { Link, Redirect } from "react-router-dom";
import axios from "../../../axios-config";
import PlacesAutocomplete from "../../../shared/PlaceAutocomplete/PlaceAutocomplete";
import DatePickerContainer from "../../../shared/DatePickerContainer/DatePickerContainer";

const CreateEvent = props => {
  const { onTryAutoSignup } = props;

  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  let event;

  let editing = false;
  const [deletingOld, setDeletingOld] = useState(false);

  if (props.event) {
    event = props.event;
    editing = true;
  } else {
    event = {
      name: '',
      city: props.match.url.split('/')[2].toLowerCase(),
      location: '',
      lat: '',
      lng: '',
      description: '',
      date: '',
      userId: '',
    }
  }

  const [form, setForm] = useState({
    name: {
      type: 'text',
      placeholder: 'Name',
      value: event.name
    },
    city: {
      type: 'hidden',
      placeholder: 'City',
      value: event.city
    },
    location: {
      type: 'location',
      placeholder: 'Location',
      value: event.location
    },
    lat: {
      type: 'hidden',
      value: event.lat
    },
    lng: {
      type: 'hidden',
      value: event.lng
    },
    description: {
      type: 'text',
      placeholder: 'Description',
      value: event.description
    },
    date: {
      type: 'date',
      placeholder: 'Date',
      value: event.date
    }
  });

  const eventHandler = (event) => {
    event.preventDefault();

    const createNewEvent = () => {
      const formData = {};
      for (let formElementIdentifier in form) {
        formData[formElementIdentifier] = form[formElementIdentifier].value;
      }
      formData['userId'] = props.userId;
      formData['eventId'] = formData['name'].toLowerCase().split(' ').join('-').split('#').join('').split('/').join('');
      formData['rawId'] = formData['eventId'];
      axios.get( '/events/' + formData['city'].toLowerCase() +
        '.json?&orderBy="rawId"&equalTo="' + formData['eventId'] + '"')
        .then( res => {
          if (Object.keys(res.data).length > 0) {
            let number = 2;
            for (let event in res.data) {
              if (res.data[event]['numberId'] && res.data[event]['numberId'] === number) {
                number++
              }
            }
            formData['numberId'] = number;
            formData['eventId'] = formData['rawId'] + number;
          }

          const newEvent = {
            eventData: formData
          };

          if (props.event && props.event.eventId !== formData['eventId']) {
            props.setNewId(formData['eventId']);
          }

          props.onCreateEvent(newEvent);
        } )
        .catch( err => {
          console.log(err)
        } );
    };

    if (props.event) {
      let queryParams = '';
      if (props.deleteId) {
        queryParams = '?&orderBy="eventId"&equalTo="' + props.deleteId + '"';
      }
      setDeletingOld(true);
      axios.get( '/events/' + props.deleteCity + '.json' + queryParams)
        .then( response => {
          axios.delete( '/events/' + props.deleteCity + '/' + Object.keys(response.data)[0] + '.json')
            .then( () => {
              createNewEvent();
            } )
            .catch( error => {
              console.log(error)
            } );
        } )
        .catch( err => {
          console.log(err)
        } );
    } else {
      createNewEvent();
    }
  };

  const updateValue = (value, inputIdentifier) => {
    const updatedFormElement = {
      ...form[inputIdentifier],
      ...{value: value}
    };
    const updatedEventForm = {
      ...form,
      ...{[inputIdentifier]: updatedFormElement}
    };
    setForm(updatedEventForm);
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    updateValue(event.target.value, inputIdentifier);
  };

  const updateLocation = (location, lat, lng) => {
    const updatedLocation = {
      ...form['location'],
      ...{value: location}
    };
    const updatedLat = {
      ...form['lat'],
      ...{value: lat}
    };
    const updatedLng = {
      ...form['lng'],
      ...{value: lng}
    };
    const updatedEventForm = {
      ...form,
      ...{['location']: updatedLocation},
      ...{['lat']: updatedLat},
      ...{['lng']: updatedLng}
    };
    setForm(updatedEventForm);
  };

  let formElementsArray = [];
  for (let key in form) {
    formElementsArray.push({
      id: key,
      config: form[key],
    });
  }

  const [showLocationEditor, setShowLocationEditor] = useState(false);
  const [showDateEditor, setShowDateEditor] = useState(false);
  const fields = (
    formElementsArray.map(formElement => (
      <div>
        {formElement.config.type === 'location' ?
          <div>
            {editing ?
              <div>
                {showLocationEditor ?
                  <div>
                    <PlacesAutocomplete value={formElement.config.value}
                      update={(location, lat, lng) => updateLocation(location, lat, lng)}/>
                    <button type={"button"} onClick={() => {
                      setShowLocationEditor(false);
                      updateLocation(event.location, event.lat, event.lng)
                    }}>Cancel</button>
                  </div> :
                  <div>
                    {event.location}
                    <button type={"button"} onClick={() => (setShowLocationEditor(true))}>Edit Location</button>
                  </div>
                }
              </div> :
              <PlacesAutocomplete value={formElement.config.value}
                update={(location, lat, lng) => updateLocation(location, lat, lng)}/>
            }
          </div> : null
        }
        {formElement.config.type === 'date' ?
          <div>
            {editing ?
              <div>
                {showDateEditor ?
                  <div>
                    <DatePickerContainer update={(value) => updateValue(value, formElement.id)}/>
                    <button type={"button"} onClick={() => {
                      setShowDateEditor(false);
                      updateValue(event.date, formElement.id)
                    }}>Cancel</button>
                  </div> :
                  <div>
                    {event.date}
                    <button type={"button"} onClick={() => (setShowDateEditor(true))}>Edit Date</button>
                  </div>
                }
              </div> :
              <DatePickerContainer update={(value) => updateValue(value, formElement.id)}/>
            }
          </div> : null}
        {formElement.config.type === 'text' ||
         formElement.config.type === 'hidden' ?
          <input
            key={formElement.id}
            type={formElement.config.type}
            placeholder={formElement.config.placeholder}
            value={formElement.config.value}
            onChange={event => inputChangedHandler(event, formElement.id)}/>: null}
      </div>
    ))
  );

  if (!props.isAuthenticated) {
    props.onSetAuthRedirectPath(props.match.url)
  }

  return (
    <div>
      {props.loading ? 'Loading...' :
        <div>
          <h3>{props.event ? <span>Edit</span> : <span>Create</span>} Event</h3>
          {props.isAuthenticated ?
            <form onSubmit={eventHandler}>
              {fields}
              {props.event ?
                <button disabled={deletingOld ? 'disabled' : null}>
                  {deletingOld ? 'Loading...' : 'Edit'}
                </button>
                : <button>Create</button>}
            </form> :
            <div>
              You need to authenticate to create event
              <Link to="/auth">Auth</Link>
            </div>
          }
          {props.created && editing ?
            props.onFinished() : null}
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
    created: state.events.created,
    loading: state.events.loading,
    deleted: state.events.deleted
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCreateEvent: (eventData) =>
      dispatch(actions.createEvent(eventData)),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);