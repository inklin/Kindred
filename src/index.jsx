import React                                from 'react'
import ReactDOM                             from 'react-dom'
import { createStore, combineReducers }     from 'redux'
import { Provider }                         from 'react-redux'
import { Router, Route, IndexRoute }        from 'react-router'
import { createHistory }                    from 'history'
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router'
import { Navbar, DigestList, Editor, Digest,
         SectionContainer, Update }         from './components/index.js'
import { DigestReducer }                    from './reducers/index.js'

const reducer = combineReducers ({
  routing: routeReducer
})

const store = createStore(reducer)
const history = createHistory()

syncReduxAndRouter(history, store)

ReactDOM.render(
  <Provider store={store} >
    <Router history={history} >
      <Route path='/' component={ Navbar } >
        <IndexRoute                   component={ DigestList } />
        <Route path='editor'          component={ Editor } />
        <Route path='digests/:id'     component={ Digest } />
        <Route path='sections/:id'    component={ SectionContainer } />
        <Route path='updates'         component={ Update } />
      </ Route>
    </ Router>
  </ Provider>,
  document.getElementById('app')
)