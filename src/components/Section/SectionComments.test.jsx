import React from 'react'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import SectionComments from './SectionComments'

describe('Section comments', () => {
  const middlewares = [ thunk ]
  const mockStore = configureMockStore(middlewares)

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
})
