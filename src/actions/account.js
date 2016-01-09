import { AccountConstants } from './../constants/index'

export function loadStart(){
  return {
    type: AccountConstants.LOAD_START
  }
}

export function loadSuccess(payload){
  return {
    avatarUrl: payload.avatarUrl,
    email: payload.email,
    firstName: payload.firstName,
    lastName: payload.lastName,
    userName: payload.username,
    type: AccountConstants.LOAD_SUCCESS
  }
}

export function loadError(){
  return {
    type: AccountConstants.LOAD_ERROR
  }
}

