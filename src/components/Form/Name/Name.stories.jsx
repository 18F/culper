import React from 'react'
import { storiesOf } from '@storybook/react'

import Name from './Name'

storiesOf('Name', module)
  .add('default', () => (
    <Name />
  ))
