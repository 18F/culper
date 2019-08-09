import React from 'react'
import { storiesOf } from '@storybook/react'

import ApoFpo from './ApoFpo'

storiesOf('ApoFpo', module)
  .add('default', () => (
    <ApoFpo
      label="APO/FPO state"
    />
  ))
