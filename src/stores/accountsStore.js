import { action, decorate, observable } from 'mobx'
import { accountsManager } from '../managers'

class AccountsStore {
  list = []

  load = () => {
    accountsManager.fetchAccounts().then(res => {
      if (res.ok) {
        this.list = res.payload
      } else {
        console.log('Failed to load accounts', res)
      }
    })
  }
}

const DecoratedAccountsStore = decorate(AccountsStore, {
  list: observable,
  load: action,
})

export default new DecoratedAccountsStore()
