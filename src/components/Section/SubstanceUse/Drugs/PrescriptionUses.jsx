import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import SubsectionElement from '../../SubsectionElement'
import { Accordion, Branch, Show } from '../../../Form'
import { Summary, DateSummary } from '../../../Summary'
import PrescriptionUse from './PrescriptionUse'
import validate, { DrugPrescriptionUseValidator, DrugPrescriptionUse85Validator } from '../../../../validators'

export default class PrescriptionUses extends SubsectionElement {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateMisusedDrugs = this.updateMisusedDrugs.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update(updateValues) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        MisusedDrugs: this.props.MisusedDrugs,
        List: this.props.List,
        ...updateValues
      })
    }
  }

  updateList(values) {
    this.update({
      List: values
    })
  }

  updateMisusedDrugs(values) {
    this.update({
      MisusedDrugs: values,
      List: values.value === 'Yes' ? this.props.List : []
    })
  }

  summary(item, index) {
    const o = (item || {}).Item || {}
    const range = DateSummary(o.InvolvementDates)
    const name = (o.PrescriptionName || {}).value

    return Summary({
      type: i18n.t('substance.drugs.prescription.collection.itemType'),
      index: index,
      left: name,
      right: range,
      placeholder: i18n.t('substance.drugs.prescription.collection.summary')
    })
  }

  render() {
    const { formType } = this.props
    return (
      <div
        className="section-content prescription-uses"
        {...super.dataAttributes(this.props)}>
        <h1 className="section-header">{i18n.t('substance.destination.drugs.misuse')}</h1>
        <Branch
          name="Misused"
          label={{
            85: i18n.t('substance.85.drugs.heading.prescriptionUses'),
            86: i18n.t('substance.drugs.heading.prescriptionUses')
          }[formType]}
          labelSize="h4"
          className="misused"
          {...this.props.MisusedDrugs}
          warning={true}
          onError={this.handleError}
          required={this.props.required}
          onUpdate={this.updateMisusedDrugs}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={this.props.MisusedDrugs.value === 'Yes'}>
          <Accordion
            defaultState={this.props.defaultState}
            {...this.props.List}
            scrollToBottom={this.props.scrollToBottom}
            summary={this.summary}
            onUpdate={this.updateList}
            onError={this.handleError}
            validator={{
              85: DrugPrescriptionUse85Validator,
              86: DrugPrescriptionUseValidator
            }[formType]}
            description={i18n.t(
              'substance.drugs.prescription.collection.description'
            )}
            appendTitle={{
              85: i18n.t('substance.85.drugs.prescription.collection.appendTitle'),
              86: i18n.t('substance.drugs.prescription.collection.appendTitle')
            }[formType]}
            appendLabel={i18n.t(
              'substance.drugs.prescription.collection.appendLabel'
            )}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}>
            <PrescriptionUse
              name="Item"
              bind={true}
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}
              formType={formType}
            />
          </Accordion>
        </Show>
      </div>
    )
  }
}

PrescriptionUses.defaultProps = {
  MisusedDrugs: {},
  List: { items: [], branch: {} },
  onError: (value, arr) => {
    return arr
  },
  section: 'substance',
  subsection: 'drugs/misuse',
  dispatch: () => {},
  validator: data => {
    return validate(schema('substance.drugs.misuse', data))
  },
  scrollToBottom: ''
}
