import React from 'react'
import { shallow } from 'enzyme'
import ScoreCard from './ScoreCard'

describe('ScoreCard', () => {
  it('renders without crashing', () => {
    shallow(
      <ScoreCard
        completedSectionsTotal={0}
        totalSections={10}
      />
    )
  })

  it('renders the completed class name if sections are completed', () => {
    const wrapper = shallow(
      <ScoreCard
        completedSectionsTotal={10}
        totalSections={10}
      />
    )

    expect(wrapper.find('.score-card .completed').length).toEqual(1)
  })
})
