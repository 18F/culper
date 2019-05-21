/* eslint import/no-extraneous-dependencies: 0 */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import RadioGroup from './RadioGroup'
import Radio from '../Radio/Radio'

storiesOf('RadioGroup', module)
  .add('default (empty)', () => (
    <RadioGroup />
  ))
  .add('with Yes/No radios (yes selected)', () => (
    <RadioGroup
      selectedValue="yes"
    >
      <Radio
        label="Yes"
        value="yes"
        onUpdate={action('onUpdate')}
      />
      <Radio
        label="No"
        value="no"
        onUpdate={action('onUpdate')}
      />
    </RadioGroup>
  ))
  .add('with Yes/No radios (no selected)', () => (
    <RadioGroup
      selectedValue="no"
    >
      <Radio
        label="Yes"
        value="yes"
        onUpdate={action('onUpdate')}
      />
      <Radio
        label="No"
        value="no"
        onUpdate={action('onUpdate')}
      />
    </RadioGroup>
  ))
