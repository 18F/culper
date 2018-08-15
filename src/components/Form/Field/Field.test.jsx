import React from 'react'
import { mount } from 'enzyme'
import Field from './Field'

describe('The field component', () => {
  it('help renders with default state closed', () => {
    const expected = {
      help: 'some.help.message.id'
    }
    const component = mount(<Field {...expected} />)
    expect(component.find('.message').length).toEqual(0)
  })

  it('help renders with message when active', () => {
    const expected = {
      help: 'this.should.not.exist'
    }
    const component = mount(<Field {...expected} />)
    component.find('.icon .toggle').simulate('click')
    expect(component.find('.message').length).toEqual(1)
    expect(component.find('.message').text().length).toBeGreaterThan(0)
  })

  it('help can toggle', () => {
    const expected = {
      help: 'error.Email.pattern'
    }
    const component = mount(<Field {...expected} />)
    component.find('.icon .toggle').simulate('click')
    expect(component.find('.usa-alert-info').length).toEqual(1)
    component.find('.icon .toggle').simulate('click')
    expect(component.find('.usa-alert-info').length).toEqual(0)
  })

  it('help can display an error', () => {
    const expected = {
      errors: [
        {
          code: 'error.Email.pattern',
          valid: false
        },
        {
          code: 'error.name.last.required',
          valid: true
        }
      ]
    }
    const component = mount(<Field {...expected} />)
    expect(component.find('.message.error').length).toEqual(1)
  })

  it('comments hidden if no value', () => {
    const expected = {
      comments: true,
      commentsValue: ''
    }
    const component = mount(<Field {...expected} />)
    expect(component.find('textarea').length).toEqual(0)
  })

  it('comments visible if given a value', () => {
    const expected = {
      comments: true,
      commentsValue: {
        value: 'Dude where is the gun show?'
      }
    }
    const component = mount(<Field {...expected} />)
    expect(component.find('textarea').length).toEqual(1)
  })

  it('comments can toggle', () => {
    let updates = 0
    const expected = {
      comments: true,
      onUpdate: () => { updates++ }
    }
    const component = mount(<Field {...expected} />)
    expect(component.find('textarea').length).toEqual(0)
    component.find('.comments-button.add').simulate('click')
    expect(component.find('textarea').length).toEqual(1)
    expect(updates).toBe(1)
  })

  it('does not displays optional text if nothing was specified', () => {
    const props = {
      title: 'Test field',
      optional: true
    }
    const component = mount(<Field {...props} />)
    expect(component.find('.optional').length).toBe(0)
  })

  it('does displays optional text if specified', () => {
    const props = {
      title: 'Test field',
      optional: true,
      optionalText: '(Optional)'
    }
    const component = mount(<Field {...props} />)
    expect(component.find('.optional').length).toBe(1)
  })
})
