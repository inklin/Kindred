import Immutable from 'immutable'

import { DigestConstants } from '../../constants/index'

const defaultState = Immutable.Map( {} )

function saveImageUrl(state, action){
  return state.update(action.id, (digest) => {
    return digest.set('imageUrl', action.imageUrl)
  })
}

function addDigest(state, action){
  return state.set(action.id, Immutable.Map({
    id: action.id,
    readAt: action.readAt,
    sentAt: action.sentAt,
    updates: action.updates,
    PersonId: action.PersonId
  }))
}


export default function digestReducer(state = defaultState, action){
  switch (action.type){

    case DigestConstants.ADD_DIGEST:
      return addDigest(state, action)
      
    case DigestConstants.SAVE_IMAGE_URL:
      return saveImageUrl(state, action)

    default:
      return state
  }
}
