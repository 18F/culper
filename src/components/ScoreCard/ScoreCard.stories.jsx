/* eslint import/no-extraneous-dependencies: 0 */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, number } from '@storybook/addon-knobs'

import { ScoreCard } from './ScoreCard'

storiesOf('ScoreCard', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <ScoreCard
      total={number('Total', 10)}
      completed={number('Completed', 5)}
    />
  ))
