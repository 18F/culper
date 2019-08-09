import React from 'react'
import { storiesOf } from '@storybook/react'

import Spinner from './Spinner'

storiesOf('Spinner', module)
  .add('default', () => (
    <Spinner
      show
    />
  ))
