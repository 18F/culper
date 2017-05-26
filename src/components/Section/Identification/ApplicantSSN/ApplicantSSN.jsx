import React from 'react'
import { validSSN } from '../../../../validators/helpers'
import SubsectionElement from '../../SubsectionElement'
import { Field, SSN } from '../../../Form'

export default class ApplicantSSN extends SubsectionElement {
  render () {
    const klass = `applicant-ssn ${this.props.className || ''}`.trim()

    return (
      <div className={klass}>
        <Field help="identification.ssn.help">
          <SSN name="ssn"
               {...this.props.value}
               onUpdate={this.props.onUpdate}
               onError={this.handleError}
               />
        </Field>
      </div>
    )
  }
}

ApplicantSSN.defaultProps = {
  value: {},
  onError: (value, arr) => { return arr },
  section: 'identification',
  subsection: 'ssn',
  dispatch: () => {},
  validator: (state, props) => {
    return validSSN(props.value)
  }
}

ApplicantSSN.errors = []
