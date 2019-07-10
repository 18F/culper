import React from 'react'
import { storiesOf } from '@storybook/react'

import MultipleDropdown from './MultipleDropdown'

storiesOf('MultipleDropdown', module)
  .add('default', () => (
    <MultipleDropdown
      label="Multi select dropdown"
    >
      <option key="option-1" value="Option 1">
        Option 1
      </option>
      <option key="option-2" value="Option 2">
        Option 2
      </option>
      <option key="option-3" value="Option 3">
        Option 3
      </option>
    </MultipleDropdown>
  ))
