import { SectionConstants, DigestConstants, UpdateConstants } from '../../constants/index.js'

function startLoading(state){
  return state + 1
}

function finishLoading(state){
  return state - 1
}

export default function loadingReducer(state = 0, action){
  switch (action.type) {

    case DigestConstants.LOAD_START:
    case UpdateConstants.LOAD_START:
    case SectionConstants.LOAD_START:
      return startLoading(state, action)

    case DigestConstants.LOAD_SUCCESS:
    case UpdateConstants.LOAD_SUCCESS:
    case SectionConstants.LOAD_SUCCESS:
    case DigestConstants.LOAD_FAIL:
    case UpdateConstants.LOAD_FAIL:
    case SectionConstants.LOAD_FAIL:
      return finishLoading(state, action)

    default:
      return state
  }
}
