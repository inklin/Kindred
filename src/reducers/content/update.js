import { UpdateConstants } from './../constants/index.js'
import Immutable from 'immutable'

const defaultState = Immutable.Map({
  updates: Immutable.List([]),
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

export default function updateReducer(state = defaultState, action){
  switch (action.type){
    case UpdateConstants.LOAD_START:
      return loadStart(state, action)

    case UpdateConstants.LOAD_SUCCESS:
      return loadSuccess(state, action)

    case UpdateConstants.LOAD_FAIL:
      return loadFail(state, action)

    default:
      return state
  }
}
