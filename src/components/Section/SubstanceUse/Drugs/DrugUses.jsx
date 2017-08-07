import React from 'react'
import { i18n } from '../../../../config'
import { Summary } from '../../../Summary'
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
    let drug = (o.DrugType || {}).DrugType
    if (drug === 'Other') {
      drug = ((o.DrugType || {}).DrugTypeOther || {}).value
    }

    return Summary({
      type: i18n.t('substance.drugs.use.collection.itemType'),
      index: index,
      left: drug,
      right: null,
      placeholder: i18n.m('substance.drugs.use.collection.summary')
    })
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
                required={this.props.required}
                onUpdate={this.updateUsedDrugs}
                scrollIntoView={this.props.scrollIntoView}>
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
                     appendLabel={i18n.t('substance.drugs.use.collection.appendLabel')}
                     scrollIntoView={this.props.scrollIntoView}>
            <DrugUse name="DrugUse" bind={true} required={this.props.required} scrollIntoView={this.props.scrollIntoView} />
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
