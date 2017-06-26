import React from 'react'
import LocationValidator from '../../../../validators/birthplace'
import SubsectionElement from '../../SubsectionElement'
import { Location } from '../../../Form'
import { i18n } from '../../../../config'

export default class ApplicantBirthPlace extends SubsectionElement {
  render () {
    const klass = `applicant-birthplace ${this.props.className || ''}`.trim()

    return (
      <div className={klass}>
        <Location name="birthplace"
             layout={Location.BIRTHPLACE}
             label={i18n.t('identification.birthplace.label.location')}
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
