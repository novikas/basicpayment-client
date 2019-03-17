import { action, decorate, observable } from 'mobx'
import { accountsManager } from '../managers'
import { authRepository } from '../repositories'

class AccountsStore {
  list = []

  load = () => {
    accountsManager.fetchAccounts(authRepository.getTokens().accessToken)
      .then((res) => {
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
