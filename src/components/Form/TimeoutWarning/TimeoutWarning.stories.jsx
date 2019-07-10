import React from 'react'
import { storiesOf } from '@storybook/react'

import { TimeoutWarning } from './TimeoutWarning'

storiesOf('TimeoutWarning', module)
  .add('default', () => (
    <TimeoutWarning
      showWarning
    />
  ))
