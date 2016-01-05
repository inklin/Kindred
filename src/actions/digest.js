import { DigestConstants } from './../constants/index'


export function loadStart(){
  return { 
    type: DigestConstants.loadStart
  }
}

export function saveImageUrl(digestId, imageUrl){
  return {
    imageUrl: imageUrl,
    id: digestId,
    type: DigestConstants.SAVE_IMAGE_URL
  }
}

