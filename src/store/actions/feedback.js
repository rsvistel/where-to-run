import * as actionTypes from './actionTypes';
import axios from '../../axios-config';

export const addFeedbackSuccess = ( id, feedbackData ) => {
  return {
    type: actionTypes.ADD_FEEDBACK_SUCCESS,
    feedbackId: id,
    feedbackData: feedbackData
  };
};

export const addFeedbackFail = ( error ) => {
  return {
    type: actionTypes.ADD_FEEDBACK_FAIL,
    error: error
  };
};

export const addFeedbackStart = () => {
  return {
    type: actionTypes.ADD_FEEDBACK_START
  };
};

export const addFeedback = ( feedbackData ) => {
  return dispatch => {
    dispatch( addFeedbackStart() );
    axios.post( '/feedback.json', feedbackData.feedbackData )
      .then( response => {
        dispatch( addFeedbackSuccess( response.data.name, feedbackData ) );
      } )
      .catch( error => {
        dispatch( addFeedbackFail( error ) );
      } );
  };
};

export const feedbackInit = () => {
  return {
    type: actionTypes.FEEDBACK_INIT
  };
};

export const fetchFeedbackSuccess = ( feedback ) => {
  return {
    type: actionTypes.FETCH_FEEDBACK_SUCCESS,
    feedback: feedback
  };
};

export const fetchFeedbackFail = ( error ) => {
  return {
    type: actionTypes.FETCH_FEEDBACK_FAIL,
    error: error
  };
};

export const fetchFeedbackStart = () => {
  return {
    type: actionTypes.FETCH_FEEDBACK_START
  };
};

export const fetchFeedback = (feedbackName) => {
  return dispatch => {
    dispatch(fetchFeedbackStart());
    let queryParams = '';
    if (feedbackName) {
      queryParams = '?&orderBy="name"&equalTo="' + feedbackName + '"';
    }
    axios.get( '/feedback.json' + queryParams)
      .then( res => {
        const fetchedFeedback = [];
        for ( let key in res.data ) {
          fetchedFeedback.push( {
            ...res.data[key],
          } );
        }
        dispatch(fetchFeedbackSuccess(fetchedFeedback));
      } )
      .catch( err => {
        dispatch(fetchFeedbackFail(err));
      } );
  };
};