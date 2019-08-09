import React from 'react'
import { storiesOf } from '@storybook/react'

import { SavedIndicator } from './SavedIndicator'

storiesOf('SavedIndicator', module)
  .add('default', () => (
    <SavedIndicator />
  ))
