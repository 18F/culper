import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Currency from './Currency'

storiesOf('Currency', module)
  .add('default', () => (
    <Currency />
  ))
  .add('with error', () => (
    <Currency
      className="usa-input-error"
    />
  ))
