import React, {useEffect, useState} from 'react';
import * as actions from '../../../../../store/actions/index';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

const AddFeedback = props => {
  const { onTryAutoSignup } = props;

  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  const [form, setForm] = useState({
    rating: {
      type: 'text',
      placeholder: 'Rating | From 1 to 5',
      value: ''
    },
    light: {
      type: 'text',
      placeholder: 'Light | Good/Partially/Bad',
      value: ''
    },
    traffic: {
      type: 'text',
      placeholder: 'Traffic | No/Partially/Yes',
      value: ''
    },
    cost: {
      type: 'text',
      placeholder: 'Cost | Free/Paid',
      value: ''
    },
    noise: {
      type: 'text',
      placeholder: 'Is it noisy there? | No/Partially/Yes',
      value: ''
    },
    crowded: {
      type: 'text',
      placeholder: 'Is it Crowded? | No/Partially/Yes',
      value: ''
    },
    long: {
      type: 'text',
      placeholder: 'How long? | Long/Medium/Short',
      value: ''
    },
    surface: {
      type: 'text',
      placeholder: 'Surface | Road/Off-Road/Mixed',
      value: ''
    },
    parking: {
      type: 'text',
      placeholder: 'Is there a parking there? | Yes/No',
      value: ''
    },
    cafe: {
      type: 'text',
      placeholder: 'Is there place to eat nearby? | Yes/No',
      value: ''
    },
    interruption: {
      type: 'text',
      placeholder: 'Is there some things that can interrupt your run? | Yes/No',
      value: ''
    },
    safety: {
      type: 'text',
      placeholder: 'Is it save to run there? | Yes/No',
      value: ''
    },
    dogs: {
      type: 'text',
      placeholder: 'Are there aggressive dogs? | Yes/No',
      value: ''
    },
    water: {
      type: 'text',
      placeholder: 'Is there any public water or shop? | Public/Shop/Public&Shop/None',
      value: ''
    },
    gym: {
      type: 'text',
      placeholder: 'Are there any public gym? | Yes/No',
      value: ''
    },
    pollution: {
      type: 'text',
      placeholder: 'Is air polluted there? | Yes/No',
      value: ''
    },
    hills: {
      type: 'text',
      placeholder: 'Is it hilly? Can you avoid it? | Hilly/Hilly&Flat/Flat',
      value: ''
    },
    locationName: {
      type: 'hidden',
      value: props.locationName
    }
  });

  const feedbackHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formElementIdentifier in form) {
      formData[formElementIdentifier] = form[formElementIdentifier].value;
    }
    const newFeedback = {
      feedbackData: formData
    };

    props.onAddFeedback(newFeedback)
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
    props.onSetAuthRedirectPath(props.url)
  }

  return (
    <div>
      <h3>Add Feedback</h3>
      {props.isAuthenticated ?
        <form onSubmit={feedbackHandler}>
          {console.log(props.locationName)}
          {fields}
          <button>Create</button>
        </form> :
        <div>
          You need to authenticate to add feedback
          <Link to="/auth">Auth</Link>
        </div>
      }
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddFeedback: (eventData) =>
      dispatch(actions.addFeedback(eventData)),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddFeedback);