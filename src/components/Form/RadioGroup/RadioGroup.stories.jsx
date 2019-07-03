/* eslint import/no-extraneous-dependencies: 0 */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import RadioGroup from './RadioGroup'
import Radio from '../Radio/Radio'

storiesOf('RadioGroup', module)
  .add('default', () => (
    <RadioGroup
      className="option-list option-list-vertical"
    >
      <Radio
        label="Radio 1"
        value="Radio 1"
        onUpdate={action('onUpdate')}
      />
      <Radio
        label="Radio 2"
        value="Radio 2"
        onUpdate={action('onUpdate')}
      />
      <Radio
        label="Radio 3"
        value="Radio 3"
        onUpdate={action('onUpdate')}
      />
      <Radio
        label="Radio 4"
        value="Radio 4"
        onUpdate={action('onUpdate')}
      />
    </RadioGroup>
  ))
  .add('option selected', () => (
    <RadioGroup
      className="option-list option-list-vertical"
      selectedValue="Radio 1"
    >
      <Radio
        label="Radio 1"
        value="Radio 1"
        onUpdate={action('onUpdate')}
      />
      <Radio
        label="Radio 2"
        value="Radio 2"
        onUpdate={action('onUpdate')}
      />
      <Radio
        label="Radio 3"
        value="Radio 3"
        onUpdate={action('onUpdate')}
      />
      <Radio
        label="Radio 4"
        value="Radio 4"
        onUpdate={action('onUpdate')}
      />
    </RadioGroup>
  ))
  .add('with error', () => (
    <RadioGroup
      className="option-list option-list-vertical usa-input-error"
    >
      <Radio
        label="Radio 1"
        value="Radio 1"
        onUpdate={action('onUpdate')}
      />
      <Radio
        label="Radio 2"
        value="Radio 2"
        onUpdate={action('onUpdate')}
      />
      <Radio
        label="Radio 3"
        value="Radio 3"
        onUpdate={action('onUpdate')}
      />
      <Radio
        label="Radio 4"
        value="Radio 4"
        onUpdate={action('onUpdate')}
      />
    </RadioGroup>
  ))
  .add('inline', () => (
    <RadioGroup
      className="option-list"
    >
      <Radio
        label="Radio 1"
        value="Radio 1"
        onUpdate={action('onUpdate')}
      />
      <Radio
        label="Radio 2"
        value="Radio 2"
        onUpdate={action('onUpdate')}
      />
      <Radio
        label="Radio 3"
        value="Radio 3"
        onUpdate={action('onUpdate')}
      />
      <Radio
        label="Radio 4"
        value="Radio 4"
        onUpdate={action('onUpdate')}
      />
    </RadioGroup>
  ))
