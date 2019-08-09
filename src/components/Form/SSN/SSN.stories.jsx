import React from 'react'
import { storiesOf } from '@storybook/react'

import SSN from './SSN'

storiesOf('SSN', module)
  .add('default', () => (
    <SSN />
  ))
