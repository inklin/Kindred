import { SectionConstants } from './../constants/index.js'
import Immutable from 'immutable'

const defaultState = Immutable.Map({
  sections: Immutable.List([]),
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

export default function sectionReducer(state = defaultState, action){
  switch (action.type){
    case SectionConstants.LOAD_START:
      return loadStart(state, action)

    case SectionConstants.LOAD_SUCCESS:
      return loadSuccess(state, action)

    case SectionConstants.LOAD_FAIL:
      return loadFail(state, action)

    default:
      return state
  }
}
