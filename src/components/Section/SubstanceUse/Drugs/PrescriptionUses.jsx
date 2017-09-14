import React from 'react'
import { i18n } from '../../../../config'
import SubsectionElement from '../../SubsectionElement'
import { Accordion, Branch, Show } from '../../../Form'
import { Summary, DateSummary } from '../../../Summary'
import PrescriptionUse from './PrescriptionUse'
import { DrugPrescriptionUsesValidator, DrugPrescriptionUseValidator } from '../../../../validators'

export default class PrescriptionUses extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateMisusedDrugs = this.updateMisusedDrugs.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (updateValues) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        MisusedDrugs: this.props.MisusedDrugs,
        List: this.props.List,
        ListBranch: this.props.ListBranch,
        ...updateValues
      })
    }
  }

  updateList (values) {
    this.update({
      List: values.items,
      ListBranch: values.branch
    })
  }

  updateMisusedDrugs (values) {
    this.update({
      MisusedDrugs: values,
      List: values === 'Yes' ? this.props.List : [],
      ListBranch: values === 'Yes' ? this.props.ListBranch : ''
    })
  }

  summary (item, index) {
    const o = (item || {}).Item || {}
    const range = DateSummary(o.InvolvementDates)
    const name = (o.PrescriptionName || {}).value

    return Summary({
      type: i18n.t('substance.drugs.prescription.collection.itemType'),
      index: index,
      left: name,
      right: range,
      placeholder: i18n.m('substance.drugs.prescription.collection.summary')
    })
  }

  render () {
    return (
      <div className="prescription-uses">
        <h2>{i18n.m('substance.drugs.heading.prescriptionUses')}</h2>
        <Branch name="Misused"
                className="misused"
                value={this.props.MisusedDrugs}
                warning={true}
                onError={this.handleError}
                required={this.props.required}
                onUpdate={this.updateMisusedDrugs}
                scrollIntoView={this.props.scrollIntoView}>
        </Branch>

        <Show when={this.props.MisusedDrugs === 'Yes'}>
          <Accordion defaultState={this.props.defaultState}
                     items={this.props.List}
                     scrollToBottom={this.props.scrollToBottom}
                     branch={this.props.ListBranch}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     validator={DrugPrescriptionUseValidator}
                     description={i18n.t('substance.drugs.prescription.collection.description')}
                     appendTitle={i18n.t('substance.drugs.prescription.collection.appendTitle')}
                     appendLabel={i18n.t('substance.drugs.prescription.collection.appendLabel')}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}>
            <PrescriptionUse name="Item" bind={true} required={this.props.required} scrollIntoView={this.props.scrollIntoView} />
          </Accordion>
        </Show>
      </div>
    )
  }
}

PrescriptionUses.defaultProps = {
  List: [],
  ListBranch: '',
  onError: (value, arr) => { return arr },
  section: 'substance',
  subsection: 'drugs/misuse',
  dispatch: () => {},
  validator: (state, props) => {
    return new DrugPrescriptionUsesValidator(props).isValid()
  },
  scrollToBottom: ''
}
