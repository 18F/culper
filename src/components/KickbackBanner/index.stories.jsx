import React from 'react'
import { storiesOf } from '@storybook/react'

import KickbackBanner from './index'

storiesOf('KickbackBanner', module)
  .add('default', () => (
    <KickbackBanner />
  ))
