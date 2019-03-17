import { ENDPOINTS } from '../../api'
import { authRepository } from '../../repositories'
import { AuthStore } from '../../stores'

export const authenticatedFetch = async (url, options, isRetry) => {
  let { accessToken, refreshToken } = authRepository.getTokens()

  if (!accessToken) {
    if (!refreshToken) {
      AuthStore.signOut()

      return
    }

    const refreshRes = await fetch(ENDPOINTS.refreshToken, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh: refreshToken }),
    })

    if (refreshRes.status !== 200) {
      AuthStore.signOut()

      return
    }

    const { access, refresh } = await refreshRes.json()
    console.log(access, refresh)
    accessToken = access
    refreshToken = refresh

    authRepository.saveTokens({ accessToken, refreshToken })
  }

  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (res.status === 401) {
    if (!isRetry) {
      authRepository.clearAccessToken()

      return authenticatedFetch(url, options, true)
    } else {
      AuthStore.signOut()

      return
    }
  }

  return res
}
