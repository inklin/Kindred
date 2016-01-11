import Immutable from 'immutable'

const defaultState = Immutable.Map( {} )

export default function commentReducer(state = defaultState, action){
  switch (action.type){

    default:
      return state
  }
}
