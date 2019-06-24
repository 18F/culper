import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Checkbox from './Checkbox'

storiesOf('Checkbox', module)
  .add('default (no label', () => (
    <Checkbox />
  ))
  .add('with label', () => (
    <Checkbox
      label="select me"
      onUpdate={action('onUpdate')}
    />
  ))
  .add('with label (disabled)', () => (
    <Checkbox
      label="select me"
      onUpdate={action('onUpdate')}
      disabled
    />
  ))
