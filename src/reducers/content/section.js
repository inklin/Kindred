import Immutable from 'immutable'

import { SectionConstants } from '../../constants/index'

const defaultState = Immutable.Map( {} )

function toggleView(state, action){
  return state.update(parseInt(action.id), (value) => {
    return value.set('fullView', !value.get('fullView'))
  })
}

function addSection(state, action){
  return state.set(action.id, Immutable.Map({
    id: action.id,
    title: action.title,
    intro: action.intro,
    body: action.body,
    imageUrl: action.imageUrl,
    comments: action.comments,
    AccountId: action.AccountId
  }))
}

function updateSection(state, action){
    return state.update(action.id, (section) => {
      return section.set(action.field, action.value)
    })
}

export default function sectionReducer(state = defaultState, action){
  switch (action.type){

    case SectionConstants.UPDATE_SECTION:
      return updateSection(state, action)

    case SectionConstants.TOGGLE_VIEW:
      return toggleView(state, action)

    case SectionConstants.ADD_SECTION:
      return addSection(state, action)

    default:
      return state
  }
}
