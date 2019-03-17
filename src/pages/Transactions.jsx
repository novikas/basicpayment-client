import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Container, Table } from 'react-bootstrap'

import { SortingSwitch, FilterSwitch } from '../components'

class Transactions extends React.Component {
  componentDidMount() {
    const { transactionsStore } = this.props
    transactionsStore.load()
  }

  render() {
    const {
      transactionsStore: { list, toggleOrdering, setTypeFilter, params },
    } = this.props

    return (
      <Container>
        <h1>Transactions Log</h1>
        <FilterSwitch
          value={params.type}
          name={'type'}
          options={[
            {
              name: 'Debt',
              value: 0,
            },
            {
              name: 'Credit',
              value: 1,
            },
          ]}
          handleChange={setTypeFilter}
        />
        <Table>
          <thead>
            <tr>
              <th>Type</th>
              <th>
                <SortingSwitch
                  title={'Amount'}
                  direction={params.ordering['amount']}
                  name={'amount'}
                  toggleDirection={toggleOrdering}
                />
              </th>
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
                  <td>{item.type_name}</td>
                  <td>{item.amount}</td>
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
