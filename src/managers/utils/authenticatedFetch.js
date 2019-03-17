import { authRepository } from '../../repositories'
import { authStore } from '../../stores'
import { ENDPOINTS } from '../../api'

export const authenticatedFetch = async (url, options, isRetry) => {
  let { accessToken, refreshToken } = authRepository.getTokens()

  if (!accessToken) {
    if (!refreshToken) {
      authStore.signOut()

      return
    }

    const refreshRes = await fetch(ENDPOINTS.refreshToken, {
      headers: { 'Content-Type': 'appliaction/json' },
      body: JSON.stringify({ refresh: refreshToken }),
    })

    if (refreshRes.status !== 200) {
      authStore.signOut()

      return
    }

    const { access, refresh } = await refreshRes.json()

    accessToken = access
    refreshToken = refresh

    authRepository.saveTokens({ accessToken, refreshToken })
  }

  const res = await fetch(url, {
    ...options,
    headers: { ...options.headers, Authorization: `Bearer ${accessToken}` },
  })

  if (res.status === 401) {
    if (!isRetry) {
      authRepository.clearAccessToken()

      return authenticatedFetch(url, options, true)
    } else {
      authStore.signOut()

      return
    }
  }

  return res
}
