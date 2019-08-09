import React from 'react'
import { storiesOf } from '@storybook/react'

import Comments from './Comments'

storiesOf('Comments', module)
  .add('default', () => (
    <Comments />
  ))
