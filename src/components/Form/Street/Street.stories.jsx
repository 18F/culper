import React from 'react'
import { storiesOf } from '@storybook/react'

import Street from './Street'

storiesOf('Street', module)
  .add('default', () => (
    <Street
      label="Street"
    />
  ))
