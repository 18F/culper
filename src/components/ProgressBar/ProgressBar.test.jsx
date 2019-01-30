import React from 'react'
import { shallow } from 'enzyme'
import ProgressBar from './ProgressBar'

describe('The progress bar component', () => {
  it('renders without crashing', () => {
    shallow(
      <ProgressBar
        completedSectionsTotal={0}
        totalSections={10}
      />
    )
  })

  it('has the correct progress width', () => {
    const wrapper = shallow(
      <ProgressBar
        completedSectionsTotal={1}
        totalSections={10}
      />
    )

    expect(wrapper.find('#progress-bar').props().style.width).toBe('10%')
  })
})
