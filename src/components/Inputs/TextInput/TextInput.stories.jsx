/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'

import TextInput from './TextInput'
import { ConnectedTextInput } from '../connectedInputs'

storiesOf('Input', module)
  .add('default', () => (
    <TextInput
      label="My Form Field"
      name="formField"
    />
  ))
  .add('with a value', () => (
    <TextInput
      label="My Form Field"
      name="formField"
      value="Test value"
    />
  ))
  .add('with FormField', () => (
    <ConnectedTextInput
      label="My Form Field"
      name="formField"
      value="Test value"
    />
  ))
  .add('with FormField and errors', () => (
    <ConnectedTextInput
      label="My Form Field"
      name="formField"
      value="Test value"
      error={true}
      errors={['This field is required', 'Invalid value']}
    />
  ))
  .add('with FormField and help text', () => (
    <ConnectedTextInput
      label="My Form Field"
      name="formField"
      value="Test value"
      helptext="Help text"
    />
  ))
  .add('with FormField and errors and help text', () => (
    <ConnectedTextInput
      label="My Form Field"
      name="formField"
      value="Test value"
      helptext="Help text"
      error={true}
      errors={['This field is required', 'Invalid value']}
    />
  ))
