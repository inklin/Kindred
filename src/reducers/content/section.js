import Immutable from 'immutable'

import { sections } from './testdata'

const defaultState = Immutable.Map( sections )

export default function sectionReducer(state = defaultState, action){
  switch (action.type){
    
    default:
      return state
  }
}
