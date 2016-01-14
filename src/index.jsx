import React                                from 'react'
import ReactDOM                             from 'react-dom'
import { createStore, combineReducers }     from 'redux'
import { Provider }                         from 'react-redux'
import { Router, Route, IndexRoute }        from 'react-router'
import { createHistory }                    from 'history'
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router'
import { Navbar, DigestList, Editor, Digest,
         SectionContainer, Update, Settings, UpdateContainer,
         UpdateList, DigestContainer }      from './components/index.js'
import { digestReducer, sectionReducer,
         updateReducer, loadingReducer,
         commentReducer, myUpdateReducer,
         currentUserReducer, contactReducer }               from './reducers/index.js'

const content = combineReducers ({
  digests: digestReducer,
  sections: sectionReducer,
  updates: updateReducer,
  comments: commentReducer,
  loading: loadingReducer,
  myUpdates: myUpdateReducer
})

const reducer = combineReducers ({
  content: content,
  currentUser: currentUserReducer,
  routing: routeReducer,
  contacts: contactReducer
})


const store = createStore(reducer)
const history = createHistory()

let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)


syncReduxAndRouter(history, store)

ReactDOM.render(
  <Provider store={store} >
    <Router history={history} >
      <Route path='/' component={ Navbar } >
        <IndexRoute                   component={ DigestList } />
        <Route path='editor'          component={ Editor } />
        <Route path='settings'        component={ Settings } />
        <Route path='digests/:id'     component={ DigestContainer } />
        <Route path='updates'         component={ UpdateList } />
        <Route path='updates/:id'     component={ UpdateContainer } />
      </ Route>
    </ Router>
  </ Provider>,
  document.getElementById('app')
)
