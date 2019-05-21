/* eslint import/no-extraneous-dependencies: 0 */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Radio from './Radio'

storiesOf('Radio', module)
  .add('default (no label)', () => (
    <Radio onUpdate={action('onUpdate')} />
  ))
  .add('with label', () => (
    <Radio
      label="Select me"
      onUpdate={action('onUpdate')}
    />
  ))
  .add('with label (disabled)', () => (
    <Radio
      label="Select me"
      onUpdate={action('onUpdate')}
      disabled
    />
  ))
