import React from 'react'
import { i18n } from '../../../../config'
import { AlcoholNegativeImpactsValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Accordion, Branch, Show } from '../../../Form'
import NegativeImpact from './NegativeImpact'
import { DateSummary } from '../../../Summary'

export default class NegativeImpacts extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateHasImpacts = this.updateHasImpacts.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (updateValues) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        HasImpacts: this.props.HasImpacts,
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

  updateHasImpacts (values) {
    this.update({
      HasImpacts: values,
      List: values === 'Yes' ? this.props.List : [],
      ListBranch: values === 'Yes' ? this.props.ListBranch : ''
    })
  }

  summary (item, index) {
    const o = (item || {}).NegativeImpact || {}
    const occurred = DateSummary(o.Occurred)
    const type = i18n.t('substance.alcohol.negativeImpact.collection.itemType')

    return (
      <span className="content">
        <span className="index">{type} {index + 1}:</span>
        <span className="occurred">
          <strong>
            {occurred || i18n.t('substance.alcohol.negativeImpact.collection.summary')}
          </strong>
        </span>
      </span>
    )
  }

  render () {
    return (
      <div className="negative-impacts">
        <h2>{i18n.t('substance.alcohol.heading.negativeImpact')}</h2>
        <Branch name="has_impacts"
                className="has-impacts"
                value={this.props.HasImpacts}
                warning={true}
                onError={this.handleError}
                onUpdate={this.updateHasImpacts}>
        </Branch>

        <Show when={this.props.HasImpacts === 'Yes'}>
          <Accordion minimum="1"
                     defaultState={this.props.defaultState}
                     items={this.props.List}
                     branch={this.props.ListBranch}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     description={i18n.t('substance.alcohol.negativeImpact.collection.description')}
                     appendTitle={i18n.t('substance.alcohol.negativeImpact.collection.appendTitle')}
                     appendLabel={i18n.t('substance.alcohol.negativeImpact.collection.appendLabel')}>
            <NegativeImpact name="NegativeImpact" bind={true} />
          </Accordion>
        </Show>
      </div>
    )
  }
}

NegativeImpacts.defaultProps = {
  List: [],
  ListBranch: '',
  onError: (value, arr) => { return arr },
  section: 'substance',
  subsection: 'alcohol/negative',
  dispatch: () => {},
  validator: (state, props) => {
    return new AlcoholNegativeImpactsValidator(props).isValid()
  }
}
