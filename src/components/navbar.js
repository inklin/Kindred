import React from 'react'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'
import { Layout, Header, Textfield, Drawer, Navigation } from 'react-mdl'

class Navbar extends React.Component {

  render() {
    return (
      <Layout fixedHeader fixedDrawer >
    
        <Drawer title='Kindred'>
          <img src="https://s3.amazonaws.com/uifaces/faces/twitter/jadlimcaco/128.jpg" height="240px" />
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

export default connect()( Navbar )
