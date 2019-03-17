import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { Button, Form } from 'react-bootstrap'
import { ErrorMessage } from './ErrorMessage'

class TransactionFormComponent extends React.Component {
  componentWillUnmount() {
    this.props.transactionFormStore.reset()
  }

  render() {
    const { accounts, transactionFormStore } = this.props
    const {
      errors: {
        nonField: nonFieldErrors = [],
        sourceAccount: sourceAccountErrors = [],
        destinationAccount: destinationAccountErrors = [],
        amount: amountErrors = [],
      },
      values: {
        sourceAccount,
        destinationAccount,
        customDestinationAccount,
        amount,
      },
      isLoading,
    } = transactionFormStore

    return (
      <Form style={styles.container}>
        <h3 style={styles.header}>Transfer money</h3>
        {nonFieldErrors.length > 0 && (
          <ErrorMessage>{nonFieldErrors[0]}</ErrorMessage>
        )}
        <Form.Group as="fieldset">
          <Form.Text style={styles.text}>Source account</Form.Text>
          {sourceAccountErrors.length > 0 && (
            <ErrorMessage>{sourceAccountErrors[0]}</ErrorMessage>
          )}
          {accounts.map(acc => (
            <Form.Check
              onChange={e =>
                transactionFormStore.setSourceAccount(e.target.value)
              }
              inline
              checked={sourceAccount == acc.id}
              key={acc.id}
              name="sourceAccount"
              type="radio"
              value={acc.id}
              id={`sourceAccount-${acc.id}`}
              label={`#${acc.id} (${acc.currency})`}
            />
          ))}
        </Form.Group>

        <Form.Group as="fieldset">
          <Form.Text style={styles.text}>Destination account</Form.Text>
          {destinationAccountErrors.length > 0 && (
            <ErrorMessage>{destinationAccountErrors[0]}</ErrorMessage>
          )}
          {accounts.map(acc => (
            <Form.Check
              onChange={e =>
                transactionFormStore.setDestinationAccount(e.target.value)
              }
              key={acc.id}
              checked={destinationAccount == acc.id}
              name="destinationAccount"
              type="radio"
              id={`destinationAccount-${acc.id}`}
              value={acc.id}
              label={`#${acc.id} (${acc.currency})`}
            />
          ))}
          <Form.Check>
            <Form.Check.Input
              id="destinationAccountCustom"
              type="radio"
              name="destinationAccount"
              value={customDestinationAccount}
              onChange={e =>
                transactionFormStore.setDestinationAccount(e.target.value)
              }
              checked={customDestinationAccount === destinationAccount}
            />
            <Form.Control
              placeholder="Enter destination account id"
              value={customDestinationAccount}
              onFocus={() =>
                transactionFormStore.setDestinationAccount(
                  customDestinationAccount,
                )
              }
              type="number"
              onChange={e =>
                transactionFormStore.setCustomDestinationAccount(e.target.value)
              }
            />
          </Form.Check>
        </Form.Group>

        <Form.Group>
          <Form.Text style={styles.text}>Amount</Form.Text>
          {amountErrors.length > 0 && (
            <ErrorMessage>{amountErrors[0]}</ErrorMessage>
          )}
          <Form.Control
            type="number"
            placeholder="Enter amount in source account currency"
            value={amount}
            onChange={e => transactionFormStore.setAmount(e.target.value)}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="button"
          disabled={isLoading}
          onClick={!isLoading ? transactionFormStore.performTransaction : null}
        >
          {isLoading ? 'Loading...' : 'Submit'}
        </Button>
      </Form>
    )
  }
}

const styles = {
  container: {
    border: '1px solid lightgray',
    borderRadius: 5,
    padding: 20,
    marginTop: 10,
  },
  header: {
    borderBottom: '1px solid lightgray',
  },
  text: {
    fontSize: 18,
  },
}

export const TransactionForm = inject('transactionFormStore')(
  observer(TransactionFormComponent),
)
