/* eslint import/no-extraneous-dependencies: 0 */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, number } from '@storybook/addon-knobs'

import { ScoreCard } from './ScoreCard'

storiesOf('ScoreCard', module)
  .addDecorator(withKnobs)
  .add('empty', () => (
    <ScoreCard
      total={10}
      completed={0}
    />
  ))
  .add('partial', () => (
    <ScoreCard
      total={10}
      completed={3}
    />
  ))
  .add('completed', () => (
    <ScoreCard
      total={10}
      completed={10}
    />
  ))
  .add('custom', () => (
    <ScoreCard
      total={number('Total', 10)}
      completed={number('Completed', 5)}
    />
  ))
