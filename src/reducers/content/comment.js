import { comments } from './testdata'

import Immutable from 'immutable'

const defaultState = Immutable.Map( comments )

export default function commentReducer(state = defaultState, action){
  switch (action.type){

    default:
      return state
  }
}
