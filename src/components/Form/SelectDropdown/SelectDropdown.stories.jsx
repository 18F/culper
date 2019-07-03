import React from 'react'
import { storiesOf } from '@storybook/react'

import SelectDropdown from './SelectDropdown'

storiesOf('SelectDropdown', module)
  .add('default', () => (
    <SelectDropdown>
      <option value="value1">value 1</option>
    </SelectDropdown>
  ))
