import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import { mount } from 'enzyme'
import { api } from '../../../services'
import Attachments from './Attachments'
import { testSnapshot } from '../../test-helpers'

// give a fake GUID so the field IDs don't differ between snapshots
// https://github.com/facebook/jest/issues/936#issuecomment-404246102
jest.mock('../../Form/ValidationElement/helpers', () =>
  Object.assign(require.requireActual('../../Form/ValidationElement/helpers'), {
    newGuid: jest.fn().mockReturnValue('MOCK-GUID')
  })
)

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
    expect(component.find('.upload-error .usa-alert-error p').text()).toBe(props.errorMessage)
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
    testSnapshot(<Attachments {...props} />)
  })
})
