import React from 'react'
import { mount } from 'enzyme'
import SubmissionStatus from './SubmissionStatus'

describe('The SubmissionStatus form component', () => {
  it('renders success status', () => {
    const expected = {
      transition: false,
      valid: true
    }
    const component = mount(<SubmissionStatus {...expected} />)
    expect(component.find('.submission-status.valid').length).toBe(1)
    expect(component.state('width')).toBe(100)
  })

  it('renders error status', () => {
    const expected = {
      transition: false,
      valid: false
    }
    const component = mount(<SubmissionStatus {...expected} />)
    expect(component.find('.submission-status.invalid').length).toBe(1)
    expect(component.state('width')).toBe(100)
  })

  it('renders default bar and calls onTransition', () => {
    let updates = 0
    const expected = {
      transition: true,
      onTransitionEnd: () => {
        updates++
      }
    }
    const component = mount(<SubmissionStatus {...expected} />)
    expect(component.state('width')).not.toBe(100)
    expect(
      component.find('.submission-status .progress.transition').length
    ).toBe(1)
    window.setTimeout(() => {
      expect(updates).toBe(1)
    }, 1000)
  })
})
