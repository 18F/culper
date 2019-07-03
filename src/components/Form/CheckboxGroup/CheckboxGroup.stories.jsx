import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import CheckboxGroup from './CheckboxGroup'
import Checkbox from '../Checkbox/Checkbox'

storiesOf('CheckboxGroup', module)
  .add('default', () => (
    <CheckboxGroup
      className="option-list option-list-vertical"
    >
      <Checkbox
        name="checkbox-1"
        label="Checkbox 1"
        value="checkbox-1"
        onUpdate={action('onUpdate')}
      />
      <Checkbox
        name="checkbox-2"
        label="Checkbox 2"
        value="checkbox-2"
        onUpdate={action('onUpdate')}
      />
      <Checkbox
        name="checkbox-3"
        label="Checkbox 3"
        value="checkbox-3"
        onUpdate={action('onUpdate')}
      />
    </CheckboxGroup>
  ))
  .add('selected', () => (
    <CheckboxGroup
      className="option-list option-list-vertical"
      selectedValues={['checkbox-1']}
    >
      <Checkbox
        name="checkbox-1"
        label="Checkbox 1"
        value="checkbox-1"
        onUpdate={action('onUpdate')}
      />
      <Checkbox
        name="checkbox-2"
        label="Checkbox 2"
        value="checkbox-2"
        onUpdate={action('onUpdate')}
      />
      <Checkbox
        name="checkbox-3"
        label="Checkbox 3"
        value="checkbox-3"
        onUpdate={action('onUpdate')}
      />
    </CheckboxGroup>
  ))
  .add('with error', () => (
    <CheckboxGroup
      className="option-list option-list-vertical usa-input-error"
    >
      <Checkbox
        name="checkbox-1"
        label="Checkbox 1"
        value="checkbox-1"
        onUpdate={action('onUpdate')}
      />
      <Checkbox
        name="checkbox-2"
        label="Checkbox 2"
        value="checkbox-2"
        onUpdate={action('onUpdate')}
      />
      <Checkbox
        name="checkbox-3"
        label="Checkbox 3"
        value="checkbox-3"
        onUpdate={action('onUpdate')}
      />
    </CheckboxGroup>
  ))
  .add('selected', () => (
    <CheckboxGroup
      className="option-list option-list-vertical"
      selectedValues={['checkbox-1']}
    >
      <Checkbox
        name="checkbox-1"
        label="Checkbox 1"
        value="checkbox-1"
        onUpdate={action('onUpdate')}
      />
      <Checkbox
        name="checkbox-2"
        label="Checkbox 2"
        value="checkbox-2"
        onUpdate={action('onUpdate')}
      />
      <Checkbox
        name="checkbox-3"
        label="Checkbox 3"
        value="checkbox-3"
        onUpdate={action('onUpdate')}
      />
    </CheckboxGroup>
  ))
