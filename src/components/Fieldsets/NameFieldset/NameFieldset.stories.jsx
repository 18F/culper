/* eslint import/no-extraneous-dependencies: 0 */

import React from 'react'
import { storiesOf } from '@storybook/react'

import NameFieldset from './NameFieldset'

storiesOf('NameFieldset', module)
  .add('default', () => (
    <NameFieldset
      name="formField"
    />
  ))
  .add('with a value', () => (
    <NameFieldset
      name="formField"
      value={{
        first: 'Suzanne',
        middle: 'Rebecca',
        last: 'Rozier',
      }}
    />
  ))
  .add('with a title', () => (
    <NameFieldset
      title="Your name"
      name="formField"
      value={{
        first: 'Suzanne',
        middle: 'Rebecca',
        last: 'Rozier',
      }}
    />
  ))
