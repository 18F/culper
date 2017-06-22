import React from 'react'
import LocationValidator from '../../../../validators/birthplace'
import SubsectionElement from '../../SubsectionElement'
import { Location } from '../../../Form'

export default class ApplicantBirthPlace extends SubsectionElement {
  render () {
    const klass = `applicant-birthplace ${this.props.className || ''}`.trim()

    return (
      <div className={klass}>
        <Location name="ssn"
             layout={Location.BIRTHPLACE}
             label="Were you born in the United States?"
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
    return new LocationValidator(props.value, props).isValid()
  }
}

ApplicantBirthPlace.errors = []
