import React from 'react'
import { ApplicantName } from '../../components/Form'

class Demo extends React.Component {
  render () {
    return (
      <div>
        <h2>Demo</h2>
        <p>This is a playground for testing new components!</p>

        <ApplicantName name="applicant-name" />
      </div>
    )
  }
}

export default Demo
