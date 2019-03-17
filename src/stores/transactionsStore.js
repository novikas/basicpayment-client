import { action, decorate, observable } from 'mobx'
import { transactionsManager } from '../managers'

class TransactionsStore {
  list = []

  load = () => {
    transactionsManager.fetchTransactions(false).then(res => {
      if (res.ok) {
        this.list = res.payload
      } else {
        console.log('Failed to load accounts', res)
      }
    })
  }
}

const DecoratedTransactionsStore = decorate(TransactionsStore, {
  list: observable,
  load: action,
})

export default new DecoratedTransactionsStore()
