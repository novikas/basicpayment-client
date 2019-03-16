import { action, decorate, observable, set } from 'mobx'
import { authManager } from '../managers'
import RouterStore from './routerStore'
import { authRepository } from '../repositories'

class AuthStore {
  referer = undefined

  errors = {
    nonField: [],
    username: [],
    password: [],
  }

  values = {
    username: '',
    password: '',
  }

  setUsername = username => {
    this.errors.username = ''
    this.values.username = username
  }

  setPassword = password => {
    this.errors.password = ''
    this.values.password = password
  }

  resetValues = () => {
    this.values.username = ''
    this.values.password = ''
  }

  resetErrors = () => {
    this.errors = {
      nonField: [],
      username: [],
      password: [],
    }
  }

  reset = () => {
    this.resetValues()
    this.resetErrors()
  }

  saveTokensAndNavigateToReferer = tokens => {
    authRepository.saveTokens(tokens)
    RouterStore.push(this.referer || '/')
  }

  handleTokensResponse = res => {
    if (res.ok) {
      console.log(res.payload)
      this.saveTokensAndNavigateToReferer(res.payload)
    } else {
      set(this.errors, res.errors)
    }
  }

  signIn = () => {
    this.resetErrors()

    authManager
      .signIn(this.values.username, this.values.password)
      .then(this.handleTokensResponse)
  }

  signUp = () => {
    this.resetErrors()

    authManager
      .signUp(this.values.username, this.values.password)
      .then(this.handleTokensResponse)
  }

  signOut = () => {
    authRepository.clearTokens()
    RouterStore.push(this.referer || '/signin')
  }
}

const DecoratedAuthStore = decorate(AuthStore, {
  errors: observable,
  values: observable,
  setUsername: action,
  setPassword: action,
  reset: action,
  signUp: action,
  signIn: action,
  signOut: action,
})

export default new DecoratedAuthStore()
