import { action, decorate, observable } from 'mobx'
import { transactionsManager } from '../managers'

class TransactionsStore {
  list = []
  params = {
    ordering: {
      amount: false,
      created_at: false,
    }
  }

  load = () => {
    const params = {
      ordering: this.serializeOrdering()
    }

    transactionsManager.fetchTransactions(params).then(res => {
      if (res.ok) {
        this.list = res.payload
      } else {
        console.log('Failed to load accounts', res)
      }
    })
  }

  toggleOrdering = (name) => {
    this.params.ordering[name] = !this.params.ordering[name]
    this.load()
  }

  serializeOrdering = () => {
    const { ordering } = this.params
    return Object.keys(ordering)
        .reduce((acc, key) => acc + (ordering[key] ? key : `-${key}`) + ',', '')
        .replace(/(^,)|(,$)/g, '')
  }
}

const DecoratedTransactionsStore = decorate(TransactionsStore, {
  list: observable,
  load: action,
  params: observable,
  toggleOrdering: action,
})

export default new DecoratedTransactionsStore()
