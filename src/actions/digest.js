import { DigestConstants } from './../constants/index'

export function saveImageUrl(digestId, imageUrl){
  return {
    imageUrl: imageUrl,
    id: digestId,
    type: DigestConstants.SAVE_IMAGE_URL
  }
}

export function loadStart(){
  return {
    type: DigestConstants.LOAD_START
  }
}

export function loadSuccess(){
  return {
    type: DigestConstants.LOAD_SUCCESS
  }
}

export function loadError(){
  return {
    type: DigestConstants.LOAD_ERROR
  }
}


export function addDigest(payload){
  return {
    id: payload.id,
    readAt: payload.readAt,
    sentAt: payload.sentAt,
    updates: payload.updates,
    PersonId: payload.PersonId,
    type: DigestConstants.ADD_DIGEST
  }
}