import { ENDPOINTS } from '../api'
import { authenticatedFetch } from './utils'

export const fetchAccounts = () =>
  authenticatedFetch(ENDPOINTS.accounts, {
    method: 'GET',
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
