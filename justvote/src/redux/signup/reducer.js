/* LOGIN */
import * as types from './types';


const initialState = {
  register: {
    status: 'INIT',
    error: -1
  }
};

export default function authentication(state=initialState, action) {
  switch(action.type){
    case types.REGISTER:
      return {
        ...state,
        register: {
          status: 'WAITING',
          error: -1
        }
      }
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        register: {
          ...state.register,
          status: 'SUCCESS'
        }
      }
    case types.REGISTER_FAILURE:
      return {
        ...state,
        register:{
          status: 'FAILURE',
          error: action.error
        }
      }
    default:
      return state;
  }
}
