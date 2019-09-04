import React from 'react'
import { shallow } from 'enzyme'
import ErrorMessage from 'components/ErrorMessage'
import ErrorMessageList from 'components/ErrorMessageList'

describe('The ErrorMessageList component', () => {
  it('renders without crashing', () => {
    shallow(<ErrorMessageList />)
  })

  it('renders errors', () => {
    const errors = [
      {
        key: 'error1',
        title: 'This is an error',
        message: 'This is an error message.',
        note: 'This is an error note.',
        shouldDisplayError: () => true,
      },
    ]

    const component = shallow(
      <ErrorMessageList errors={errors} />
    )

    expect(component.find(ErrorMessage).length).toEqual(1)
  })
})
