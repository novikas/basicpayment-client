import * as React from 'react'
import { Button, Form } from 'react-bootstrap'

export class AuthForm extends React.Component {
  componentWillUnmount() {
    this.props.reset()
  }

  render() {
    const {
      username,
      password,
      onSubmit,
      onUsernameChange,
      onPasswordChange,
      usernameErrors = [],
      passwordErrors = [],
      nonFieldErrors = [],
    } = this.props

    return (
      <Form>
        {nonFieldErrors.length > 0 && (
          <ErrorMessage>{nonFieldErrors[0]}</ErrorMessage>
        )}
        <Form.Group controlId="username">
          <Form.Label>Login</Form.Label>
          <Form.Control
            isInvalid={usernameErrors.length}
            required
            value={username}
            onChange={e => onUsernameChange(e.target.value)}
          />
          {usernameErrors.length > 0 && (
            <ErrorMessage>{usernameErrors[0]}</ErrorMessage>
          )}
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            isInvalid={passwordErrors.length}
            required
            type="password"
            value={password}
            onChange={e => onPasswordChange(e.target.value)}
          />
          {passwordErrors.length > 0 && (
            <ErrorMessage>{passwordErrors[0]}</ErrorMessage>
          )}
        </Form.Group>

        <Button variant="primary" type="button" onClick={onSubmit}>
          Submit
        </Button>
      </Form>
    )
  }
}

const ErrorMessage = props => (
  <Form.Text style={{ color: '#dc3545' }}>{props.children}</Form.Text>
)
