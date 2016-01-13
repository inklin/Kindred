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
    userName: payload.username,
    digestSchedule: payload.Person.ReceiveOn,
    digestView: payload.Person.ReceiveAs,
    type: AccountConstants.LOAD_SUCCESS
  }
}

export function loadError(){
  return {
    type: AccountConstants.LOAD_ERROR
  }
}

export function setPersonalInfo(data) {
  return {
    type: AccountConstants.SET_PERSONAL_INFO,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    avatarUrl: data.avatarUrl,
    userName: data.username,
    password: data.password
  }
}

export function setDigestSettings(data) {
  return {
    type: AccountConstants.SET_DIGEST_SETTINGS,
    digestSchedule: data.digestSchedule,
    digestView: data.digestView,
    avatarUrl: data.avatarUrl,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    userName: data.username
  }
}
