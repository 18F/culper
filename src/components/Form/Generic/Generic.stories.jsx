import React from 'react'
import { storiesOf } from '@storybook/react'

import Generic from './Generic'

storiesOf('Generic', module)
  .add('default', () => (
    <Generic
      label="Generic input"
    />
  ))
  .add('disabled', () => (
    <Generic
      label="Generic input"
      disabled
    />
  ))
  .add('with error', () => (
    <Generic
      label="Generic input"
      className="usa-input-error"
    />
  ))
