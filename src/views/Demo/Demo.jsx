import React from 'react'
import { ApplicantName } from '../../components/Form'
import { ApplicantSSN } from '../../components/Form'

class Demo extends React.Component {
  render () {
    return (
      <div>
        <h2>Demo</h2>
        <p>This is a playground for testing new components!</p>

        <ApplicantName name="applicant-name" />
        <ApplicantSSN name="applicant-ssn" value="123456789" notApplicable="true" />
      </div>
    )
  }
}

export default Demo
