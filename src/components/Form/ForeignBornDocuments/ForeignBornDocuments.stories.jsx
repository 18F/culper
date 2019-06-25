import React from 'react'
import { storiesOf } from '@storybook/react'

import { ForeignBornDocuments } from './ForeignBornDocuments'

storiesOf('ForeignBornDocuments', module)
  .add('default', () => (
    <ForeignBornDocuments />
  ))
// unable to render Foreign born documents because it is a controlled component. Needs controlled component wrapper.
