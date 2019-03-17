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
      transactionsStore: {
        list,
        toggleOrdering,
        setTypeFilter,
        params,
        TYPE_ALL,
        TYPE_CREDIT,
        TYPE_DEBT,
      },
    } = this.props

    return (
      <Container>
        <Col>
          <h1>Transactions Log</h1>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <FilterSwitch
              value={params.type}
              name={'type'}
              options={[
                {
                  name: 'Debt',
                  value: TYPE_DEBT,
                },
                {
                  name: 'Credit',
                  value: TYPE_CREDIT,
                },
                {
                  name: 'All',
                  value: TYPE_ALL,
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
                <th>Amount</th>
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
        </Col>
      </Container>
    )
  }
}

export default inject('transactionsStore')(observer(Transactions))
