import * as React from 'react'
import { Form } from 'react-bootstrap'

export const ErrorMessage = props => (
  <Form.Text style={{ color: '#dc3545' }}>{props.children}</Form.Text>
)
