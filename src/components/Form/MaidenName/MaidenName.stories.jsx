import React from 'react'
import { storiesOf } from '@storybook/react'

import MaidenName from './MaidenName'

storiesOf('MaidenName', module)
  .add('default', () => (
    <MaidenName
      selectedValue="yes"
    />
  ))
