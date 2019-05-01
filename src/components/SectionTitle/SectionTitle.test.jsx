import React from 'react'
import { shallow } from 'enzyme'

import { SectionTitle } from 'components/SectionTitle/SectionTitle'

describe('The SectionTitle component', () => {
  it('renders without errors', () => {
    const component = shallow(<SectionTitle location={{}} />)

    expect(component.exists()).toBe(true)
    expect(component).toMatchSnapshot()
  })

  it('can handle no title', () => {
    const component = shallow(<SectionTitle location={{}} />)
    expect(component.find('h1').length).toBe(0)
  })

  it('can handle title 1 deep', () => {
    const component = shallow(<SectionTitle location={{ pathname: '/form/legal' }} />)
    expect(component.find('h1').length).toBe(0)
  })

  it('can handle title 2 deep', () => {
    const component = shallow(<SectionTitle location={{ pathname: '/form/identification/name' }} />)

    expect(component.find('h1').length).toEqual(1)
    expect(component.find('h1').text()).toEqual(
      'Information about you > Full name'
    )
  })

  it('can handle title 3 deep', () => {
    const component = shallow(<SectionTitle location={{ pathname: '/form/legal/technology/unauthorized' }} />)

    expect(component.find('h1').length).toEqual(1)
    expect(component.find('h1').text()).toEqual(
      'Investigative and criminal history > Use of information technology systems > Unauthorized access'
    )
  })
})
