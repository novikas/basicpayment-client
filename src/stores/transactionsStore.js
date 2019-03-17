import { action, decorate, observable } from 'mobx'
import { transactionsManager } from '../managers'

class TransactionsStore {
  list = []
  
  TYPE_ALL = 2
  TYPE_CREDIT = 1
  TYPE_DEBT = 0

  
  params = {
    type: this.TYPE_ALL,
    ordering: {
      created_at: false,
    }
  }

  load = () => {
    const params = {
      ordering: this.serializeOrdering(),
    }
    if (this.params.type !== this.TYPE_ALL) {
      params.type = this.params.type
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

  setTypeFilter = (value) => {
    this.params.type = value
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
  setTypeFilter: action,
})

export default new DecoratedTransactionsStore()
