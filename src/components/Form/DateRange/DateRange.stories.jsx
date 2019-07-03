import React from 'react'
import { storiesOf } from '@storybook/react'

import DateRange from './DateRange'

storiesOf('DateRange', module)
  .add('default', () => (
    <DateRange />
  ))
  // Unable to render date range because DateControl is a controlled component. Needs controlled component wrapper.
