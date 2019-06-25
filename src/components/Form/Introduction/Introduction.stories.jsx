import React from 'react'
import { storiesOf } from '@storybook/react'

import { Introduction } from './Introduction'

storiesOf('Introduction', module)
  .add('default', () => (
    <Introduction />
  ))
