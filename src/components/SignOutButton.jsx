import * as React from 'react'
import { Button } from 'react-bootstrap'
import { inject, observer } from 'mobx-react'

export const SignOutButton = inject('authStore')(
  observer(({ authStore }) => (
    <Button variant="link" onClick={authStore.signOut}>
      Sign out
    </Button>
  )),
)
