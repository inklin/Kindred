import Immutable from 'immutable'

import { DigestConstants } from '../../constants/index'
import { digests } from './testdata'

const defaultState = Immutable.Map( digests )

function saveImageUrl(state, action){
  return state.update(action.id, (digest) => {
    return Object.assign({}, digest, { imageUrl: action.imageUrl })
  })
}

export default function digestReducer(state = defaultState, action){
  switch (action.type){

    case DigestConstants.SAVE_IMAGE_URL:
      return saveImageUrl(state, action)

    default:
      return state
  }
}
