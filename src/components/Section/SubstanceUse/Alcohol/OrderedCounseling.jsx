import React from 'react'
import { i18n } from '../../../../config'
import { Address, CheckboxGroup, Checkbox, Text, DateRange, ValidationElement, Field, Textarea, Branch, Show, Telephone } from '../../../Form'

export default class OrderedCounseling extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateSeekers = this.updateSeekers.bind(this)
    this.updateOtherSeeker = this.updateOtherSeeker.bind(this)
    this.updateActionTaken = this.updateActionTaken.bind(this)
    this.updateNoActionTakenExplanation = this.updateNoActionTakenExplanation.bind(this)
    this.updateCounselingDates = this.updateCounselingDates.bind(this)
    this.updateTreatmentProviderName = this.updateTreatmentProviderName.bind(this)
    this.updateTreatmentProviderAddress = this.updateTreatmentProviderAddress.bind(this)
    this.updateTreatmentProviderTelephone = this.updateTreatmentProviderTelephone.bind(this)
    this.updateCompletedTreatment = this.updateCompletedTreatment.bind(this)
    this.updateNoCompletedTreatmentExplanation = this.updateNoCompletedTreatmentExplanation.bind(this)
  }

  update (updateValues) {
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
        NoCompletedTreatmentExplanation: this.props.NoCompletedTreatmentExplanation,
        ...updateValues
      })
    }
  }

  updateSeekers (event) {
    let seeker = event.target.value
    let selected = [...(this.props.Seekers || [])]

    if (selected.includes(seeker)) {
      // Remove the relation if it was previously selected
      selected.splice(selected.indexOf(seeker), 1)
    } else {
      // Add the relation if it wasn't already
      selected.push(seeker)
    }

    this.update({Seekers: selected})
  }

  updateOtherSeeker (values) {
    this.update({OtherSeeker: values})
  }

  updateActionTaken (values) {
    this.update({ActionTaken: values})
  }

  updateNoActionTakenExplanation (values) {
    this.update({NoActionTakenExplanation: values})
  }

  updateCounselingDates (values) {
    this.update({CounselingDates: values})
  }

  updateTreatmentProviderName (values) {
    this.update({TreatmentProviderName: values})
  }

  updateTreatmentProviderAddress (values) {
    this.update({TreatmentProviderAddress: values})
  }

  updateTreatmentProviderTelephone (values) {
    this.update({TreatmentProviderTelephone: values})
  }

  updateCompletedTreatment (values) {
    this.update({CompletedTreatment: values})
  }

  updateNoCompletedTreatmentExplanation (values) {
    this.update({NoCompletedTreatmentExplanation: values})
  }

  render () {
    return (
      <div className="ordered-counseling">
        <Field title={i18n.t('substance.alcohol.orderedCounseling.heading.seekers')}
          help={'substance.alcohol.orderedCounseling.help.seekers'}
          adjustFor="p">
          {i18n.m('substance.alcohol.orderedCounseling.label.seekers')}
          <CheckboxGroup className="seekers"
            selectedValues={this.props.Seekers}>

            <Checkbox name="seekers-employer"
              label={i18n.m('substance.alcohol.orderedCounseling.seekers.label.employer')}
              value="Employer"
              className="seekers-employer"
              onValidate={this.props.onValidate}
              onChange={this.updateSeekers}
            />

            <Checkbox name="seekers-medicalProfessional"
              label={i18n.m('substance.alcohol.orderedCounseling.seekers.label.medicalProfessional')}
              value="MedicalProfessional"
              className="seekers-medical-professional"
              onValidate={this.props.onValidate}
              onChange={this.updateSeekers}
            />

            <Checkbox name="seekers-mentalHealthProfessional"
              label={i18n.m('substance.alcohol.orderedCounseling.seekers.label.mentalHealthProfessional')}
              value="MentalHealthProfessional"
              className="seekers-mental-health-professional"
              onValidate={this.props.onValidate}
              onChange={this.updateSeekers}
            />

            <Checkbox name="seekers-courtOfficial"
              label={i18n.m('substance.alcohol.orderedCounseling.seekers.label.courtOfficial')}
              value="CourtOfficial"
              className="seekers-court-official"
              onValidate={this.props.onValidate}
              onChange={this.updateSeekers}
            />

            <Checkbox name="seekers-notordered"
              label={i18n.m('substance.alcohol.orderedCounseling.seekers.label.notOrdered')}
              value="NotOrdered"
              className="seekers-not-ordered"
              onValidate={this.props.onValidate}
              onChange={this.updateSeekers}
            />

            <Checkbox name="seekers-other"
              label={i18n.m('substance.alcohol.orderedCounseling.seekers.label.other')}
              value="Other"
              className="seekers-other"
              onValidate={this.props.onValidate}
              onChange={this.updateSeekers}
            />
          </CheckboxGroup>
          <Show when={this.props.Seekers && this.props.Seekers.includes('Other')}>
            <Text name="OtherSeeker"
              label={i18n.t('substance.alcohol.orderedCounseling.label.otherSeeker')}
              {...this.props.OtherSeeker}
              onUpdate={this.updateOtherSeeker}
              onValidate={this.props.onValidate}
            />
          </Show>
        </Field>

        <Branch name="ActionTaken"
          label={i18n.t('substance.alcohol.orderedCounseling.heading.actionTaken')}
          labelSize="h3"
          help="substance.alcohol.orderedCounseling.help.actionTaken"
          className="action-taken"
          value={this.props.ActionTaken}
          onValidate={this.props.onValidate}
          onUpdate={this.updateActionTaken}>
        </Branch>

        <Show when={this.props.ActionTaken === 'Yes'}>
          <div>
            <Field title={i18n.t('substance.alcohol.orderedCounseling.heading.counselingDates')}
                   help={'substance.alcohol.orderedCounseling.help.counselingDates'}
                   adjustFor="daterange">
              <DateRange name="CounselingDates"
                className="counseling-dates"
                {...this.props.CounselingDates}
                onUpdate={this.updateCounselingDates}
                onValidate={this.props.onValidate}
              />
            </Field>
            <Field title={i18n.t('substance.alcohol.orderedCounseling.heading.treatmentProviderName')}
              help={'substance.alcohol.orderedCounseling.help.treatmentProviderName'}>
              <Text name="TreatmentProviderName"
                className="treatment-provider-name"
                {...this.props.TreatmentProviderName}
                onUpdate={this.updateTreatmentProviderName}
                onValidate={this.props.onValidate}
              />
            </Field>
            <Field title={i18n.t('substance.alcohol.orderedCounseling.heading.treatmentProviderAddress')}
                   help={'substance.alcohol.orderedCounseling.help.treatmentProviderAddress'}
                   adjustFor="address">
              <Address name="TreatmentProviderAddress"
                className="provider-address"
                {...this.props.TreatmentProviderAddress}
                onUpdate={this.updateTreatmentProviderAddress}
                onValidate={this.props.onValidate}
              />
            </Field>
            <Field title={i18n.t('substance.alcohol.orderedCounseling.heading.treatmentProviderTelephone')}
              help={'substance.alcohol.orderedCounseling.help.treatmentProviderTelephone'}>
              <Telephone name="TreatmentProviderTelephone"
                className="provider-telephone"
                {...this.props.TreatmentProviderTelephone}
                onUpdate={this.updateTreatmentProviderTelephone}
                onValidate={this.props.onValidate}
              />
            </Field>

            <Branch name="CompletedTreatment"
              help={'substance.alcohol.orderedCounseling.help.completedTreatment'}
              label={i18n.t('substance.alcohol.orderedCounseling.heading.completedTreatment')}
              labelSize="h3"
              className="completed-treatment"
              value={this.props.CompletedTreatment}
              onValidate={this.props.onValidate}
              onUpdate={this.updateCompletedTreatment}>
            </Branch>

            <Show when={this.props.CompletedTreatment === 'No'}>
              <Field title={i18n.t('substance.alcohol.orderedCounseling.heading.noCompletedTreatment')}>
                <Textarea name="NoCompletedTreatmentExplanation"
                  className="no-completed-treatment"
                  {...this.props.NoCompletedTreatmentExplanation}
                  onUpdate={this.updateNoCompletedTreatmentExplanation}
                  onValidate={this.props.onValidate}
                />
              </Field>
            </Show>
          </div>
        </Show>

        <Show when={this.props.ActionTaken === 'No'}>
            <Field title={i18n.t('substance.alcohol.orderedCounseling.heading.noActionTakenExplanation')}>
              <Textarea name="NoActionTakenExplanation"
                {...this.props.NoActionTakenExplanation}
                onUpdate={this.updateNoActionTakenExplanation}
                onValidate={this.props.onValidate}
              />
            </Field>
        </Show>
      </div>
    )
  }
}

OrderedCounseling.defaultProps = {
}
