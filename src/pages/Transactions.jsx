import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Container, Table } from 'react-bootstrap'

import { SortingSwitch } from '../components'

class Transactions extends React.Component {
  componentDidMount() {
    const { transactionsStore } = this.props
    transactionsStore.load()
  }

  render() {
    const {
      transactionsStore: { list, toggleOrdering, params },
    } = this.props

    return (
      <Container>
        <h1>Transactions Log</h1>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>
                <SortingSwitch
                  title={'Amount'}
                  direction={params.ordering['amount']}
                  name={'amount'}
                  toggleDirection={toggleOrdering}
                />
              </th>
              <th>Type</th>
              <th>
                <SortingSwitch
                  title={'Date'}
                  direction={params.ordering['created_at']}
                  name={'created_at'}
                  toggleDirection={toggleOrdering}
                />
              </th>
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
