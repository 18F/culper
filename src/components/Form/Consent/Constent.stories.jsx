import React from 'react'
import { storiesOf } from '@storybook/react'

import { Consent } from './Consent'

storiesOf('Consent', module)
  .add('default', () => (
    <Consent />
  ))
