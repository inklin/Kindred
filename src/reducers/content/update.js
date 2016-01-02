import Immutable from 'immutable'

import { updates } from './testdata'

const defaultState = Immutable.Map( updates )

export default function updateReducer(state = defaultState, action){
  switch (action.type){

    default:
      return state
  }
}
