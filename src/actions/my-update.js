import { MyUpdateConstants } from './../constants/index'

export function saveImageUrl(updateId, imageUrl){
  return {
    imageUrl: imageUrl,
    id: updateId,
    type: MyUpdateConstants.SAVE_IMAGE_URL
  }
}

export function loadStart(){
  return {
    type: MyUpdateConstants.LOAD_START
  }
}

export function loadSuccess(){
  return {
    type: MyUpdateConstants.LOAD_SUCCESS
  }
}

export function loadError(){
  return {
    type: MyUpdateConstants.LOAD_ERROR
  }
}

export function addUpdate(update){
  return {
    id: update.id,
    draft: update.draft,
    sections: update.sections,
    AccountId: update.AccountId,
    sentAt: update.sentAt,
    type: MyUpdateConstants.ADD_UPDATE
  }
}
