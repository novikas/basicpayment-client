import { createBrowserHistory } from 'history'
import { Provider } from 'mobx-react'
import { syncHistoryWithStore } from 'mobx-react-router'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { createStore } from './stores'

const stores = createStore()
const browserHistory = createBrowserHistory()
const history = syncHistoryWithStore(browserHistory, stores.routerStore)

ReactDOM.render(
  <Provider {...stores}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
