import React, { Component } from 'react'
import { Route } from 'react-router'
import Auth from './pages/auth'
import Main from './pages/main'

class App extends Component {
  render() {
    return (
      <>
        <Route path={'/auth'} component={Auth} />
        <Route path={'/main'} component={Main} />
      </>
    )
  }
}

export default App
