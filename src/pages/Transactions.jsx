import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Container, Table } from 'react-bootstrap'

class Transactions extends React.Component {
  componentDidMount() {
    const { transactionsStore } = this.props
    transactionsStore.load()
  }

  render() {
    const {
      transactionsStore: { list },
    } = this.props

    return (
      <Container>
        <h1>Transactions Log</h1>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.amount}</td>
                  <td>{item.type}</td>
                  <td>{item.created_at}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Container>
    )
  }
}

export default inject('transactionsStore')(observer(Transactions))
