import React from 'react'
import { storiesOf } from '@storybook/react'

import Generic from './Generic'

storiesOf('Generic Input', module)
  .add('default', () => (
    <Generic
      label="Generic input"
    />
  ))
  .add('default (disabled)', () => (
    <Generic
      label="Generic input"
      disabled
    />
  ))
  .add('default (with error)', () => (
    <Generic
      label="Generic input"
      className="usa-input-error"
    />
  ))
