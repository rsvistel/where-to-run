import {updateObject} from "../../shared/utility";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  feedback: [],
  loading: false,
  added: false
};

const addFeedbackInit = ( state, action ) => {
  return updateObject( state, { added: false } );
};

const addFeedbackStart = ( state, action ) => {
  return updateObject( state, { loading: true } );
};

const addFeedbackSuccess = ( state, action ) => {
  const newFeedback = updateObject( action.feedbackData, { id: action.feedbackId } );
  return updateObject( state, {
    loading: false,
    created: true,
    feedback: state.feedback.concat( newFeedback )
  } );
};

const addFeedbackFail = ( state, action ) => {
  return updateObject( state, { loading: false } );
};

const fetchFeedbackStart = ( state, action ) => {
  return updateObject( state, { loading: true } );
};

const fetchFeedbackSuccess = ( state, action ) => {
  return updateObject( state, {
    feedback: action.feedback,
    loading: false
  } );
};

const fetchFeedbackFail = ( state, action ) => {
  return updateObject( state, { loading: false } );
};

const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case actionTypes.FEEDBACK_INIT: return addFeedbackInit( state, action );
    case actionTypes.ADD_FEEDBACK_START: return addFeedbackStart( state, action );
    case actionTypes.ADD_FEEDBACK_SUCCESS: return addFeedbackSuccess( state, action );
    case actionTypes.ADD_FEEDBACK_FAIL: return addFeedbackFail( state, action );
    case actionTypes.FETCH_FEEDBACK_START: return fetchFeedbackStart( state, action );
    case actionTypes.FETCH_FEEDBACK_SUCCESS: return fetchFeedbackSuccess( state, action );
    case actionTypes.FETCH_FEEDBACK_FAIL: return fetchFeedbackFail( state, action );
    default: return state;
  }
};

export default reducer;