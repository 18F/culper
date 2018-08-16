import React from 'react'
import renderer from 'react-test-renderer'
import MockAdapter from 'axios-mock-adapter'
import { mount } from 'enzyme'
import { api } from '../../../services'
import Attachments from './Attachments'

describe('The attachments component', () => {
  beforeEach(() => {
    const mock = new MockAdapter(api.proxy)
    mock.onGet('/me/attachment').reply(200, {})
  })

  it('displays for uploads', () => {
    const props = {
      AttachmentType: { value: 'Upload' }
    }
    const component = mount(<Attachments {...props} />)
    expect(component.find('.upload-area').length).toBe(1)
  })

  it('displays for uploads with error message', () => {
    const props = {
      AttachmentType: { value: 'Upload' },
      errorMessage: 'This is a test'
    }
    const component = mount(<Attachments {...props} />)
    const msg = component.find('.upload-error .message.error p').text()
    expect(msg).toBe(props.errorMessage)
  })

  it('displays for fax', () => {
    const props = {
      AttachmentType: { value: 'Fax' }
    }
    const component = mount(<Attachments {...props} />)
    expect(component.find('.fax-area').length).toBe(1)
  })

  it('displays for mail', () => {
    const props = {
      AttachmentType: { value: 'Other' }
    }
    const component = mount(<Attachments {...props} />)
    expect(component.find('.other-area').length).toBe(1)
  })

  it('triggers updates', () => {
    let updates = 0
    const props = {
      AttachmentType: { value: 'Upload' },
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<Attachments {...props} />)
    expect(component.find('.upload-area').length).toBe(1)
    component.find('input[type="radio"][value="Upload"]').simulate('click')
    expect(updates).toBe(1)
  })

  it('renders properly', () => {
    const props = { AttachmentType: { value: 'Upload' } }
    const component = renderer.create(<Attachments {...props} />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
