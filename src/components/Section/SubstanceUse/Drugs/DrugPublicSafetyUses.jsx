import React from 'react'
import { i18n } from '../../../../config'
import SubsectionElement from '../../SubsectionElement'
import { Accordion, Branch, Show } from '../../../Form'
import { Summary, DateSummary } from '../../../Summary'
import DrugPublicSafetyUse from './DrugPublicSafetyUse'
import { DrugPublicSafetyUsesValidator } from '../../../../validators'

export default class DrugPublicSafetyUses extends SubsectionElement {
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
    const o = (item || {}).DrugPublicSafetyUse || {}
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
      <div className="drug-public-safety-uses">
        <Branch name="UsedDrugs"
                label={i18n.m('substance.drugs.heading.drugPublicSafetyUses')}
                labelSize="h2"
                className="used-drugs"
                value={this.props.UsedDrugs}
                warning={true}
                onError={this.handleError}
                required={this.props.required}
                onUpdate={this.updateUsedDrugs}
                scrollIntoView={this.props.scrollIntoView}>
        </Branch>

        <Show when={this.props.UsedDrugs === 'Yes'}>
          <Accordion defaultState={this.props.defaultState}
                     items={this.props.List}
                     scrollToBottom={this.props.scrollToBottom}
                     branch={this.props.ListBranch}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     description={i18n.t('substance.drugs.publicSafety.collection.description')}
                     appendTitle={i18n.t('substance.drugs.publicSafety.collection.appendTitle')}
                     appendLabel={i18n.t('substance.drugs.publicSafety.collection.appendLabel')}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}>
            <DrugPublicSafetyUse name="DrugPublicSafetyUse" bind={true} required={this.props.required} scrollIntoView={this.props.scrollIntoView} />
          </Accordion>
        </Show>
      </div>
    )
  }
}

DrugPublicSafetyUses.defaultProps = {
  List: [],
  ListBranch: '',
  onError: (value, arr) => { return arr },
  section: 'substance',
  subsection: 'drugs/publicsafety',
  dispatch: () => {},
  validator: (state, props) => {
    return new DrugPublicSafetyUsesValidator(props).isValid()
  },
  scrollToBottom: ''
}
