import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import ImageUpload from "../../shared/ImageUpload/ImageUpload";

const Welcome = props => {
  const { onTryAutoSignup } = props;

  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  return (
    <div>
      <h1>Welcome</h1>
      <Link to="/cities">Cities</Link>
      <ImageUpload/>
      {props.isAuthenticated ?
        <div>
          You're Authenticated
          <Link to="/logout">Logout</Link>
        </div> :
        <Link to="/auth">Auth</Link>}
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
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);