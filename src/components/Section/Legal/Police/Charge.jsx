import React from 'react'
import PropTypes from 'prop-types'

import i18n from 'util/i18n'
import {
  Field,
  RadioGroup,
  Radio,
  Text,
  DateControl,
} from 'components/Form'

const Charge = (props) => {
  const {
    scrollIntoView,
    onError,
    required,
    onUpdate,
    ChargeType,
    CourtCharge,
    CourtOutcome,
    CourtDate,
  } = props

  const update = (values) => {
    onUpdate({
      ChargeType,
      CourtCharge,
      CourtOutcome,
      CourtDate,
      ...values,
    })
  }

  const updateField = (fieldName, value) => { update({ [`${fieldName}`]: value }) }
  const updateChargeType = value => updateField('ChargeType', value)
  const updateCourtCharge = value => updateField('CourtCharge', value)
  const updateCourtOutcome = value => updateField('CourtOutcome', value)
  const updateCourtDate = value => updateField('CourtDate', value)

  return (
    <div>
      <Field
        title={i18n.t('legal.police.heading.chargeType')}
        titleSize="label"
        adjustFor="buttons"
        shrink={true}
        scrollIntoView={scrollIntoView}
      >
        <RadioGroup
          className="offense-chargetype option-list"
          onError={onError}
          required={required}
          selectedValue={ChargeType && ChargeType.value}
        >
          <Radio
            name="charge-felony"
            className="charge-felony"
            label={i18n.t('legal.police.label.felony')}
            value="Felony"
            onUpdate={updateChargeType}
            onError={onError}
          />
          <Radio
            name="charge-misdemeanor"
            className="charge-misdemeanor"
            label={i18n.t('legal.police.label.misdemeanor')}
            value="Misdemeanor"
            onUpdate={updateChargeType}
            onError={onError}
          />
          <Radio
            name="charge-other"
            className="charge-other"
            label={i18n.t('legal.police.label.other')}
            value="Other"
            onUpdate={updateChargeType}
            onError={onError}
          />
        </RadioGroup>

        <Text
          name="CourtCharge"
          {...CourtCharge}
          label={i18n.t('legal.police.label.courtcharge')}
          className="offense-courtcharge"
          onUpdate={updateCourtCharge}
          onError={onError}
          required={required}
        />

        <Text
          name="CourtOutcome"
          {...CourtOutcome}
          label={i18n.t('legal.police.label.courtoutcome')}
          className="offense-courtoutcome"
          onUpdate={updateCourtOutcome}
          onError={onError}
          required={required}
        />
      </Field>

      <Field
        title={i18n.t('legal.police.heading.courtdate')}
        help="legal.police.help.courtdate"
        adjustFor="labels"
        shrink={true}
        scrollIntoView={scrollIntoView}
      >
        <DateControl
          name="CourtDate"
          {...CourtDate}
          hideDay={true}
          className="offense-courtdate"
          minDateEqualTo={true}
          onUpdate={updateCourtDate}
          onError={onError}
          required={required}
        />
      </Field>
    </div>
  )
}

Charge.propTypes = {
  scrollIntoView: PropTypes.bool,
  onError: PropTypes.func,
  required: PropTypes.bool,
  onUpdate: PropTypes.func,
  ChargeType: PropTypes.object,
  CourtCharge: PropTypes.object,
  CourtOutcome: PropTypes.object,
  CourtDate: PropTypes.object,
}

Charge.defaultProps = {
  scrollIntoView: false,
  onError: () => {},
  required: false,
  onUpdate: () => {},
  ChargeType: {},
  CourtCharge: {},
  CourtOutcome: {},
  CourtDate: {},
}

export default Charge
