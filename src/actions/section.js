import { SectionConstants } from '../constants/index'

export function readFull(id) {
  return { 
    type: SectionConstants.TOGGLE_VIEW,
    id: id 
  }
}
