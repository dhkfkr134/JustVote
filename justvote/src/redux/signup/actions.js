import axios from 'axios';
import {
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,

} from './types';

/* REGISTER */
export function registerRequest(userId, userPass) {
  return (dispatch) => {
      // Inform Register API is starting
      dispatch(register());

      return axios.post('/api/account/signup', { userId, userPass })
      .then((response) => {
          dispatch(registerSuccess());
      }).catch((error) => {
          dispatch(registerFailure(error.response.data.code));
      });
  };
}

export function register() {
  return {
      type: REGISTER
  };
}

export function registerSuccess() {
  return {
      type: REGISTER_SUCCESS,
  };
}

export function registerFailure(error) {
  return {
      type: REGISTER_FAILURE,
      error
  };
}
