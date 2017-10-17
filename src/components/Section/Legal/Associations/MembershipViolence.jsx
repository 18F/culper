import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { LegalAssociationsViolenceValidator, ViolenceValidator } from '../../../../validators'
import { Summary, DateSummary } from '../../../Summary'
import { Accordion, Branch, Show } from '../../../Form'
import MembershipViolenceItem from './MembershipViolenceItem'

export default class MembershipViolence extends SubsectionElement {
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
      HasViolence: this.props.HasViolence,
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
      HasViolence: values,
      List: values.value === 'Yes' ? this.props.List : [],
      ListBranch: values.value === 'Yes' ? this.props.ListBranch : ''
    })
  }

  summary (item, index) {
    const o = ((item && item.Item) || {})
    const dates = DateSummary(o.Dates)
    const details = (o.Organization || {}).value || ''

    return Summary({
      type: i18n.t('legal.associations.violence.collection.item'),
      index: index,
      left: details,
      right: dates,
      placeholder: i18n.m('legal.associations.violence.collection.unknown')
    })
  }

  render () {
    return (
      <div className="legal-associations-violence">
        <Branch name="has_violence"
                label={i18n.t('legal.associations.violence.heading.title')}
                labelSize="h2"
                className="legal-associations-violence-has-violence"
                {...this.props.HasViolence}
                warning={true}
                onError={this.handleError}
                required={this.props.required}
                onUpdate={this.updateBranch}
                scrollIntoView={this.props.scrollIntoView}>
        </Branch>

        <Show when={this.props.HasViolence.value === 'Yes'}>
          <Accordion defaultState={this.props.defaultState}
                     items={this.props.List}
                     scrollToBottom={this.props.scrollToBottom}
                     branch={this.props.ListBranch}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     validator={ViolenceValidator}
                     description={i18n.t('legal.associations.violence.collection.description')}
                     appendTitle={i18n.t('legal.associations.violence.collection.appendTitle')}
                     appendLabel={i18n.t('legal.associations.violence.collection.appendLabel')}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}>
                     <MembershipViolenceItem name="Item"
                       bind={true}
                       required={this.props.required}
                       scrollIntoView={this.props.scrollIntoView}
                       addressBooks={this.props.addressBooks}
                       dispatch={this.props.dispatch}
                     />
          </Accordion>
        </Show>
      </div>
    )
  }
}

MembershipViolence.defaultProps = {
  name: 'violence',
  HasViolence: {},
  List: [],
  ListBranch: '',
  defaultState: true,
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'legal',
  subsection: 'associations/membership-violence-or-force',
  addressBooks: {},
  dispatch: (action) => {},
  validator: (state, props) => {
    return validate(schema('legal.associations.membership-violence-or-force', props))
  },
  scrollToBottom: ''
}
