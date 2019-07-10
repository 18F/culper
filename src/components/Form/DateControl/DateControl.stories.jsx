import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { DateControl } from './DateControl'

storiesOf('DateControl', module)
  .add('default', () => (
    <DateControl />
  ))
  .add('with errors', () => (
    <DateControl
      className="usa-input-error"
    />
  ))
  .add('without estimated', () => (
    <DateControl
      showEstimated={false}
    />
  ))
  .add('month/year only', () => (
    <DateControl
      hideDay
      showEstimated={false}
    />
  ))
  .add('year only', () => (
    <DateControl
      hideDay
      hideMonth
      showEstimated={false}
    />
  ))
