import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Checkbox from './Checkbox'

storiesOf('Checkbox', module)
  .add('default', () => (
    <Checkbox
      label="select me"
      onUpdate={action('onUpdate')}
    />
  ))
  .add('disabled', () => (
    <Checkbox
      label="select me"
      onUpdate={action('onUpdate')}
      disabled
    />
  ))
