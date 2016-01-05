import Immutable from 'immutable'

import { UpdateConstants } from '../../constants/index'
import { updates } from './testdata'

const defaultState = Immutable.Map( updates )

function saveImageUrl(state, action){
  return state.update(action.id, (update) => {
    return Object.assign({}, update, { imageUrl: action.imageUrl })
  })
}

export default function updateReducer(state = defaultState, action){
  switch (action.type){

    case UpdateConstants.SAVE_IMAGE_URL:
      return saveImageUrl(state, action)

    default:
      return state
  }
}
