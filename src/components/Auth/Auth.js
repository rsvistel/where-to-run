import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { updateObject } from '../../shared/utility';

const Auth = props => {
  const [authForm, setAuthForm] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Mail Address'
      },
      value: ''
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Password'
      },
      value: ''
    }
  });
  const [isSignup, setIsSignup] = useState(true);

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(authForm, {
      [controlName]: updateObject(authForm[controlName], {
        value: event.target.value
      })
    });
    setAuthForm(updatedControls);
  };

  const submitHandler = event => {
    event.preventDefault();
    props.onAuth(authForm.email.value, authForm.password.value, isSignup);
  };

  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup);
  };

  const formElementsArray = [];
  for (let key in authForm) {
    formElementsArray.push({
      id: key,
      config: authForm[key]
    });
  }

  let form = formElementsArray.map(formElement => (
    <input
      key={formElement.id}
      type={formElement.config.elementConfig.type}
      placeholder={formElement.config.elementConfig.placeholder}
      value={formElement.config.value}
      onChange={event => inputChangedHandler(event, formElement.id)}
    />
  ));

  if (props.loading) {
    form = 'Loading...';
  }

  let errorMessage = null;

  if (props.error) {
    errorMessage = <p>{props.error.message}</p>;
  }

  let authRedirect = null;
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }

  return (
    <div>
      {authRedirect}
      {errorMessage}
      <form onSubmit={submitHandler}>
        {form}
        <button>SUBMIT</button>
      </form>
      <button onClick={switchAuthModeHandler}>
        SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'}
      </button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);