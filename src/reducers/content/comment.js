import Immutable from 'immutable'

import { comments } from './testdata'

const defaultState = Immutable.Map( comments )

export default function commentReducer(state = defaultState, action){
  switch (action.type){

    default:
      return state
  }
}
