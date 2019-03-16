import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthForm } from '../components'

const SignUp = ({
  authStore: { values, errors, signUp, setUsername, setPassword, reset },
}) => (
  <Container>
    <Row>
      <Col xs={12} md={{ span: 6, offset: 2 }} lg={{ span: 4, offset: 4 }}>
        <h2>Sign up</h2>
      </Col>
    </Row>
    <Row style={{ marginBottom: 10 }}>
      <Col xs={12} md={{ span: 6, offset: 2 }} lg={{ span: 4, offset: 4 }}>
        <AuthForm
          usernameErrors={errors.username}
          passwordErrors={errors.password}
          nonFieldErrors={errors.nonField}
          username={values.username}
          password={values.password}
          onSubmit={signUp}
          onUsernameChange={setUsername}
          onPasswordChange={setPassword}
          reset={reset}
        />
      </Col>
    </Row>
    <Row>
      <Col xs={12} md={{ span: 6, offset: 2 }} lg={{ span: 4, offset: 4 }}>
        <Link to="/signin">Already have an account?</Link>
      </Col>
    </Row>
  </Container>
)

export default inject('authStore')(observer(SignUp))
