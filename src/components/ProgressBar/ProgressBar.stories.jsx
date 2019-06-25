import React from 'react'
import { storiesOf } from '@storybook/react'

import { ProgressBar } from './ProgressBar'

storiesOf('ProgressBar', module)
  .add('default', () => (
    <ProgressBar />
  ))
  .add('default (half complete)', () => (
    <ProgressBar
      completed="5"
    />
  ))
