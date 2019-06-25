import React from 'react'
import { storiesOf } from '@storybook/react'

import Text from './Text'

storiesOf('Text', module)
  .add('default', () => (
    <Text
      label="Text input"
    />
  ))
  .add('default (disabled)', () => (
    <Text
      label="Text input"
      disabled
    />
  ))
  .add('default (with error)', () => (
    <Text
      label="Text input"
      className="usa-input-error"
    />
  ))
