import { AccountConstants } from './../constants/index'

export function loadStart(){
  return {
    type: AccountConstants.LOAD_START
  }
}

export function loadSuccess(payload){
  return {
    avatarUrl: payload.avatarUrl,
    email: payload.Person.email,
    firstName: payload.Person.firstName,
    lastName: payload.Person.lastName,
    AccountId: payload.id,
    userName: payload.username,
    type: AccountConstants.LOAD_SUCCESS
  }
}

export function loadError(){
  return {
    type: AccountConstants.LOAD_ERROR
  }
}
