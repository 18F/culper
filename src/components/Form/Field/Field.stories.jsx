import React from 'react'
import { storiesOf } from '@storybook/react'

import Field from './Field'

storiesOf('Field', module)
  .add('default', () => (
    <Field
      titleSize="h4"
      title="Field title"
    />
  ))
  .add('default (with help)', () => (
    <Field
      titleSize="h4"
      title="Field title with help"
      help
      helpTitle="Help message title"
      helpMessage="This is a message that is mean to help the applicant."
    />
  ))
  // There are a bunch more permutations of Field but I chose not to include them all (i.e. different title sizes)
