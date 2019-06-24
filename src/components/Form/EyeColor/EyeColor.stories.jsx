import React from 'react'
import { storiesOf } from '@storybook/react'

import EyeColor from './EyeColor'

storiesOf('EyeColor', module)
  .add('default', () => (
    <EyeColor
      name="Eye color"
    />
  ))
  .add('default (with error)', () => (
    <EyeColor
      name="Eye color"
      className="usa-input-error"
    />
  ))
