import React from 'react'
import { shallow } from 'enzyme'
import Help from './Help'

describe('The Help view', () => {
  it('renders without crashing', () => {
    shallow(<Help />)
  })
})
