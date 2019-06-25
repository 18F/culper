import React from 'react'
import { shallow } from 'enzyme'
import SubmitConfirmationModel from './SubmitConfirmationModal'

describe('The Submit Confirmation Modal', () => {
  it('renders without crashing', () => {
    shallow(
      <SubmitConfirmationModel
        formName="SF-86"
        handleCancel={() => {}}
        handleSubmit={() => {}}
      />
    )
  })
})
