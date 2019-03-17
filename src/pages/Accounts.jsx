import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { Container, Row, Table, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { TransactionForm, SignOutButton } from '../components'

class Accounts extends React.Component {
  componentDidMount() {
    const { accountsStore } = this.props
    accountsStore.load()
  }

  render() {
    const { accountsStore } = this.props
    return (
      <Container>
        <h1>Accounts</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Currency</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {accountsStore.list.map((account, index) => {
              return (
                <tr key={index}>
                  <td>{account.id}</td>
                  <td>{account.currency}</td>
                  <td>{account.balance}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        <Link to="/transactions">View transactions log</Link>
        <SignOutButton />
        <Row>
          <Col xs={4}>
            <TransactionForm accounts={accountsStore.list} />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default inject('accountsStore')(observer(Accounts))
