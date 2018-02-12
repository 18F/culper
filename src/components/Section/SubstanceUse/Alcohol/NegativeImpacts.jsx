import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate, { AlcoholNegativeImpactsValidator, NegativeImpactValidator } from '../../../../validators'
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
        ...updateValues
      })
    }
  }

  updateList (values) {
    this.update({
      List: values
    })
  }

  updateHasImpacts (values) {
    this.update({
      HasImpacts: values,
      List: values.value === 'Yes' ? this.props.List : []
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
                {...this.props.HasImpacts}
                warning={true}
                onError={this.handleError}
                required={this.props.required}
                onUpdate={this.updateHasImpacts}
                scrollIntoView={this.props.scrollIntoView}>
        </Branch>

        <Show when={this.props.HasImpacts.value === 'Yes'}>
          <Accordion defaultState={this.props.defaultState}
                     {...this.props.List}
                     scrollToBottom={this.props.scrollToBottom}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     validator={NegativeImpactValidator}
                     description={i18n.t('substance.alcohol.negativeImpact.collection.description')}
                     appendTitle={i18n.t('substance.alcohol.negativeImpact.collection.appendTitle')}
                     appendLabel={i18n.t('substance.alcohol.negativeImpact.collection.appendLabel')}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}>
            <NegativeImpact name="Item"
                            bind={true}
                            required={this.props.required}
                            scrollIntoView={this.props.scrollIntoView} />
          </Accordion>
        </Show>
      </div>
    )
  }
}

NegativeImpacts.defaultProps = {
  HasImpacts: {},
  List: Accordion.defaultList,
  onError: (value, arr) => { return arr },
  section: 'substance',
  subsection: 'alcohol/negative',
  dispatch: () => {},
  validator: (data) => {
    return validate(schema('substance.alcohol.negative', data))
  },
  scrollToBottom: ''
}
