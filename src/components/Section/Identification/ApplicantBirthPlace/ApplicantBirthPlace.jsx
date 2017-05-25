import React from 'react'
import BirthPlaceValidator from '../../../../validators/birthplace'
import SubsectionElement from '../../SubsectionElement'
import { BirthPlace } from '../../../Form'

export default class ApplicantBirthPlace extends SubsectionElement {
  render () {
    const klass = `applicant-birthplace ${this.props.className || ''}`.trim()

    return (
      <div className={klass}>
        <BirthPlace name="ssn"
             {...this.props.value}
             onUpdate={this.props.onUpdate}
             onError={this.handleError}
             />
      </div>
    )
  }
}

ApplicantBirthPlace.defaultProps = {
  value: {},
  onError: (value, arr) => { return arr },
  section: 'identification',
  subsection: 'birthplace',
  dispatch: () => {},
  validator: (state, props) => {
    return new BirthPlaceValidator(props.value, props).isValid()
  }
}

ApplicantBirthPlace.errors = []
