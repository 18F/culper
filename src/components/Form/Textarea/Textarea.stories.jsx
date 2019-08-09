import React from 'react'
import { storiesOf } from '@storybook/react'

import Textarea from './Textarea'

storiesOf('Textarea', module)
  .add('default', () => (
    <Textarea
      label="Text area"
    />
  ))
  .add('disabled', () => (
    <Textarea
      label="Text area"
      disabled
    />
  ))
  .add('with error', () => (
    <Textarea
      label="Text area"
      className="usa-input-error"
    />
  ))
