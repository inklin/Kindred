import Immutable from 'immutable'

import { UpdateConstants } from '../../constants/index'

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
    AccountId: action.AccountId  
  }))
}

export default function updateReducer(state = defaultState, action){
  switch (action.type){

    case UpdateConstants.ADD_UPDATE:
      return addUpdate(state, action)

    case UpdateConstants.SAVE_IMAGE_URL:
      return saveImageUrl(state, action)

    default:
      return state
  }
}
