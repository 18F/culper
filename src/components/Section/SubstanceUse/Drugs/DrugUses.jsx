import React from 'react'
import { i18n } from '../../../../config'
import SubsectionElement from '../../SubsectionElement'
import { Accordion, Branch, Show } from '../../../Form'
import DrugUse from './DrugUse'
import { DrugUsesValidator } from '../../../../validators'

export default class DrugUses extends SubsectionElement {
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
    const o = (item || {}).DrugUse || {}
    const type = i18n.t('substance.drugs.use.collection.itemType')
    let drug = (o.DrugType || {}).DrugType
    if (drug === 'Other') {
      drug = ((o.DrugType || {}).DrugTypeOther || {}).value
    }

    if (!drug) {
      drug = i18n.m('substance.drugs.use.collection.summary')
    }

    return (
      <span className="content">
        <span className="index">{type} {index + 1}:</span>
        <span className=""><strong>{drug}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="drug-uses">
        {i18n.m('substance.drugs.para.drugUses')}
        <h2>{i18n.m('substance.drugs.heading.drugUses')}</h2>
        <Branch name="UsedDrugs"
                className="used-drugs"
                value={this.props.UsedDrugs}
                warning={true}
                onError={this.handleError}
                onUpdate={this.updateUsedDrugs}>
          {i18n.m('substance.drugs.use.para.drugUses')}
        </Branch>

        <Show when={this.props.UsedDrugs === 'Yes'}>
          <Accordion defaultState={this.props.defaultState}
                     items={this.props.List}
                     branch={this.props.ListBranch}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     description={i18n.t('substance.drugs.use.collection.description')}
                     appendTitle={i18n.t('substance.drugs.use.collection.appendTitle')}
                     appendLabel={i18n.t('substance.drugs.use.collection.appendLabel')}>
            <DrugUse name="DrugUse" bind={true} />
          </Accordion>
        </Show>
      </div>
    )
  }
}

DrugUses.defaultProps = {
  List: [],
  ListBranch: '',
  onError: (value, arr) => { return arr },
  section: 'substance',
  subsection: 'drugs/usage',
  dispatch: () => {},
  validator: (state, props) => {
    return new DrugUsesValidator(props).isValid()
  }
}
