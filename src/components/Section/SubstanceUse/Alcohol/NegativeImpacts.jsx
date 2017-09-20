import React from 'react'
import { i18n } from '../../../../config'
import schematize from '../../../../schema'
import validate from '../../../../validators'
import { AlcoholNegativeImpactsValidator, NegativeImpactValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Accordion, Branch, Show } from '../../../Form'
import NegativeImpact from './NegativeImpact'
import { Summary, DateSummary } from '../../../Summary'

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
    const o = (item || {}).Item || {}
    const occurred = DateSummary(o.Occurred)

    return Summary({
      type: i18n.t('substance.alcohol.negativeImpact.collection.itemType'),
      index: index,
      left: occurred,
      right: null,
      placeholder: i18n.m('substance.alcohol.negativeImpact.collection.summary')
    })
  }

  render () {
    return (
      <div className="negative-impacts">
        <Branch name="has_impacts"
                label={i18n.t('substance.alcohol.heading.negativeImpact')}
                labelSize="h2"
                className="has-impacts"
                value={this.props.HasImpacts}
                warning={true}
                onError={this.handleError}
                required={this.props.required}
                onUpdate={this.updateHasImpacts}
                scrollIntoView={this.props.scrollIntoView}>
        </Branch>

        <Show when={this.props.HasImpacts === 'Yes'}>
          <Accordion defaultState={this.props.defaultState}
                     items={this.props.List}
                     scrollToBottom={this.props.scrollToBottom}
                     branch={this.props.ListBranch}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     validator={NegativeImpactValidator}
                     description={i18n.t('substance.alcohol.negativeImpact.collection.description')}
                     appendTitle={i18n.t('substance.alcohol.negativeImpact.collection.appendTitle')}
                     appendLabel={i18n.t('substance.alcohol.negativeImpact.collection.appendLabel')}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}>
            <NegativeImpact name="Item" bind={true} required={this.props.required} scrollIntoView={this.props.scrollIntoView} />
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
    return validate(schematize('substance.alcohol.negative', props))
  },
  scrollToBottom: ''
}
