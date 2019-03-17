import { ENDPOINTS } from '../api'

export const fetchTransactions = (token, filters) =>
  fetch(`${ENDPOINTS.transactions}
    ${filters ? `?${new URLSearchParams(filters)}` : ''}`, {
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

      const { non_field_errors: nonField, ...fieldErrors } = json

      return {
        ok: false,
        errors: {
          nonField,
          ...fieldErrors
        },
      }
    })
    .catch(() => ({ ok: false, errors: { nonField: ['Unknown error'] } }))

