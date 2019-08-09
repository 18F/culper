import React from 'react'
import { storiesOf } from '@storybook/react'

import Suggestions from './Suggestions'

storiesOf('Suggestions', module)
  .add('default', () => (
    <Suggestions
      show
      suggestionTitle="Select previous address"
      suggestionParagraph="Choose the desired address from the list below"
      suggestionDismissLabel="Close"
    />
  ))
