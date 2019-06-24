import React from 'react'
import { storiesOf } from '@storybook/react'

import HairColor from './HairColor'

storiesOf('HairColor', module)
  .add('default', () => (
    <HairColor />
  ))
  .add('default (with error)', () => (
    <HairColor
      className="usa-input-error"
    />
  ))
