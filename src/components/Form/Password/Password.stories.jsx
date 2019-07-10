import React from 'react'
import { storiesOf } from '@storybook/react'

import Password from './Password'

storiesOf('Password', module)
  .add('default', () => (
    <Password
      label="Password input"
    />
  ))
