import { ENDPOINTS } from '../api'

export const fetchAccounts = (token) =>
  fetch(ENDPOINTS.accounts, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
    .then(res => {
      if (res.status === 200 || res.status === 400) {
        return Promise.all([res.status, res.json()])
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
          payload: json,
        }
      }

      const { non_field_errors: nonField } = json

      return {
        ok: false,
        errors: {
          nonField,
        },
      }
    })
    .catch(() => ({ ok: false, errors: { nonField: ['Unknown error'] } }))

