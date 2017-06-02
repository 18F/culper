import React from 'react'
import { i18n } from '../../../../config'
import SubsectionElement from '../../SubsectionElement'
import { Accordion, Branch, Show } from '../../../Form'
import { DateSummary } from '../../../Summary'
import DrugUse from './DrugUse'
import { DrugInvolvementsValidator } from '../../../../validators'

export default class DrugInvolvements extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateInvolved = this.updateInvolved.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (updateValues) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        Involved: this.props.Involved,
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

  updateInvolved (values) {
    this.update({Involved: values})
  }

  summary (item, index) {
    const o = (item || {}).DrugUse || {}
    const firstUse = DateSummary(o.FirstUse)
    const recentUse = DateSummary(o.RecentUse)
    const dates = [firstUse, recentUse].reduce((p, c) => {
      if (p || c) {
        return `${p || 'N/A'} - ${c || 'N/A'}`
      }
      return p
    })
    const type = i18n.t('substance.drugs.involvement.collection.itemType')

    return (
      <span className="content">
        <span className="index">{type} {index + 1}:</span>
        <span className="occurred">
          <strong>
            {dates || i18n.t('substance.drugs.involvement.collection.summary')}
          </strong>
        </span>
      </span>
    )
  }

  render () {
    return (
      <div className="drug-uses">
        <h2>{i18n.m('substance.drugs.heading.drugUses')}</h2>
        <Branch name="Involved"
          className="used-drugs"
          value={this.props.Involved}
          onError={this.handleError}
          onUpdate={this.updateInvolved}>
        </Branch>

        <Show when={this.props.Involved === 'Yes'}>
          <Accordion minimum="1"
            defaultState={this.props.defaultState}
            items={this.props.List}
            branch={this.props.ListBranch}
            summary={this.summary}
            onUpdate={this.updateList}
            onError={this.handleError}
            description={i18n.t('substance.drugs.involvement.collection.description')}
            appendTitle={i18n.t('substance.drugs.involvement.collection.appendTitle')}
            appendLabel={i18n.t('substance.drugs.involvement.collection.appendLabel')}>
            <DrugUse name="DrugUse" bind={true} />
          </Accordion>
        </Show>
      </div>
    )
  }
}

DrugInvolvements.defaultProps = {
  List: [],
  ListBranch: '',
  onError: (value, arr) => { return arr },
  section: 'substance',
  subsection: 'drugs/involvement',
  dispatch: () => {},
  validator: (state, props) => {
    return new DrugInvolvementsValidator(props).isValid()
  }
}
