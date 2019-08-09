import React from 'react'
import { storiesOf } from '@storybook/react'

import Telephone from './Telephone'

storiesOf('Telephone', module)
  .add('Domestic', () => (
    <Telephone
      allowNotApplicable={false}
    />
  ))
  .add('international', () => (
    <Telephone
      allowNotApplicable={false}
      type="International"
    />
  ))
  .add('with not applicable', () => (
    <Telephone />
  ))
