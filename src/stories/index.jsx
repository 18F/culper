import React from 'react'
import { storiesOf } from '@storybook/react'

import { ScoreCard } from '../components/ScoreCard/ScoreCard'

storiesOf('ScoreCard', module)
  .add('default', () => (
    <ScoreCard
      total={10}
      completed={5}
    />
  ))
