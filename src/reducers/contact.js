import Immutable from 'immutable'
import { ContactConstants } from '../constants/index.js'

const defaultState = Immutable.Map( {} )

function addNewContact(state, action) {
  return state.set(action.id, 
    Immutable.Map({
      email: action.email,
      id: action.id
    })
  )
}

export default function contactReducer(state = defaultState, action){
  switch (action.type){

    case ContactConstants.ADD_NEW_CONTACT:
      return addNewContact(state, action)

    default:
      return state
  }
}
