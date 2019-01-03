import React from 'react'
import { i18n } from '../../../../config'
import {
  Field,
  ValidationElement,
  Location,
  Branch,
  Text,
  Textarea,
  DateRange,
  Telephone,
  Show
} from '../../../Form'
import DrugType from './DrugType'

export default class VoluntaryTreatment extends ValidationElement {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateDrugType = this.updateDrugType.bind(this)
    this.updateTreatmentProvider = this.updateTreatmentProvider.bind(this)
    this.updateTreatmentProviderAddress = this.updateTreatmentProviderAddress.bind(
      this
    )
    this.updateTreatmentProviderTelephone = this.updateTreatmentProviderTelephone.bind(
      this
    )
    this.updateTreatmentDates = this.updateTreatmentDates.bind(this)
    this.updateTreatmentCompleted = this.updateTreatmentCompleted.bind(this)
    this.updateNoTreatmentExplanation = this.updateNoTreatmentExplanation.bind(
      this
    )
  }

  update(updateValues) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        DrugType: this.props.DrugType,
        TreatmentProvider: this.props.TreatmentProvider,
        TreatmentProviderAddress: this.props.TreatmentProviderAddress,
        TreatmentProviderTelephone: this.props.TreatmentProviderTelephone,
        TreatmentDates: this.props.TreatmentDates,
        TreatmentCompleted: this.props.TreatmentCompleted,
        NoTreatmentExplanation: this.props.NoTreatmentExplanation,
        ...updateValues
      })
    }
  }

  updateDrugType(values) {
    this.update({ DrugType: values })
  }

  updateTreatmentProvider(values) {
    this.update({ TreatmentProvider: values })
  }

  updateTreatmentProviderAddress(values) {
    this.update({ TreatmentProviderAddress: values })
  }

  updateTreatmentProviderTelephone(values) {
    this.update({ TreatmentProviderTelephone: values })
  }

  updateTreatmentDates(values) {
    this.update({ TreatmentDates: values })
  }

  updateTreatmentCompleted(values) {
    this.update({ TreatmentCompleted: values })
  }

  updateNoTreatmentExplanation(values) {
    this.update({ NoTreatmentExplanation: values })
  }

  render() {
    return (
      <div className="drug-voluntary-treatment">
        <Field
          title={i18n.t('substance.drugs.voluntary.heading.drugType')}
          className="drug-type-voluntary"
          scrollIntoView={this.props.scrollIntoView}>
          <DrugType
            name="DrugType"
            {...this.props.DrugType}
            onUpdate={this.updateDrugType}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('substance.drugs.voluntary.heading.treatmentProvider')}
          adjustFor="label"
          scrollIntoView={this.props.scrollIntoView}>
          <Text
            name="TreatmentProvider"
            label={i18n.t('substance.drugs.voluntary.para.treatmentProvider')}
            className="treatment-provider"
            {...this.props.TreatmentProvider}
            onUpdate={this.updateTreatmentProvider}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t(
            'substance.drugs.voluntary.heading.treatmentProviderAddress'
          )}
          optional={true}
          adjustFor="address"
          help={'substance.drugs.voluntary.help.treatmentProviderAddress'}
          scrollIntoView={this.props.scrollIntoView}>
          <Location
            name="TreatmentProviderAddress"
            className="treatment-provider-address"
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
            'substance.drugs.voluntary.heading.treatmentProviderTelephone'
          )}
          className="treatment-provider-telephone override-required"
          help={'substance.drugs.voluntary.help.treatmentProviderTelephone'}
          adjustFor="telephone"
          scrollIntoView={this.props.scrollIntoView}>
          <Telephone
            name="TreatmentProviderTelephone"
            {...this.props.TreatmentProviderTelephone}
            allowNotApplicable={false}
            onUpdate={this.updateTreatmentProviderTelephone}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('substance.drugs.voluntary.heading.treatmentDates')}
          adjustFor="daterange"
          help={'substance.drugs.voluntary.help.treatmentDates'}
          scrollIntoView={this.props.scrollIntoView}>
          <DateRange
            name="TreatmentDates"
            className="treatment-dates"
            {...this.props.TreatmentDates}
            minDateEqualTo={true}
            onUpdate={this.updateTreatmentDates}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Branch
          name="TreatmentCompleted"
          label={i18n.t('substance.drugs.voluntary.heading.treatmentCompleted')}
          labelSize="h4"
          className="treatment-completed no-margin-bottom"
          {...this.props.TreatmentCompleted}
          onError={this.props.onError}
          required={this.props.required}
          onUpdate={this.updateTreatmentCompleted}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={this.props.TreatmentCompleted.value === 'No'}>
          <Field
            title={i18n.t(
              'substance.drugs.voluntary.heading.noTreatmentExplanation'
            )}
            titleSize="label"
            scrollIntoView={this.props.scrollIntoView}>
            <Textarea
              name="NoTreatmentExplanation"
              className="no-treatment-explanation"
              {...this.props.NoTreatmentExplanation}
              onUpdate={this.updateNoTreatmentExplanation}
              onError={this.props.onError}
              required={this.props.required}
            />
          </Field>
        </Show>
      </div>
    )
  }
}

VoluntaryTreatment.defaultProps = {
  TreatmentCompleted: {},
  addressBooks: {},
  dispatch: action => {},
  onError: (value, arr) => {
    return arr
  }
}
