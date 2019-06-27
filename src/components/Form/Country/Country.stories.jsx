import React from 'react'
import { storiesOf } from '@storybook/react'

import Country from './Country'

storiesOf('Country input', module)
  .add('default', () => (
    <Country
      label="Select a country"
    />
  ))
  .add('multi-select', () => (
    // Unable to get multi-select working
    <Country
      label="Selected multiple countries"
      name="countries"
      multiple
    />
  ))
