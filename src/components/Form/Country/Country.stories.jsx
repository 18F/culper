import React from 'react'
import { storiesOf } from '@storybook/react'

import Country from './Country'

storiesOf('Country input', module)
  .add('default', () => (
    <Country
      label="Select a country"
    />
  ))
  .add('default (multi-select)', () => (
    <Country
      label="Selected multiple countries"
      name="countries"
      multiple
    />
  ))
