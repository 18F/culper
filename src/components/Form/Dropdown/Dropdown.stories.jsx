import React from 'react'
import { storiesOf } from '@storybook/react'

import Dropdown from './Dropdown'

storiesOf('Dropdown', module)
  .add('default', () => (
  	// Unable to get options to render in dropdown
    <Dropdown
      label="Choose an option"
    >
      <option key="option 1" value="Option 1">
        Option 1
      </option>
      <option key="Option 2" value="Option 2">
        Option 2
      </option>
      <option key="Option 3" value="Option 3">
        Option 3
      </option>
    </Dropdown>
  ))
