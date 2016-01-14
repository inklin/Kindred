import Immutable from 'immutable'
import { AccountConstants } from '../constants/index.js'

const defaultState = Immutable.Map({
    avatarUrl: null,
    email: null,
    firstName: null,
    lastName: null,
    userName: null,
    digestSchedule: null,
    digestView: null,
    loading: false
})

function loadStart(state){
  return state.set('loading', true)
}

function loadError(state){
  return state.set('loading', false)
}

function loadSuccess(state, action){
  return Immutable.Map({
    avatarUrl: action.avatarUrl,
    email: action.email,
    firstName: action.firstName,
    lastName: action.lastName,
    userName: action.userName,
    digestSchedule: action.digestSchedule,
    digestView: action.digestView,
    loading: false
  })
}

function setPersonalInfo(state, action) {
  // update state to info user provided
  return Immutable.Map({
    avatarUrl: action.avatarUrl,
    email: action.email,
    firstName: action.firstName,
    lastName: action.lastName,
    userName: action.userName,
    digestSchedule: action.digestSchedule,
    digestView: action.digestView,
    loading: false
  })
}

function setDigestSettings(state, action) {
  return Immutable.Map({
    digestSchedule: action.digestSchedule,
    digestView: action.digestView,
    firstName: action.firstName,
    lastName: action.lastName,
    email: action.email,
    userName: action.userName,
    avatarUrl: action.avatarUrl,
    loading: false
  })
}


export default function currentUserReducer(state = defaultState, action){
  switch (action.type){
    case AccountConstants.LOAD_START:
      return loadStart(state, action)

    case AccountConstants.LOAD_SUCCESS:
      return loadSuccess(state, action)

    case AccountConstants.LOAD_ERROR:
      return loadError(state, action)

    case AccountConstants.SET_PERSONAL_INFO:
      return setPersonalInfo(state, action)

    case AccountConstants.SET_DIGEST_SETTINGS:
      return setDigestSettings(state, action)

    default:
      return state
  }
}
