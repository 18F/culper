import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Location, Field } from '../../../Form'

export default class ApplicantBirthPlace extends SubsectionElement {
  constructor(props) {
    super(props)
    this.update = this.update.bind(this)
    this.updateLocation = this.updateLocation.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      Location: this.props.Location,
      ...queue
    })
  }

  updateLocation(values) {
    this.update({
      Location: values
    })
  }

  render() {
    const klass = `section-content applicant-birthplace ${this.props
      .className || ''}`.trim()

    return (
      <div className={klass} {...super.dataAttributes(this.props)}>
        <Field
          title={i18n.t('identification.birthplace.title')}
          titleSize="h2"
          scrollIntoView={this.props.scrollIntoView}>
          <Location
            name="birthplace"
            {...this.props.Location}
            layout={Location.BIRTHPLACE}
            label={i18n.t('identification.birthplace.label.location')}
            stateLabel={i18n.t('identification.birthplace.label.state')}
            cityLabel={i18n.t('identification.birthplace.label.city')}
            countyLabel={i18n.t('identification.birthplace.label.county')}
            countryLabel={i18n.t('identification.birthplace.label.country')}
            onUpdate={this.updateLocation}
            onError={this.handleError}
            required={this.props.required}
          />
        </Field>
      </div>
    )
  }
}

ApplicantBirthPlace.defaultProps = {
  location: {},
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  },
  section: 'identification',
  subsection: 'birthplace',
  dispatch: () => {},
  validator: data => {
    return validate(schema('identification.birthplace', data))
  }
}

ApplicantBirthPlace.errors = []
