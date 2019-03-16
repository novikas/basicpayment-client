export const saveTokens = ({ accessToken, refreshToken }) => {
  localStorage.setItem('accessToken', accessToken)
  localStorage.setItem('refreshToken', refreshToken)
}

export const getTokens = () => ({
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
})

export const clearTokens = () => {
  localStorage.setItem('accessToken', undefined)
  localStorage.setItem('refreshToken', undefined)
}
