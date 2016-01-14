import React from 'react'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'
import { Layout, Header, Textfield, Drawer, Navigation, Grid } from 'react-mdl'
import { loadStart, loadSuccess, loadError } from '../actions/account'

class Navbar extends React.Component {

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

  componentDidMount = () => {
    this.fetchAccountInfo()
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
