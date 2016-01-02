import { digestConstants } from './../constants/index'

const digestActions = {
  loadStart: function(){
    return { type: digestConstants.loadStart }
  }
}

export default digestActions
