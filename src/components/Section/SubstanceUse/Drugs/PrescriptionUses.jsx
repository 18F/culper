import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import SubsectionElement from '../../SubsectionElement'
import { Accordion, Branch, Show } from '../../../Form'
import { Summary, DateSummary } from '../../../Summary'
import PrescriptionUse from './PrescriptionUse'
import validate, { DrugPrescriptionUseValidator } from '../../../../validators'

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
    return (
      <div
        className="section-content prescription-uses"
        {...super.dataAttributes(this.props)}>
        <h1 className="section-header">Misuse</h1>
        <Branch
          name="Misused"
          label={i18n.t('substance.drugs.heading.prescriptionUses')}
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
            validator={DrugPrescriptionUseValidator}
            description={i18n.t(
              'substance.drugs.prescription.collection.description'
            )}
            appendTitle={i18n.t(
              'substance.drugs.prescription.collection.appendTitle'
            )}
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
