/* LOGIN */
import {
  AUTH_REGISTER,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_FAILURE,
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE
} from './types';

const initialState = {
  login: {},
  status: {}
}

const authReducer = (state=initialState, action) =>{
  switch(action.type){
  case types.AUTH_LOGIN:
    return {
      ...state,
      login : {
        status: 'WAITING'
      }
    }
  case types.AUTH_LOGIN_SUCCESS:
    return {
      ...state,
      login: {
          status: 'SUCCESS'
      },
      status: {
        ...state.status,
        isLoggedIn: true,
        currentUser: action.username
      }
    }
  case types.AUTH_LOGIN_FAILURE:
    return {
      ...state,
      login:{
        status: 'FAILURE'
      }
    }
  }
}

export default authReducer