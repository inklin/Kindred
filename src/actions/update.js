import { UpdateConstants } from './../constants/index'

export function saveImageUrl(updateId, imageUrl){
  return {
    imageUrl: imageUrl,
    id: updateId,
    type: UpdateConstants.SAVE_IMAGE_URL
  }
}

