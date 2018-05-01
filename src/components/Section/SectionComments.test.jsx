import React from 'react'
import { mount } from 'enzyme'
import SectionComments from './SectionComments'

describe('Section comments', () => {
  it('has optional text', () => {
    const props = {
      title: 'Test section comments'
    }
    const component = mount(<SectionComments {...props} />)
    expect(component.find('.optional').length).toBe(1)
    expect(component.find('.optional').text()).toBe('(Optional)')
  })

  it('can update', () => {
    let comments = ''
    const props = {
      title: 'Test section comments',
      onUpdate: (queue) => {
        comments = queue.Comments.value
      }
    }
    const component = mount(<SectionComments {...props} />)
    component.find('.section-comment input').simulate('change', { target: { value: 'no comment' } })
    expect(comments).toBe('no comment')
  })

  it('defaults behave as expected', () => {
    expect(SectionComments.defaultProps.onError(0, [])).toEqual([])
    expect(SectionComments.defaultProps.validator()).toBe(true)
    expect(SectionComments.defaultProps.onUpdate()).toBe(undefined)
    expect(SectionComments.defaultProps.dispatch()).toBe(undefined)
  })
})
