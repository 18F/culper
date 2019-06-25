import React from 'react'
import { storiesOf } from '@storybook/react'

import ErrorList from './ErrorList'

storiesOf('ErrorList', module)
  .add('default', () => (
    <ErrorList />
  ))
