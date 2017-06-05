import React from 'react'
import { i18n } from '../../../../config'
import { Field, ValidationElement, Checkbox, Address, CheckboxGroup, Branch, Text, Textarea, DateRange, Telephone, Show } from '../../../Form'
import DrugType from './DrugType'

export default class OrderedTreatment extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateOrderedBy = this.updateOrderedBy.bind(this)
    this.updateExplanation = this.updateExplanation.bind(this)
    this.updateActionTaken = this.updateActionTaken.bind(this)
    this.updateNoActionTakenExplanation = this.updateNoActionTakenExplanation.bind(this)

    // If action taken
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
        OrderedBy: this.props.OrderedBy,
        Explanation: this.props.Explanation,
        ActionTaken: this.props.ActionTaken,
        NoActionTakenExplanation: this.props.NoActionTakenExplanation,
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

  updateOrderedBy (cb) {
    let selected = cb.value
    let list = [...this.props.OrderedBy]

    if (list.includes(selected)) {
      list.splice(list.indexOf(selected), 1)
    } else {
      list.push(selected)
    }
    this.update({OrderedBy: list})
  }

  updateExplanation (values) {
    this.update({Explanation: values})
  }

  updateActionTaken (values) {
    this.update({ActionTaken: values})
  }

  updateNoActionTakenExplanation (values) {
    this.update({NoActionTakenExplanation: values})
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
      <div className="drug-ordered-treatment">

        <Field title={i18n.t('substance.drugs.ordered.heading.orderedBy')}
          help={'substance.drugs.ordered.help.orderedBy'}>
          <CheckboxGroup className="ordered-by"
            selectedValues={this.props.OrderedBy}>
            <Checkbox name="Employer"
              label={i18n.m('substance.drugs.ordered.orderedBy.label.employer')}
              value="Employer"
              className="employer"
              onUpdate={this.updateOrderedBy}
              onError={this.props.onError}
            />
            <Checkbox name="MedicalProfessional"
              label={i18n.m('substance.drugs.ordered.orderedBy.label.medicalProfessional')}
              value="MedicalProfessional"
              className="medical-professional"
              onUpdate={this.updateOrderedBy}
              onError={this.props.onError}
            />
            <Checkbox name="MentalHealthProfessional"
              label={i18n.m('substance.drugs.ordered.orderedBy.label.mentalHealthProfessional')}
              value="MentalHealthProfessional"
              className="mental-health-professional"
              onUpdate={this.updateOrderedBy}
              onError={this.props.onError}
            />
            <Checkbox name="Judge"
              label={i18n.m('substance.drugs.ordered.orderedBy.label.judge')}
              value="Judge"
              className="judge"
              onUpdate={this.updateOrderedBy}
              onError={this.props.onError}
            />
            <Checkbox name="None"
              label={i18n.m('substance.drugs.ordered.orderedBy.label.none')}
              value="None"
              className="none"
              onUpdate={this.updateOrderedBy}
              onError={this.props.onError}
            />
          </CheckboxGroup>
        </Field>

        <Field title={i18n.t('substance.drugs.ordered.heading.explanation')}
          help={'substance.drugs.ordered.help.explanation'}>
          <Textarea name="Explanation"
            className="explanation"
            {...this.props.Explanation}
            onUpdate={this.updateExplanation}
            onError={this.props.onError}
          />
        </Field>

        <h3>{i18n.t('substance.drugs.ordered.heading.actionTaken')}</h3>
        <Branch name="ActionTaken"
          className="action-taken"
          help={'substance.drugs.ordered.help.actionTaken'}
          value={this.props.ActionTaken}
          onError={this.props.onError}
          onUpdate={this.updateActionTaken}>
        </Branch>

        <Show when={this.props.ActionTaken === 'No'}>
          <Field title={i18n.t('substance.drugs.ordered.heading.noActionTakenExplanation')}
            titleSize="h4"
            help={'substance.drugs.ordered.help.noActionTakenExplanation'}>
            <Textarea name="NoActionTakenExplanation"
              className="no-action-taken-explanation"
              {...this.props.NoActionTakenExplanation}
              onUpdate={this.updateNoActionTakenExplanation}
              onError={this.props.onError}
            />
          </Field>
        </Show>

        <Show when={this.props.ActionTaken === 'Yes'}>
          <div>
            <Field title={i18n.t('substance.drugs.ordered.heading.drugType')}
              className="drug-type-ordered"
              help={'substance.drugs.ordered.help.drugType'}>
              <DrugType name="DrugType"
                {...this.props.DrugType}
                onUpdate={this.updateDrugType}
                onError={this.props.onError}
              />
            </Field>

            <Field title={i18n.t('substance.drugs.ordered.heading.treatmentProvider')}
              help={'substance.drugs.ordered.help.treatmentProvider'}>
              <Text name="TreatmentProvider"
                className="treatment-provider"
                {...this.props.TreatmentProvider}
                onUpdate={this.updateTreatmentProvider}
                onError={this.props.onError}
              />
            </Field>

            <Field title={i18n.t('substance.drugs.ordered.heading.treatmentProviderAddress')}
              help={'substance.drugs.ordered.help.treatmentProviderAddress'}>
              <Address name="TreatmentProviderAddress"
                className="treatment-provider-address"
                {...this.props.TreatmentProviderAddress}
                onUpdate={this.updateTreatmentProviderAddress}
                onError={this.props.onError}
              />
            </Field>
            <Field title={i18n.t('substance.drugs.ordered.heading.treatmentProviderTelephone')}
              className="treatment-provider-telephone"
              help={'substance.drugs.ordered.help.treatmentProviderTelephone'}>
              <Telephone name="TreatmentProviderTelephone"
                {...this.props.TreatmentProviderTelephone}
                onUpdate={this.updateTreatmentProviderTelephone}
                onError={this.props.onError}
              />
            </Field>

            <Field title={i18n.t('substance.drugs.ordered.heading.treatmentDates')}
              adjustFor="daterange"
              help={'substance.drugs.ordered.help.treatmentDates'}>
              <DateRange name="TreatmentDates"
                className="treatment-dates"
                {...this.props.TreatmentDates}
                onUpdate={this.updateTreatmentDates}
                onError={this.props.onError}
              />
            </Field>

            <h3>{i18n.t('substance.drugs.ordered.heading.treatmentCompleted')}</h3>
            <Branch name="TreatmentCompleted"
              className="treatment-completed"
              help={'substance.drugs.ordered.help.treatmentCompleted'}
              value={this.props.TreatmentCompleted}
              onError={this.props.onError}
              onUpdate={this.updateTreatmentCompleted}>
            </Branch>

            <Show when={this.props.TreatmentCompleted === 'No'}>
              <Field title={i18n.t('substance.drugs.ordered.heading.noTreatmentExplanation')}
                titleSize="h4"
                help={'substance.drugs.ordered.help.noTreatmentExplanation'}>
                <Textarea name="NoTreatmentExplanation"
                  className="no-treatment-explanation"
                  {...this.props.NoTreatmentExplanation}
                  onUpdate={this.updateNoTreatmentExplanation}
                  onError={this.props.onError}
                />
              </Field>

            </Show>
          </div>
        </Show>
      </div>
    )
  }
}

OrderedTreatment.defaultProps = {
  OrderedBy: [],
  onError: (value, arr) => { return arr }
}
