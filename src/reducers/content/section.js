import Immutable from 'immutable'

import { SectionConstants } from '../../constants/index'
import { sections } from './testdata'

const defaultState = Immutable.Map( sections )

function toggleView(state, action){
  return state.update(action.id, (value) => {
    return Object.assign({}, value, { fullView: !value.fullView })
  })

}

export default function sectionReducer(state = defaultState, action){
  switch (action.type){
    
    case SectionConstants.TOGGLE_VIEW:
      return toggleView(state, action)

    default:
      return state
  }
}
