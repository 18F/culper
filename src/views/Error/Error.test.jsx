import React from 'react'
import { mount } from 'enzyme'
import Error from './Error'
import { i18n } from '../../config'

describe('The Error view', () => {
  it('is visible with context', () => {
    const component = mount(<Error />)
    expect(component.find('.auth.error').length).toEqual(1)
    expect(component.find('.auth.error h3').text()).toEqual(
      i18n.t('application.loading.error.title')
    )
    expect(component.find('.auth.error p').text()).toEqual(
      i18n.t('application.loading.error.para')
    )
    expect(component.find('.auth.error a').text()).toEqual(
      i18n.t('application.loading.error.button')
    )
  })
})
