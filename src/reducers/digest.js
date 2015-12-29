import { digestConstants } from './../constants/index.js'
import Immutable from 'immutable'

const defaultState = Immutable.Map({
  digests: Immutable.List([]),
  loading: false
})

function loadStart(state){
  return state.set('loading', true)
}

function loadFail(state, action){
  return state.set('loading', false)
}

function loadSuccess(state, action){
  return state.set('loading', false)
}

export default function digestReducer(state = defaultState, action){
  switch (action.type){
    case digestConstants.LOAD_START:
      return loadStart(state, action)

    case digestConstants.LOAD_SUCCESS:
      return loadSuccess(state, action)

    case digestConstants.LOAD_FAIL:
      return loadFail(state, action)

    default:
      return state
  }
}
