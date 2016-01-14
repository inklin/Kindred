import React from 'react'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'
import { Layout, Drawer, Navigation, Grid } from 'react-mdl'
import { loadStart, loadSuccess, loadError } from '../actions/account'
import { addDigest, loadStart as digestLoadStart, loadSuccess as digestLoadSuccess, loadError as digestLoadError } from '../actions/digest'
import { addSection } from '../actions/section'
import { addUpdate } from '../actions/update'
import { addUpdate as addMyUpdate, loadStart as updateLoadStart, loadSuccess as updateLoadSuccess, loadError as updateLoadError } from '../actions/my-update'
import { addContact, loadStart as contactLoadStart, loadSuccess as contactLoadSuccess, loadError as contactLoadError } from '../actions/contact'


class Navbar extends React.Component {

  componentDidMount = () => {
    this.fetchAccountInfo()
    this.fetchAllDigests()
    this.fetchAllUpdates()
    this.fetchAllContacts()
  }

  fetchAllContacts = () => {
    let ajax = new XMLHttpRequest()
    ajax.open('GET', '/api/contacts')
    ajax.onreadystatechange = () => {
      if ( ajax.readyState != XMLHttpRequest.DONE ) {
        return
      }
      if ( ajax.status !== 200 ) {
        this.props.dispatch(contactLoadError())
      }
      let payload = JSON.parse(ajax.response)
      
      this.parseContacts(payload.contacts)
      this.props.dispatch(contactLoadSuccess())
    }
    ajax.send()
    this.props.dispatch(contactLoadStart())
  }

  parseContacts = (contacts) => {
    contacts.forEach( (contact) => {
      this.props.dispatch(addContact({
        id: contact.id,
        email: contact.Person.email
      }))
    })
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
    var navAvatar = {
      background: `url('${this.props.currentUser.get('avatarUrl')}') center / cover no-repeat`
    };

    var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    var dayNum = this.props.currentUser.get('digestSchedule');
    var dayOfWeek = days[dayNum - 1];
    var view = (this.props.currentUser.get('digestView') === "snippet") ? "Summary" : "Full";

    if (this.props.currentUser.get('loading')) {
      return <h1>Loading...</h1>
    }

    return (
      <Layout fixedDrawer >

        <Drawer title='kindred' className="navbar-bground">
          <div className="navbar-avatar" style={navAvatar}></div>
          <p className="navbar-username">Welcome back {`${this.props.currentUser.get('firstName')}`}</p>

          <Navigation>
            <a onClick={()=>{this.props.dispatch(pushPath('/editor'))} }>Create New Update</a>
            <a onClick={()=>{this.props.dispatch(pushPath('/updates'))} }>View Your Updates</a>
            <a onClick={()=>{this.props.dispatch(pushPath('/'))} }>View Digests</a>
            <span className="navbar-link-group-spacer"></span>
            <p className="">Your Digest Schedule:<br/><span className="navBar-info">{`${dayOfWeek}'s @ 5:00am`}</span></p>
            <p className="">Your Email Digest View:<br /><span className="navBar-info">{`${view}`}</span></p>
            <span className="navbar-link-group-spacer"></span>
            <a onClick={()=>{this.props.dispatch(pushPath('/settings'))} }>Edit Your Settings</a>
            <a onClick={()=>{this.props.dispatch(pushPath('/settings'))} }>Sign Out</a>
          </Navigation>
        </Drawer>

        <main className="mdl-layout__content">
          <Grid>
              {this.props.children}
          </Grid>
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
