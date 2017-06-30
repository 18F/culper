import React from 'react'
import { i18n } from '../../../../config'
import SubsectionElement from '../../SubsectionElement'
import { Accordion, Branch, Show } from '../../../Form'
import { DateSummary } from '../../../Summary'
import DrugClearanceUse from './DrugClearanceUse'
import { DrugClearanceUsesValidator } from '../../../../validators'

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

  updateUsedDrugs (values) {
    this.update({
      UsedDrugs: values,
      List: values === 'Yes' ? this.props.List : [],
      ListBranch: values === 'Yes' ? this.props.ListBranch : ''
    })
  }

  summary (item, index) {
    const o = (item || {}).DrugClearanceUse || {}
    const range = DateSummary(o.InvolvementDates)
    const description = (o.Description || {}).value
    const type = i18n.t('substance.drugs.clearance.collection.itemType')

    return (
      <span className="content">
        <span className="index">{type} {index + 1}:</span>
        <span className="occurred">
          <strong>
            {description || i18n.t('substance.drugs.clearance.collection.summary')}
          </strong>
        </span>
        <span className="dates">
          <strong>{range}</strong>
        </span>
      </span>
    )
  }

  render () {
    return (
      <div className="drug-clearance-uses">
        <h2>{i18n.m('substance.drugs.heading.drugClearanceUses')}</h2>
        <Branch name="UsedDrugs"
                className="used-drugs"
                value={this.props.UsedDrugs}
                warning={true}
                onError={this.handleError}
                onUpdate={this.updateUsedDrugs}>
        </Branch>

        <Show when={this.props.UsedDrugs === 'Yes'}>
          <Accordion minimum="1"
                     defaultState={this.props.defaultState}
                     items={this.props.List}
                     branch={this.props.ListBranch}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     description={i18n.t('substance.drugs.clearance.collection.description')}
                     appendTitle={i18n.t('substance.drugs.clearance.collection.appendTitle')}
                     appendLabel={i18n.t('substance.drugs.clearance.collection.appendLabel')}>
            <DrugClearanceUse name="DrugClearanceUse" bind={true} />
          </Accordion>
        </Show>
      </div>
    )
  }
}

DrugClearanceUses.defaultProps = {
  List: [],
  ListBranch: '',
  onError: (value, arr) => { return arr },
  section: 'substance',
  subsection: 'drugs/clearance',
  dispatch: () => {},
  validator: (state, props) => {
    return new DrugClearanceUsesValidator(props).isValid()
  }
}
