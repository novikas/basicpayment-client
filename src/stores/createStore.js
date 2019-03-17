import AccountsStore from './accountsStore'
import AuthStore from './authStore'
import RouterStore from './routerStore'
import TransactionFormStore from './transactionFormStore'
import TransactionsStore from './transactionsStore'

export const createStore = () => ({
  routerStore: RouterStore,
  authStore: AuthStore,
  accountsStore: AccountsStore,
  transactionsStore: TransactionsStore,
  transactionFormStore: TransactionFormStore,
})
