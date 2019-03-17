import * as React from 'react'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { Container, Table, Col } from 'react-bootstrap'
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
        <Col>
          <h1>Transactions Log</h1>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
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
                {
                  name: 'All',
                  value: 2,
                },
              ]}
              handleChange={setTypeFilter}
            />
            <Link to="/accounts">Accounts Page</Link>
          </div>
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
                  Date
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
        </Col>
      </Container>
    )
  }
}

export default inject('transactionsStore')(observer(Transactions))
