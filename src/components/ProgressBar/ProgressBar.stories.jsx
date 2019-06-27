import React from 'react'
import { storiesOf } from '@storybook/react'

import { ProgressBar } from './ProgressBar'

storiesOf('ProgressBar', module)
  .add('empty', () => (
    <ProgressBar />
  ))
  .add('partial', () => (
    <ProgressBar
      completed="5"
    />
  ))
  .add('completed', () => (
    <ProgressBar
      completed="10"
    />
  ))
