import React from 'react'
import { mount } from 'enzyme'
import Attachments from './Attachments'

describe('The attachments component', () => {
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
    expect(component.find('.upload-error .message.error p').text()).toBe(props.errorMessage)
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
      onUpdate: () => { updates++ }
    }
    const component = mount(<Attachments {...props} />)
    expect(component.find('.upload-area').length).toBe(1)
    component.find('input[type="radio"][value="Upload"]').simulate('click')
    expect(updates).toBe(1)
  })
})
