import React from 'react'
import { storiesOf } from '@storybook/react'

import MilitaryState from './MilitaryState'

storiesOf('MilitaryState', module)
  .add('default', () => (
    <MilitaryState
      label="Military state"
    />
  ))
