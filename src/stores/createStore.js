import AuthStore from './authStore'
import RouterStore from './routerStore'

export const createStore = () => ({
  routerStore: RouterStore,
  authStore: AuthStore,
})
