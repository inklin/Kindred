import Immutable from 'immutable'

import { MyUpdateConstants } from '../../constants/index'

const defaultState = Immutable.Map( {} )

function saveImageUrl(state, action){
  return state.update(action.id, (update) => {
    return update.set('imageUrl', action.imageUrl)
  })
}

function addUpdate(state, action){
  return state.set(action.id, Immutable.Map({
    id: action.id,
    draft: action.draft,
    sections: action.sections,
    sentAt: action.sentAt,
    AccountId: action.AccountId
  }))
}

export default function myUpdateReducer(state = defaultState, action){
  switch (action.type){

    case MyUpdateConstants.ADD_UPDATE:
      return addUpdate(state, action)

    case MyUpdateConstants.SAVE_IMAGE_URL:
      return saveImageUrl(state, action)

    default:
      return state
  }
}
