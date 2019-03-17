import React, { Component } from 'react'
import { Route } from 'react-router'
import { SignUp, SignIn, Accounts, Transactions } from './pages'

class App extends Component {
  render() {
    return (
      <>
        <Route path={'/signup'} component={SignUp} />
        <Route path={'/signin'} component={SignIn} />
        <Route exact path={'/'} component={Accounts} />
        <Route path={'/accounts'} component={Accounts} />
        <Route path={'/transactions'} component={Transactions} />
      </>
    )
  }
}

export default App
