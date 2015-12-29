import { digestConstants } from './../constants/index'

export default const digestActions = {
  loadAll: function(){
    return { type: digestConstants.loadStart }
  }
}
