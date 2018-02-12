import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate, { DrugClearanceUseValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Accordion, Branch, Show } from '../../../Form'
import { Summary, DateSummary } from '../../../Summary'
import DrugClearanceUse from './DrugClearanceUse'

export default class DrugClearanceUses extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateUsedDrugs = this.updateUsedDrugs.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (updateValues) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        UsedDrugs: this.props.UsedDrugs,
        List: this.props.List,
        ...updateValues
      })
    }
  }

  updateList (values) {
    this.update({
      List: values
    })
  }

  updateUsedDrugs (values) {
    this.update({
      UsedDrugs: values,
      List: values.value === 'Yes' ? this.props.List : []
    })
  }

  summary (item, index) {
    const o = (item || {}).Item || {}
    const range = DateSummary(o.InvolvementDates)
    const description = (o.Description || {}).value

    return Summary({
      type: i18n.t('substance.drugs.clearance.collection.itemType'),
      index: index,
      left: description,
      right: range,
      placeholder: i18n.m('substance.drugs.clearance.collection.summary')
    })
  }

  render () {
    return (
      <div className="drug-clearance-uses">
        <Branch name="UsedDrugs"
                label={i18n.t('substance.drugs.heading.drugClearanceUses')}
                labelSize="h2"
                className="used-drugs"
                {...this.props.UsedDrugs}
                warning={true}
                onError={this.handleError}
                required={this.props.required}
                onUpdate={this.updateUsedDrugs}
                scrollIntoView={this.props.scrollIntoView}>
        </Branch>

        <Show when={this.props.UsedDrugs.value === 'Yes'}>
          <Accordion defaultState={this.props.defaultState}
                     {...this.props.List}
                     scrollToBottom={this.props.scrollToBottom}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     validator={DrugClearanceUseValidator}
                     description={i18n.t('substance.drugs.clearance.collection.description')}
                     appendTitle={i18n.t('substance.drugs.clearance.collection.appendTitle')}
                     appendLabel={i18n.t('substance.drugs.clearance.collection.appendLabel')}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}>
            <DrugClearanceUse name="Item"
                              bind={true}
                              required={this.props.required}
                              scrollIntoView={this.props.scrollIntoView} />
          </Accordion>
        </Show>
      </div>
    )
  }
}

DrugClearanceUses.defaultProps = {
  UsedDrugs: {},
  List: { items: [], branch: {} },
  onError: (value, arr) => { return arr },
  section: 'substance',
  subsection: 'drugs/clearance',
  dispatch: () => {},
  validator: (data) => {
    return validate(schema('substance.drug.clearance', data))
  },
  scrollToBottom: ''
}
