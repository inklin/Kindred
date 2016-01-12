import React from 'react'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'
import { Layout, Header, Textfield, Drawer, Navigation } from 'react-mdl'
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

    if (this.props.currentUser.get('loading')) {
      return <h1>Loading...</h1>
    }

    return (
      <Layout fixedHeader fixedDrawer >

        <Drawer title='kindred' className="navbar-bground">
          <div className="navbar-avatar" style={navAvatar}></div>
          <p className="navbar-username">Welcome back {`${this.props.currentUser.get('firstName')}`}</p>
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
