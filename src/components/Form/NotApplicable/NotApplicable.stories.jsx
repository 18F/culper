import React from 'react'
import { storiesOf } from '@storybook/react'

import NotApplicable from './NotApplicable'
import Generic from '../Generic/Generic'

storiesOf('NotApplicable', module)
  .add('default', () => (
    <NotApplicable />
  ))
  .add('default (with field)', () => (
    <NotApplicable
      or="or"
    >
      <Generic
        label="Field label"
      />
    </NotApplicable>
  ))
