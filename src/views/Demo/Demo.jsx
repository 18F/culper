import React from 'react'
import { ApplicantName, ApplicantSSN, ApplicantBirthPlace } from '../../components/Form'

class Demo extends React.Component {
  render () {
    return (
      <div>
        <h2>Demo</h2>
        <p>This is a playground for testing new components!</p>

        <ApplicantName name="applicant-name" />
        <hr />

        <ApplicantSSN name="applicant-ssn" value="123456789" notApplicable="true" />
        <hr />

        <ApplicantBirthPlace name="applicant-birthplace" />
        <hr />
      </div>
    )
  }
}

export default Demo
