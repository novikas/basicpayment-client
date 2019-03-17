import { ENDPOINTS } from '../api'

const getTokens = (url, username, password) =>
  fetch(url, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => {
      if (res.status === 200 || res.status === 400) {
        return Promise.all([res.status, res.json()])
      }

      if (res.status === 201) {
        return Promise.all([res.status])
      }

      return Promise.all([
        res.status,
        { errors: { nonField: ['Unknown error'] } },
      ])
    })
    .then(([status, json]) => {
      if (status === 200) {
        return {
          ok: true,
          payload: {
            accessToken: json.access,
            refreshToken: json.refresh,
          },
        }
      } else if (status === 201) {
        return {
          ok: true,
        }
      }


      const { non_field_errors: nonField, ...fieldErrors } = json

      return {
        ok: false,
        errors: {
          nonField,
          ...fieldErrors,
        },
      }
    })
    .catch((err) => ({ ok: false, errors: { nonField: ['Unknown error'] } }))

export const signUp = (username, password) =>
  getTokens(ENDPOINTS.signUp, username, password)

export const signIn = (username, password) =>
  getTokens(ENDPOINTS.getToken, username, password)
