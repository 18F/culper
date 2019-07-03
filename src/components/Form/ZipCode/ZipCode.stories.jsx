import React from 'react'
import { storiesOf } from '@storybook/react'

import ZipCode from './ZipCode'

storiesOf('ZipCode', module)
  .add('default', () => (
    <ZipCode
      label="Zip code"
    />
  ))
