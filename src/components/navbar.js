import React from 'react'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'
import { Layout, Header, Textfield, Drawer, Navigation } from 'react-mdl'
import { loadStart, loadSuccess, loadError } from '../actions/account'
import { addDigest, loadStart as digestLoadStart, loadSuccess as digestLoadSuccess, loadError as digestLoadError } from '../actions/digest'
import { addSection } from '../actions/section'
import { addUpdate } from '../actions/update'
import { addUpdate as addMyUpdate, loadStart as updateLoadStart, loadSuccess as updateLoadSuccess, loadError as updateLoadError } from '../actions/my-update'


class Navbar extends React.Component {

  componentDidMount = () => {
    this.fetchAccountInfo()
    this.fetchAllDigests()
    this.fetchAllUpdates()
  }

  fetchAccountInfo = () => {
    let ajax = new XMLHttpRequest()
    ajax.open('GET', '/api/account')
    ajax.onreadystatechange = () => {
      if ( ajax.readyState != XMLHttpRequest.DONE) {
        return
      }
      if ( ajax.status !== 200 ) {
        this.props.dispatch(loadError())
      }
      let payload = JSON.parse(ajax.response)
      this.props.dispatch(loadSuccess(payload.data))
    }
    ajax.send()
    this.props.dispatch(loadStart())
  }

   parseSections = (sections) => {
    sections.forEach( (section) => {

      this.props.dispatch(addSection({
        id: section.id,
        title: section.title,
        intro: section.intro,
        body: section.body,
        imageUrl: section.imageUrl,
        AccountId: section.AccountId
      }))
    })
  }

  parseUpdates = (updates) => {
    updates.forEach( (update) => {
      this.parseSections(update.Sections)
      let sections = update.Sections.map( (section) => {
        return section.id
      })
      this.props.dispatch(addUpdate({
        id: update.id,
        draft: update.draft,
        sections: sections,
        AccountId: update.AccountId
      }))
    })
  }

  parseDigests = (digests) => {
    digests.forEach( (digest) => {
      this.parseUpdates(digest.Updates)
      let updates = digest.Updates.map( (update) => {
        return update.id
      })
      this.props.dispatch(addDigest({
        id: digest.id,
        readAt: digest.readAt,
        sentAt: digest.sentAt,
        updates: updates,
        PersonId: digest.PersonId
      }))
    })
  }

  fetchAllDigests = () => {
    let ajax = new XMLHttpRequest()
    ajax.open('GET', '/api/digests')
    ajax.onreadystatechange = () => {
      if ( ajax.readyState != XMLHttpRequest.DONE ) {
        return
      }
      if ( ajax.status !== 200 ) {
        this.props.dispatch(digestLoadError())
      }
      let payload = JSON.parse(ajax.response).data
      
      this.parseDigests(payload)
      this.props.dispatch(digestLoadSuccess())
    }
    ajax.send()
    this.props.dispatch(digestLoadStart())
  }
  
  parseUpdates = (updates) => {
    updates.forEach( (update) => {
      this.parseSections(update.Sections)
      let sections = update.Sections.map( (section) => {
        return section.id
      })
      this.props.dispatch(addUpdate({
        id: update.id,
        draft: update.draft,
        sections: sections,
        AccountId: update.AccountId
      }))
    })
  }

  fetchAllUpdates = () => {
    let ajax = new XMLHttpRequest()
    ajax.open('GET', '/api/updates')
    ajax.onreadystatechange = () => {
      if ( ajax.readyState != XMLHttpRequest.DONE ) {
        return
      }
      if ( ajax.status !== 200 ) {
        this.props.dispatch(updateLoadError())
      }
      let payload = JSON.parse(ajax.response)
      
      this.parseMyUpdates(payload.updates)
      this.props.dispatch(updateLoadSuccess())
    }
    ajax.send()
    this.props.dispatch(updateLoadStart())
  }

  parseMyUpdates = (updates) => {
    updates.forEach( (update) => {
      this.parseSections(update.Sections)
      let sections = update.Sections.map( (section) => {
        return section.id
      })
      this.props.dispatch(addMyUpdate({
        id: update.id,
        draft: update.draft,
        sections: sections,
        AccountId: update.AccountId
      }))
    })
  }

  render() {
    if (this.props.currentUser.get('loading')) {
      return <h1>Loading...</h1>
    }

    return (
      <Layout fixedHeader fixedDrawer >
    
        <Drawer title='Kindred'>
          <img src={this.props.currentUser.get('avatarUrl')} height="240px" />
          <p>{`${this.props.currentUser.get('firstName')} ${this.props.currentUser.get('lastName')}`}</p>
          <Navigation>
            <a onClick={()=>{this.props.dispatch(pushPath('/'))} }>Dashboard</a>
            <a onClick={()=>{this.props.dispatch(pushPath('/editor'))} }>Editor</a>
            <a onClick={()=>{this.props.dispatch(pushPath('/updates'))} }>My Updates</a>
          </Navigation>
        </Drawer>

        <Header title='Kindred'>
          <Textfield
            label='Search'
            expandable
            expandableIcon='search'
          />
        </Header>

        <main className="mdl-layout__content">
          <div className="page-content">
            {this.props.children}
          </div>
        </main>
      </Layout>
    )
  }
}

function mapState (state) {
  return {
    currentUser: state.currentUser,
    loading: state.content.loading
  }
}

export default connect( mapState )( Navbar )
