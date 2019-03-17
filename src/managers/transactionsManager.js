import { ENDPOINTS } from '../api'
import { authenticatedFetch, buildUrl } from './utils'

export const fetchTransactions = params =>
  authenticatedFetch(buildUrl(ENDPOINTS.transactions, params), {
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

      const { non_field_errors: nonField, ...fieldErrors } = json

      return {
        ok: false,
        errors: {
          nonField,
          ...fieldErrors,
        },
      }
    })
    .catch(() => ({ ok: false, errors: { nonField: ['Unknown error'] } }))

export const createTransaction = (sourceAccount, destinationAccount, amount) =>
  authenticatedFetch(ENDPOINTS.transactions, {
    method: 'POST',
    body: JSON.stringify({
      from_account: sourceAccount,
      to_account: destinationAccount,
      amount,
    }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(res => {
      if (res.status === 201) {
        return [res.status]
      }
      if (res.status === 400) {
        return Promise.all([res.status, res.json()])
      }

      return Promise.all([
        res.status,
        { errors: { nonField: ['Unknown error'] } },
      ])
    })
    .then(([status, json]) => {
      if (status === 201) {
        return {
          ok: true,
        }
      }

      return {
        ok: false,
        errors: {
          nonField: json.non_field_errors,
          sourceAccount: json.from_account,
          destinationAccount: json.to_account,
          amount: json.amount,
        },
      }
    })
    .catch(e => console.log(e), {
      ok: false,
      errors: { nonField: ['Unknown error'] },
    })
