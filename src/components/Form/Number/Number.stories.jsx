import React from 'react'
import { storiesOf } from '@storybook/react'

import Number from './Number'

storiesOf('Number', module)
  .add('default', () => (
    <Number
      label="Number input"
    />
  ))
