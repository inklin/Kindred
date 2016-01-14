import { UpdateConstants } from './../constants/index'

export function saveImageUrl(updateId, imageUrl){
  return {
    imageUrl: imageUrl,
    id: updateId,
    type: UpdateConstants.SAVE_IMAGE_URL
  }
}

export function loadStart(){
  return {
    type: UpdateConstants.LOAD_START
  }
}

export function loadSuccess(){
  return {
    type: UpdateConstants.LOAD_SUCCESS
  }
}

export function loadError(){
  return {
    type: UpdateConstants.LOAD_ERROR
  }
}

export function addUpdate(update){
  return {
    id: update.id,
    draft: update.draft,
    sections: update.sections,
    AccountId: update.AccountId,
    sentAt: update.sentAt,
    type: UpdateConstants.ADD_UPDATE
  }
}
