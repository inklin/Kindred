import Immutable from 'immutable'

import { digests } from './testdata'

const defaultState = Immutable.Map( digests )

export default function digestReducer(state = defaultState, action){
  switch (action.type){

    default:
      return state
  }
}
