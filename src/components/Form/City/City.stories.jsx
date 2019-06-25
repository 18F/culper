import React from 'react'
import { storiesOf } from '@storybook/react'

import City from './City'

storiesOf('City', module)
  .add('default', () => (
    <City
      label="City"
    />
  ))
