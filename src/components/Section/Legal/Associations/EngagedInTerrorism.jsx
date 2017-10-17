import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { LegalAssociationsEngagedValidator, EngagedValidator } from '../../../../validators'
import { Summary, DateSummary } from '../../../Summary'
import { Accordion, Branch, Show } from '../../../Form'
import EngagedInTerrorismItem from './EngagedInTerrorismItem'

export default class EngagedInTerrorism extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateBranch = this.updateBranch.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      List: this.props.List,
      ListBranch: this.props.ListBranch,
      HasEngaged: this.props.HasEngaged,
      ...queue
    })
  }

  updateList (values) {
    this.update({
      List: values.items,
      ListBranch: values.branch
    })
  }

  updateBranch (values) {
    this.update({
      HasEngaged: values,
      List: values.value === 'Yes' ? this.props.List : [],
      ListBranch: values.value === 'Yes' ? this.props.ListBranch : ''
    })
  }

  summary (item, index) {
    const o = ((item && item.Item) || {})
    const dates = DateSummary(o.Dates)
    const details = (o.Reasons || {}).value || ''

    return Summary({
      type: i18n.t('legal.associations.engaged.collection.item'),
      index: index,
      left: details,
      right: dates,
      placeholder: i18n.m('legal.associations.engaged.collection.unknown')
    })
  }

  render () {
    return (
      <div className="legal-associations-engaged">
        <Branch name="has_engaged"
                label={i18n.t('legal.associations.engaged.heading.title')}
                labelSize="h2"
                className="legal-associations-engaged-has-engaged"
                {...this.props.HasEngaged}
                warning={true}
                onError={this.handleError}
                required={this.props.required}
                onUpdate={this.updateBranch}
                scrollIntoView={this.props.scrollIntoView}>
        </Branch>

        <Show when={this.props.HasEngaged.value === 'Yes'}>
          <Accordion defaultState={this.props.defaultState}
                     items={this.props.List}
                     scrollToBottom={this.props.scrollToBottom}
                     branch={this.props.ListBranch}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     validator={EngagedValidator}
                     description={i18n.t('legal.associations.engaged.collection.description')}
                     appendTitle={i18n.t('legal.associations.engaged.collection.appendTitle')}
                     appendLabel={i18n.t('legal.associations.engaged.collection.appendLabel')}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}>
                     <EngagedInTerrorismItem name="Item"
                       bind={true}
                       required={this.props.required}
                       scrollIntoView={this.props.scrollIntoView}
                     />
          </Accordion>
        </Show>
      </div>
    )
  }
}

EngagedInTerrorism.defaultProps = {
  name: 'engaged',
  HasEngaged: {},
  List: [],
  ListBranch: '',
  defaultState: true,
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'legal',
  subsection: 'associations/engaged-in-terrorism',
  dispatch: () => {},
  validator: (state, props) => {
    return validate(schema('legal.associations.engaged-in-terrorism', props))
  },
  scrollToBottom: ''
}
