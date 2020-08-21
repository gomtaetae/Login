import axios from "axios"
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER
} from './types'

export function loginUser(dataToSubmit){
  console.log('클라이언트 입력한: ',dataToSubmit)
  const request = axios
  .post("/api/users/login", dataToSubmit)
  .then((response)=> response.data)
  console.log('request: ',request)
  return {
    type: LOGIN_USER,
    payload: request
  }
}

export function registerUser(dataToSubmit){
  console.log('클라이언트 입력한: ',dataToSubmit)
  const request = axios
  .post("/api/users/register", dataToSubmit)
  .then((response)=> response.data)
  console.log('request: ',request)
  return {
    type: REGISTER_USER,
    payload: request
  }
}

export function auth(){
  const request = axios
  .get("/api/users/auth")
  .then((response)=> response.data)
  console.log('request: ',request)
  return {
    type: AUTH_USER,
    payload: request
  }
}