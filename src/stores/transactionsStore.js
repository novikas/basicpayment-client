import { action, decorate, observable } from 'mobx'
import { transactionsManager } from '../managers'

class TransactionsStore {
  list = []
  params = {
    ordering: {
      type: undefined,
      amount: false,
      created_at: false,
    }
  }

  load = () => {
    const params = {
      ordering: this.serializeOrdering(),
    }
    if (typeof(this.params.type) !== 'undefined') {
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
    this.params.type = value !== this.params.type ? value : undefined
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
