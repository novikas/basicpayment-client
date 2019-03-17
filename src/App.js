import React, { Component } from 'react'
import { Route } from 'react-router'
import { SignUp, SignIn, Accounts } from './pages'

class App extends Component {
  render() {
    return (
      <>
        <Route path={'/signup'} component={SignUp} />
        <Route path={'/signin'} component={SignIn} />
        <Route path={'/accounts'} component={Accounts} />
        <Route exact path={'/'} component={Accounts} />
      </>
    )
  }
}

export default App
