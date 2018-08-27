import React from 'react'
import { i18n } from '../../../../config'
import {
  Field,
  ValidationElement,
  Checkbox,
  Location,
  CheckboxGroup,
  Branch,
  Text,
  Textarea,
  DateRange,
  Telephone,
  Show
} from '../../../Form'
import DrugType from './DrugType'

export default class OrderedTreatment extends ValidationElement {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateOrderedBy = this.updateOrderedBy.bind(this)
    this.updateExplanation = this.updateExplanation.bind(this)
    this.updateActionTaken = this.updateActionTaken.bind(this)
    this.updateNoActionTakenExplanation = this.updateNoActionTakenExplanation.bind(
      this
    )

    // If action taken
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

  updateOrderedBy(cb) {
    let selected = cb.value
    let list = [...((this.props.OrderedBy || {}).values || [])]

    if (list.includes(selected)) {
      list.splice(list.indexOf(selected), 1)
    } else {
      list.push(selected)
    }

    this.update({ OrderedBy: { values: list } })
  }

  updateExplanation(values) {
    this.update({ Explanation: values })
  }

  updateActionTaken(values) {
    this.update({ ActionTaken: values })
  }

  updateNoActionTakenExplanation(values) {
    this.update({ NoActionTakenExplanation: values })
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
      <div className="drug-ordered-treatment">
        <Field
          title={i18n.t('substance.drugs.ordered.heading.orderedBy')}
          scrollIntoView={this.props.scrollIntoView}>
          {i18n.m('substance.drugs.ordered.para.orderedBy')}
          <CheckboxGroup
            className="ordered-by"
            required={this.props.required}
            onError={this.props.onError}
            selectedValues={(this.props.OrderedBy || {}).values}>
            <Checkbox
              name="Employer"
              label={i18n.m('substance.drugs.ordered.orderedBy.label.employer')}
              value="Employer"
              className="employer"
              onUpdate={this.updateOrderedBy}
              onError={this.props.onError}
            />
            <Checkbox
              name="MedicalProfessional"
              label={i18n.m(
                'substance.drugs.ordered.orderedBy.label.medicalProfessional'
              )}
              value="MedicalProfessional"
              className="medical-professional"
              onUpdate={this.updateOrderedBy}
              onError={this.props.onError}
            />
            <Checkbox
              name="MentalHealthProfessional"
              label={i18n.m(
                'substance.drugs.ordered.orderedBy.label.mentalHealthProfessional'
              )}
              value="MentalHealthProfessional"
              className="mental-health-professional"
              onUpdate={this.updateOrderedBy}
              onError={this.props.onError}
            />
            <Checkbox
              name="Judge"
              label={i18n.m('substance.drugs.ordered.orderedBy.label.judge')}
              value="Judge"
              className="judge"
              onUpdate={this.updateOrderedBy}
              onError={this.props.onError}
            />
            <Checkbox
              name="None"
              label={i18n.m('substance.drugs.ordered.orderedBy.label.none')}
              value="None"
              className="none"
              onUpdate={this.updateOrderedBy}
              onError={this.props.onError}
            />
          </CheckboxGroup>
        </Field>

        <Field
          title={i18n.t('substance.drugs.ordered.heading.explanation')}
          scrollIntoView={this.props.scrollIntoView}>
          <Textarea
            name="Explanation"
            className="explanation"
            {...this.props.Explanation}
            onUpdate={this.updateExplanation}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Branch
          name="ActionTaken"
          label={i18n.t('substance.drugs.ordered.heading.actionTaken')}
          labelSize="h3"
          className="action-taken no-margin-bottom"
          {...this.props.ActionTaken}
          onError={this.props.onError}
          required={this.props.required}
          onUpdate={this.updateActionTaken}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={this.props.ActionTaken.value === 'No'}>
          <Field
            title={i18n.t(
              'substance.drugs.ordered.heading.noActionTakenExplanation'
            )}
            titleSize="label"
            scrollIntoView={this.props.scrollIntoView}>
            <Textarea
              name="NoActionTakenExplanation"
              className="no-action-taken-explanation"
              {...this.props.NoActionTakenExplanation}
              onUpdate={this.updateNoActionTakenExplanation}
              onError={this.props.onError}
              required={this.props.required}
            />
          </Field>
        </Show>

        <Show when={this.props.ActionTaken.value === 'Yes'}>
          <div>
            <Field
              title={i18n.t('substance.drugs.ordered.heading.drugType')}
              className="drug-type-ordered"
              scrollIntoView={this.props.scrollIntoView}>
              <DrugType
                name="DrugType"
                {...this.props.DrugType}
                onUpdate={this.updateDrugType}
                onError={this.props.onError}
                required={this.props.required}
                scrollIntoView={this.props.scrollIntoView}
              />
            </Field>

            <Field
              title={i18n.t(
                'substance.drugs.ordered.heading.treatmentProvider'
              )}
              scrollIntoView={this.props.scrollIntoView}>
              {i18n.m('substance.drugs.ordered.para.treatmentProvider')}
              <Text
                name="TreatmentProvider"
                className="treatment-provider"
                {...this.props.TreatmentProvider}
                onUpdate={this.updateTreatmentProvider}
                onError={this.props.onError}
                required={this.props.required}
              />
            </Field>

            <Field
              title={i18n.t(
                'substance.drugs.ordered.heading.treatmentProviderAddress'
              )}
              optional={true}
              adjustFor="address"
              help={'substance.drugs.ordered.help.treatmentProviderAddress'}
              scrollIntoView={this.props.scrollIntoView}>
              <Location
                name="TreatmentProviderAddress"
                className="treatment-provider-address"
                {...this.props.TreatmentProviderAddress}
                layout={Location.ADDRESS}
                geocode={true}
                addressBooks={this.props.addressBooks}
                addressBook="Provider"
                dispatch={this.props.dispatch}
                onUpdate={this.updateTreatmentProviderAddress}
                onError={this.props.onError}
                required={this.props.required}
              />
            </Field>

            <Field
              title={i18n.t(
                'substance.drugs.ordered.heading.treatmentProviderTelephone'
              )}
              className="treatment-provider-telephone override-required"
              help={'substance.drugs.ordered.help.treatmentProviderTelephone'}
              adjustFor="telephone"
              scrollIntoView={this.props.scrollIntoView}>
              <Telephone
                name="TreatmentProviderTelephone"
                {...this.props.TreatmentProviderTelephone}
                showNumberType={false}
                onUpdate={this.updateTreatmentProviderTelephone}
                onError={this.props.onError}
                required={this.props.required}
              />
            </Field>

            <Field
              title={i18n.t('substance.drugs.ordered.heading.treatmentDates')}
              adjustFor="daterange"
              help={'substance.drugs.ordered.help.treatmentDates'}
              scrollIntoView={this.props.scrollIntoView}>
              <DateRange
                name="TreatmentDates"
                className="treatment-dates"
                {...this.props.TreatmentDates}
                onUpdate={this.updateTreatmentDates}
                onError={this.props.onError}
                required={this.props.required}
              />
            </Field>

            <Branch
              name="TreatmentCompleted"
              label={i18n.t(
                'substance.drugs.ordered.heading.treatmentCompleted'
              )}
              labelSize="h3"
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
                  'substance.drugs.ordered.heading.noTreatmentExplanation'
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
        </Show>
      </div>
    )
  }
}

OrderedTreatment.defaultProps = {
  ActionTaken: {},
  TreatmentCompleted: {},
  OrderedBy: [],
  addressBooks: {},
  dispatch: action => {},
  onError: (value, arr) => {
    return arr
  }
}
