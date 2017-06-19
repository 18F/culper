import React from 'react'
import { i18n } from '../../../../config'
import { Field, ValidationElement, Address, Branch, Text, Textarea, DateRange, Telephone, Show } from '../../../Form'
import DrugType from './DrugType'

export default class VoluntaryTreatment extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateDrugType = this.updateDrugType.bind(this)
    this.updateTreatmentProvider = this.updateTreatmentProvider.bind(this)
    this.updateTreatmentProviderAddress = this.updateTreatmentProviderAddress.bind(this)
    this.updateTreatmentProviderTelephone = this.updateTreatmentProviderTelephone.bind(this)
    this.updateTreatmentDates = this.updateTreatmentDates.bind(this)
    this.updateTreatmentCompleted = this.updateTreatmentCompleted.bind(this)
    this.updateNoTreatmentExplanation = this.updateNoTreatmentExplanation.bind(this)
  }

  update (updateValues) {
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

  updateDrugType (values) {
    this.update({DrugType: values})
  }

  updateTreatmentProvider (values) {
    this.update({TreatmentProvider: values})
  }

  updateTreatmentProviderAddress (values) {
    this.update({TreatmentProviderAddress: values})
  }

  updateTreatmentProviderTelephone (values) {
    this.update({TreatmentProviderTelephone: values})
  }

  updateTreatmentDates (values) {
    this.update({TreatmentDates: values})
  }

  updateTreatmentCompleted (values) {
    this.update({TreatmentCompleted: values})
  }

  updateNoTreatmentExplanation (values) {
    this.update({NoTreatmentExplanation: values})
  }

  render () {
    return (
      <div className="drug-voluntary-treatment">

        <Field title={i18n.t('substance.drugs.voluntary.heading.drugType')}
          className="drug-type-voluntary"
          help={'substance.drugs.voluntary.help.drugType'}>
          <DrugType name="DrugType"
            {...this.props.DrugType}
            onUpdate={this.updateDrugType}
            onError={this.props.onError}
          />
        </Field>

        <Field title={i18n.t('substance.drugs.voluntary.heading.treatmentProvider')}
               help={'substance.drugs.voluntary.help.treatmentProvider'}
               adjustFor="label">
          <Text name="TreatmentProvider"
                label={i18n.t('substance.drugs.voluntary.para.treatmentProvider')}
                className="treatment-provider"
                {...this.props.TreatmentProvider}
                onUpdate={this.updateTreatmentProvider}
                onError={this.props.onError}
                />
        </Field>

        <Field title={i18n.t('substance.drugs.voluntary.heading.treatmentProviderAddress')}
               adjustFor="address"
               help={'substance.drugs.voluntary.help.treatmentProviderAddress'}>
          <Address name="TreatmentProviderAddress"
                   className="treatment-provider-address"
                   {...this.props.TreatmentProviderAddress}
                   onUpdate={this.updateTreatmentProviderAddress}
                   onError={this.props.onError}
                   />
        </Field>
        <Field title={i18n.t('substance.drugs.voluntary.heading.treatmentProviderTelephone')}
               className="treatment-provider-telephone"
               help={'substance.drugs.voluntary.help.treatmentProviderTelephone'}>
          <Telephone name="TreatmentProviderTelephone"
                     {...this.props.TreatmentProviderTelephone}
                     onUpdate={this.updateTreatmentProviderTelephone}
                     onError={this.props.onError}
                     />
        </Field>

        <Field title={i18n.t('substance.drugs.voluntary.heading.treatmentDates')}
               adjustFor="daterange"
               help={'substance.drugs.voluntary.help.treatmentDates'}>
          <DateRange name="TreatmentDates"
                     className="treatment-dates"
                     {...this.props.TreatmentDates}
                     onUpdate={this.updateTreatmentDates}
                     onError={this.props.onError}
                     />
        </Field>

        <h3>{i18n.t('substance.drugs.voluntary.heading.treatmentCompleted')}</h3>
        <Branch name="TreatmentCompleted"
                className="treatment-completed"
                help={'substance.drugs.voluntary.help.treatmentCompleted'}
                value={this.props.TreatmentCompleted}
                onError={this.props.onError}
                onUpdate={this.updateTreatmentCompleted}>
        </Branch>

        <Show when={this.props.TreatmentCompleted === 'No'}>
          <Field title={i18n.t('substance.drugs.voluntary.heading.noTreatmentExplanation')}
                 titleSize="h4"
                 help={'substance.drugs.voluntary.help.noTreatmentExplanation'}>
            <Textarea name="NoTreatmentExplanation"
                      className="no-treatment-explanation"
                      {...this.props.NoTreatmentExplanation}
                      onUpdate={this.updateNoTreatmentExplanation}
                      onError={this.props.onError}
                      />
          </Field>
        </Show>
      </div>
    )
  }
}

VoluntaryTreatment.defaultProps = {
  onError: (value, arr) => { return arr }
}
