import React from 'react'
import { shallow } from 'enzyme'
import ErrorMessage from 'components/ErrorMessage'
import ErrorMessageList from 'components/ErrorMessageList'

describe('The ErrorMessageList component', () => {
  it('renders without crashing', () => {
    shallow(<ErrorMessageList />)
  })

  it('does not render errors if there is no corresponding errorKey', () => {
    const errors = ['Error.noMatchingKey']
    const errorMap = {}

    const component = shallow(
      <ErrorMessageList errors={errors} errorMap={errorMap} />
    )

    expect(component.find(ErrorMessage).length).toEqual(0)
  })

  it('does not render errors if shouldDisplayError is falsey', () => {
    const errors = ['Error.somethingWrong']
    const errorMap = {
      'Error.somethingWrong': {
        errors: [
          {
            key: 'error1',
            title: 'This is an error',
            message: 'This is an error message.',
            note: 'This is an error note.',
            shouldDisplayError: () => false,
          },
        ],
      },
    }
    const component = shallow(
      <ErrorMessageList errors={errors} errorMap={errorMap} />
    )

    expect(component.find(ErrorMessage).length).toEqual(1)
  })

  it('renders errors', () => {
    const errors = ['Error.somethingWrong']
    const errorMap = {
      'Error.somethingWrong': {
        errors: [
          {
            key: 'error1',
            title: 'This is an error',
            message: 'This is an error message.',
            note: 'This is an error note.',
            shouldDisplayError: () => true,
          },
        ],
      },
    }
    const component = shallow(
      <ErrorMessageList errors={errors} errorMap={errorMap} />
    )

    expect(component.find(ErrorMessage).length).toEqual(1)
  })
})
