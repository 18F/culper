import React from 'react'
import { storiesOf } from '@storybook/react'

import { ForeignBornDocuments } from './ForeignBornDocuments'

storiesOf('ForeignBornDocuments', module)
  .add('default', () => (
    <ForeignBornDocuments />
  ))
