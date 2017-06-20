import React from 'react'
import BirthPlaceValidator from '../../../../validators/birthplace'
import SubsectionElement from '../../SubsectionElement'
import { BirthPlace, Location } from '../../../Form'

export default class ApplicantBirthPlace extends SubsectionElement {
  render () {
    const klass = `applicant-birthplace ${this.props.className || ''}`.trim()

    return (
      <div className={klass}>
        <Location name="ssn"
             toggle={true}
             domesticFields={['state', 'city', 'county']}
             internationalFields={['city', 'country']}
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
