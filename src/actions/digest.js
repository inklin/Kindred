import { DigestConstants } from './../constants/index'

export function saveImageUrl(digestId, imageUrl){
  return {
    imageUrl: imageUrl,
    id: digestId,
    type: DigestConstants.SAVE_IMAGE_URL
  }
}

