/* eslint import/no-extraneous-dependencies: 0 */

import React from 'react'
import { storiesOf } from '@storybook/react'

import FormField from './FormField'

storiesOf('FormField', module)
  .add('default', () => (
    <FormField
      label="My Form Field"
      name="formField"
    />
  ))
  .add('with a value', () => (
    <FormField
      label="My Form Field"
      name="formField"
      value="Test value"
    />
  ))
