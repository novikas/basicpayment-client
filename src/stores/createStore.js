import AuthStore from './authStore'
import RouterStore from './routerStore'
import AccountsStore from './accountsStore'
import TransactionsStore from './transactionsStore'

export const createStore = () => ({
  routerStore: RouterStore,
  authStore: AuthStore,
  accountsStore: AccountsStore,
  transactionsStore: TransactionsStore,
})
