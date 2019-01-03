import React from 'react'
import { i18n } from '../../../../config'
import {
  Location,
  CheckboxGroup,
  Checkbox,
  Text,
  DateRange,
  ValidationElement,
  Field,
  Textarea,
  Branch,
  Show,
  Telephone
} from '../../../Form'

export default class OrderedCounseling extends ValidationElement {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateSeekers = this.updateSeekers.bind(this)
    this.updateOtherSeeker = this.updateOtherSeeker.bind(this)
    this.updateActionTaken = this.updateActionTaken.bind(this)
    this.updateNoActionTakenExplanation = this.updateNoActionTakenExplanation.bind(
      this
    )
    this.updateCounselingDates = this.updateCounselingDates.bind(this)
    this.updateTreatmentProviderName = this.updateTreatmentProviderName.bind(
      this
    )
    this.updateTreatmentProviderAddress = this.updateTreatmentProviderAddress.bind(
      this
    )
    this.updateTreatmentProviderTelephone = this.updateTreatmentProviderTelephone.bind(
      this
    )
    this.updateCompletedTreatment = this.updateCompletedTreatment.bind(this)
    this.updateNoCompletedTreatmentExplanation = this.updateNoCompletedTreatmentExplanation.bind(
      this
    )
  }

  update(updateValues) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        Seekers: this.props.Seekers,
        OtherSeeker: this.props.OtherSeeker,
        ActionTaken: this.props.ActionTaken,
        NoActionTakenExplanation: this.props.NoActionTakenExplanation,
        CounselingDates: this.props.CounselingDates,
        TreatmentProviderName: this.props.TreatmentProviderName,
        TreatmentProviderAddress: this.props.TreatmentProviderAddress,
        TreatmentProviderTelephone: this.props.TreatmentProviderTelephone,
        CompletedTreatment: this.props.CompletedTreatment,
        NoCompletedTreatmentExplanation: this.props
          .NoCompletedTreatmentExplanation,
        ...updateValues
      })
    }
  }

  updateSeekers(values) {
    let seeker = values.value
    let selected = [...((this.props.Seekers || {}).values || [])].filter(
      x => x !== 'NotOrdered'
    )

    if (seeker === 'NotOrdered') {
      selected = [seeker]
    } else {
      if (selected.includes(seeker)) {
        // Remove the relation if it was previously selected
        selected.splice(selected.indexOf(seeker), 1)
      } else {
        // Add the relation if it wasn't already
        selected.push(seeker)
      }
    }

    this.update({ Seekers: { values: selected } })
  }

  updateOtherSeeker(values) {
    this.update({ OtherSeeker: values })
  }

  updateActionTaken(values) {
    this.update({ ActionTaken: values })
  }

  updateNoActionTakenExplanation(values) {
    this.update({ NoActionTakenExplanation: values })
  }

  updateCounselingDates(values) {
    this.update({ CounselingDates: values })
  }

  updateTreatmentProviderName(values) {
    this.update({ TreatmentProviderName: values })
  }

  updateTreatmentProviderAddress(values) {
    this.update({ TreatmentProviderAddress: values })
  }

  updateTreatmentProviderTelephone(values) {
    this.update({ TreatmentProviderTelephone: values })
  }

  updateCompletedTreatment(values) {
    this.update({ CompletedTreatment: values })
  }

  updateNoCompletedTreatmentExplanation(values) {
    this.update({ NoCompletedTreatmentExplanation: values })
  }

  render() {
    return (
      <div className="ordered-counseling">
        <Field
          title={i18n.t('substance.alcohol.orderedCounseling.heading.seekers')}
          adjustFor="p"
          scrollIntoView={this.props.scrollIntoView}>
          {i18n.m('substance.alcohol.orderedCounseling.label.seekers')}
          <CheckboxGroup
            className="seekers option-list option-list-vertical"
            onError={this.props.onError}
            required={this.props.required}
            selectedValues={(this.props.Seekers || {}).values || []}>
            <Checkbox
              name="seekers-employer"
              label={i18n.m(
                'substance.alcohol.orderedCounseling.seekers.label.employer'
              )}
              value="Employer"
              className="seekers-employer"
              onError={this.props.onError}
              onUpdate={this.updateSeekers}
            />

            <Checkbox
              name="seekers-medicalProfessional"
              label={i18n.m(
                'substance.alcohol.orderedCounseling.seekers.label.medicalProfessional'
              )}
              value="MedicalProfessional"
              className="seekers-medical-professional"
              onError={this.props.onError}
              onUpdate={this.updateSeekers}
            />

            <Checkbox
              name="seekers-mentalHealthProfessional"
              label={i18n.m(
                'substance.alcohol.orderedCounseling.seekers.label.mentalHealthProfessional'
              )}
              value="MentalHealthProfessional"
              className="seekers-mental-health-professional"
              onError={this.props.onError}
              onUpdate={this.updateSeekers}
            />

            <Checkbox
              name="seekers-courtOfficial"
              label={i18n.m(
                'substance.alcohol.orderedCounseling.seekers.label.courtOfficial'
              )}
              value="CourtOfficial"
              className="seekers-court-official"
              onError={this.props.onError}
              onUpdate={this.updateSeekers}
            />

            <Checkbox
              name="seekers-notordered"
              label={i18n.m(
                'substance.alcohol.orderedCounseling.seekers.label.notOrdered'
              )}
              value="NotOrdered"
              className="seekers-not-ordered"
              onError={this.props.onError}
              onUpdate={this.updateSeekers}
            />

            <Checkbox
              name="seekers-other"
              label={i18n.m(
                'substance.alcohol.orderedCounseling.seekers.label.other'
              )}
              value="Other"
              className="seekers-other"
              onError={this.props.onError}
              onUpdate={this.updateSeekers}
            />
          </CheckboxGroup>
          <Show
            when={((this.props.Seekers || {}).values || []).includes('Other')}>
            <Field
              title={i18n.t(
                'substance.alcohol.orderedCounseling.label.otherSeeker'
              )}
              titleSize="label"
              adjustFor="text"
              scrollIntoView={this.props.scrollIntoView}>
              <Text
                name="OtherSeeker"
                {...this.props.OtherSeeker}
                onUpdate={this.updateOtherSeeker}
                onError={this.props.onError}
                required={this.props.required}
              />
            </Field>
          </Show>
        </Field>

        <Branch
          name="ActionTaken"
          label={i18n.t(
            'substance.alcohol.orderedCounseling.heading.actionTaken'
          )}
          labelSize="h4"
          className={`action-taken ${
            this.props.ActionTaken === 'No' ? 'no-margin-bottom' : ''
          }`}
          {...this.props.ActionTaken}
          onError={this.props.onError}
          required={this.props.required}
          onUpdate={this.updateActionTaken}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={this.props.ActionTaken.value === 'Yes'}>
          <div>
            <Field
              title={i18n.t(
                'substance.alcohol.orderedCounseling.heading.counselingDates'
              )}
              help={'substance.alcohol.orderedCounseling.help.counselingDates'}
              adjustFor="daterange"
              scrollIntoView={this.props.scrollIntoView}>
              <DateRange
                name="CounselingDates"
                className="counseling-dates"
                minDateEqualTo={true}
                {...this.props.CounselingDates}
                onUpdate={this.updateCounselingDates}
                onError={this.props.onError}
                required={this.props.required}
              />
            </Field>
            <Field
              title={i18n.t(
                'substance.alcohol.orderedCounseling.heading.treatmentProviderName'
              )}
              scrollIntoView={this.props.scrollIntoView}>
              <Text
                name="TreatmentProviderName"
                className="treatment-provider-name"
                {...this.props.TreatmentProviderName}
                onUpdate={this.updateTreatmentProviderName}
                onError={this.props.onError}
                required={this.props.required}
              />
            </Field>
            <Field
              title={i18n.t(
                'substance.alcohol.orderedCounseling.heading.treatmentProviderAddress'
              )}
              optional={true}
              help={
                'substance.alcohol.orderedCounseling.help.treatmentProviderAddress'
              }
              adjustFor="address"
              scrollIntoView={this.props.scrollIntoView}>
              <Location
                name="TreatmentProviderAddress"
                className="provider-address"
                {...this.props.TreatmentProviderAddress}
                layout={Location.ADDRESS}
                geocode={true}
                addressBooks={this.props.addressBooks}
                addressBook="Provider"
                showPostOffice={true}
                dispatch={this.props.dispatch}
                onUpdate={this.updateTreatmentProviderAddress}
                onError={this.props.onError}
                required={this.props.required}
              />
            </Field>
            <Field
              title={i18n.t(
                'substance.alcohol.orderedCounseling.heading.treatmentProviderTelephone'
              )}
              help={
                'substance.alcohol.orderedCounseling.help.treatmentProviderTelephone'
              }
              className="override-required"
              scrollIntoView={this.props.scrollIntoView}>
              <Telephone
                name="TreatmentProviderTelephone"
                className="provider-telephone"
                {...this.props.TreatmentProviderTelephone}
                onUpdate={this.updateTreatmentProviderTelephone}
                onError={this.props.onError}
                required={this.props.required}
              />
            </Field>

            <Branch
              name="CompletedTreatment"
              label={i18n.t(
                'substance.alcohol.orderedCounseling.heading.completedTreatment'
              )}
              labelSize="h4"
              className="completed-treatment no-margin-bottom"
              {...this.props.CompletedTreatment}
              onError={this.props.onError}
              required={this.props.required}
              onUpdate={this.updateCompletedTreatment}
              scrollIntoView={this.props.scrollIntoView}
            />

            <Show when={this.props.CompletedTreatment.value === 'No'}>
              <Field
                title={i18n.t(
                  'substance.alcohol.orderedCounseling.heading.noCompletedTreatment'
                )}
                titleSize="label"
                scrollIntoView={this.props.scrollIntoView}>
                <Textarea
                  name="NoCompletedTreatmentExplanation"
                  className="no-completed-treatment"
                  {...this.props.NoCompletedTreatmentExplanation}
                  onUpdate={this.updateNoCompletedTreatmentExplanation}
                  onError={this.props.onError}
                  required={this.props.required}
                />
              </Field>
            </Show>
          </div>
        </Show>

        <Show when={this.props.ActionTaken.value === 'No'}>
          <Field
            title={i18n.t(
              'substance.alcohol.orderedCounseling.heading.noActionTakenExplanation'
            )}
            titleSize="h4"
            scrollIntoView={this.props.scrollIntoView}>
            <Textarea
              name="NoActionTakenExplanation"
              {...this.props.NoActionTakenExplanation}
              onUpdate={this.updateNoActionTakenExplanation}
              onError={this.props.onError}
              required={this.props.required}
            />
          </Field>
        </Show>
      </div>
    )
  }
}

OrderedCounseling.defaultProps = {
  ActionTaken: {},
  CompletedTreatment: {},
  addressBooks: {},
  dispatch: action => {},
  onError: (value, arr) => {
    return arr
  }
}
