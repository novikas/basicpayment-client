import { action, decorate, observable, set } from 'mobx'
import { transactionsManager } from '../managers'
import AccountsStore from './accountsStore'

class TransactionFormStore {
  static DEFAULT_ERRORS = {
    nonField: [],
    sourceAccount: [],
    destinationAccount: [],
    amount: [],
  }

  static DEFAULT_VALUES = {
    sourceAccount: undefined,
    destinationAccount: undefined,
    customDestinationAccount: '',
    amount: 0,
  }

  isLoading = false

  errors = TransactionFormStore.DEFAULT_ERRORS

  values = TransactionFormStore.DEFAULT_VALUES

  setSourceAccount = sourceAccount => {
    this.values.sourceAccount = sourceAccount

    if (this.values.sourceAccount === this.values.destinationAccount) {
      this.values.destinationAccount = undefined
    }
  }

  setDestinationAccount = destinationAccount => {
    this.values.destinationAccount = destinationAccount

    if (this.values.sourceAccount === this.values.destinationAccount) {
      this.values.sourceAccount = undefined
    }
  }

  setCustomDestinationAccount = customDestinationAccount => {
    this.values.customDestinationAccount = customDestinationAccount
    this.setDestinationAccount(customDestinationAccount)
  }

  setAmount = amount => {
    this.values.amount = amount
  }

  resetErrors = () => {
    set(this.errors, TransactionFormStore.DEFAULT_ERRORS)
  }

  reset = () => {
    set(this.errors, TransactionFormStore.DEFAULT_ERRORS)
    set(this.values, TransactionFormStore.DEFAULT_VALUES)
    this.isLoading = false
  }

  performTransaction = () => {
    this.resetErrors()
    this.isLoading = true

    transactionsManager
      .createTransaction(
        this.values.sourceAccount,
        this.values.destinationAccount,
        this.values.amount,
      )
      .then(res => {
        if (res.ok) {
          AccountsStore.load()
        } else {
          set(this.errors, res.errors)
        }
      })
      .finally(() => {
        this.isLoading = false
      })
  }
}

const DecoratedTransactionFormStore = decorate(TransactionFormStore, {
  isLoading: observable,
  values: observable,
  errors: observable,
  setSourceAccount: action,
  setDestinationAccount: action,
  setCustomDestinationAccount: action,
  setAmount: action,
  performTransaction: action,
  resetErrors: action,
  reset: action,
})

export default new DecoratedTransactionFormStore()
