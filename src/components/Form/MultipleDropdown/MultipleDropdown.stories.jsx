import React from 'react'
import { storiesOf } from '@storybook/react'

import MultipleDropdown from './MultipleDropdown'

storiesOf('MultipleDropdown', module)
  .add('default', () => (
    <MultipleDropdown
      label="Multi select dropdown"
      value={['value 1', 'value 2']}
    />
  ))
