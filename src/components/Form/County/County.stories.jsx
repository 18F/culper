import React from 'react'
import { storiesOf } from '@storybook/react'

import County from './County'

storiesOf('County', module)
  .add('default', () => (
    <County
      label="County"
    />
  ))
