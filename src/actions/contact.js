import { ContactConstants } from './../constants/index'

export function loadStart(){
  return {
    type: ContactConstants.LOAD_START
  }
}

export function loadSuccess(){
  return {
    type: ContactConstants.LOAD_SUCCESS
  }
}

export function loadError(){
  return {
    type: ContactConstants.LOAD_ERROR
  }
}

export function addContact(data) {
  return {
    type: ContactConstants.ADD_NEW_CONTACT,
    id: data.id,
    email: data.email
  }
}

export function deleteContact(data) {
  return {
    type: ContactConstants.DELETE_CONTACT,
    id: data.id
  }
}
