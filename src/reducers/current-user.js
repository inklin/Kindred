import Immutable from 'immutable'
import { AccountConstants } from '../constants/index.js'

const defaultState = Immutable.Map({
    avatarUrl: null,
    email: null,
    firstName: null,
    lastName: null,
    userName: null,
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

    default:
      return state
  }
}
