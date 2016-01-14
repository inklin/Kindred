import { SectionConstants } from '../constants/index'

export function readFull(id) {
  return {
    type: SectionConstants.TOGGLE_VIEW,
    id: id
  }
}

export function addSection(section){
  return {
    id: section.id,
    title: section.title,
    intro: section.intro,
    body: section.body,
    imageUrl: section.imageUrl,
    comments: section.comments,
    AccountId: section.AccountId,
    type: SectionConstants.ADD_SECTION
  }
}

export function updateSection(id, field, value){
  return {
    id,
    field,
    value,
    type: SectionConstants.UPDATE_SECTION
  }
}
