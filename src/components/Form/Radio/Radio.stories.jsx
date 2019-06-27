/* eslint import/no-extraneous-dependencies: 0 */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Radio from './Radio'

storiesOf('Radio', module)
  .add('default', () => (
    <Radio
      label="Select me"
      onUpdate={action('onUpdate')}
    />
  ))
  .add('disabled', () => (
    <Radio
      label="Select me"
      onUpdate={action('onUpdate')}
      disabled
    />
  ))
