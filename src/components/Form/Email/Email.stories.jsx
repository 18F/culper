import React from 'react'
import { storiesOf } from '@storybook/react'

import Email from './Email'

storiesOf('Email', module)
  .add('default', () => (
    <Email
      label="Email"
    />
  ))
  .add('with success', () => (
    <Email
      label="Email"
      value="josh@email.com"
    />
  ))
  .add('with error', () => (
    <Email
      label="Email"
      value="josh-at-email.com"
    />
  ))
