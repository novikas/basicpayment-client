
export const buildUrl = (url, params) => {
  if (Object.keys(params).length) {
    return `${url}?${new URLSearchParams(params)}`
  } else {
    return url
  }
}