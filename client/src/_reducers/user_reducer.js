import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER
} from '../_actions/types';


export default function(state = {}, action){

  console.log(state)
  console.log('types.js에서 넣음 =', action.type)
  switch(action.type){
    case LOGIN_USER:
      console.log('case가 LOGIN_USER임 =',LOGIN_USER)
      console.log('server에서 옴 =', action.payload)
      return { ...state, loginSuccess: action.payload }
      break;    
      
    case REGISTER_USER:
      console.log('case가 REGISTER_USER =',REGISTER_USER)
      console.log('server에서 옴 =', action.payload)
      return { ...state, register: action.payload }
      break;   

    case AUTH_USER:
        return { ...state, userData: action.payload }
        break;   

    default:
        return state
  }
}