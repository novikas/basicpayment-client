import AuthStore from './authStore'
import RouterStore from './routerStore'
import AccountsStore from './accountsStore'

export const createStore = () => ({
  routerStore: RouterStore,
  authStore: AuthStore,
  accountsStore: AccountsStore,
})
