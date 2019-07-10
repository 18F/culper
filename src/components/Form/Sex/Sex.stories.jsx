import React from 'react'
import { storiesOf } from '@storybook/react'

import Sex from './Sex'

storiesOf('Sex', module)
  .add('default', () => (
    <Sex
      show
    />
  ))
