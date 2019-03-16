import React, { Component } from 'react'
import { Route } from 'react-router'
import { SignUp, SignIn } from './pages'

class App extends Component {
  render() {
    return (
      <>
        <Route path={'/signup'} component={SignUp} />
        <Route path={'/signin'} component={SignIn} />
      </>
    )
  }
}

export default App
