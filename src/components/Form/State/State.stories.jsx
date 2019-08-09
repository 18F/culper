import React from 'react'
import { storiesOf } from '@storybook/react'

import State from './State'

storiesOf('State', module)
  .add('default', () => (
    <State
      label="State"
    />
  ))
