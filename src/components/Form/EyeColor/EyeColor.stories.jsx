import React from 'react'
import { storiesOf } from '@storybook/react'

import EyeColor from './EyeColor'

storiesOf('EyeColor', module)
  .add('default', () => (
    <EyeColor
      name="Eye color"
    />
  ))
  .add('with error', () => (
    <EyeColor
      name="Eye color"
      className="usa-input-error"
    />
  ))
  // Unable to show selected state. I would have expected selectedValue to work since it is built using a RadioGroup but it does not.
