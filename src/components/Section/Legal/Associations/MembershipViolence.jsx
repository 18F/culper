import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import SubsectionElement from '../../SubsectionElement'
import validate, { ViolenceValidator } from '../../../../validators'
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
      HasViolence: this.props.HasViolence,
      ...queue
    })
  }

  updateList (values) {
    this.update({
      List: values
    })
  }

  updateBranch (values) {
    this.update({
      HasViolence: values,
      List: values.value === 'Yes' ? this.props.List : []
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
                     {...this.props.List}
                     scrollToBottom={this.props.scrollToBottom}
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
  List: Accordion.defaultList,
  defaultState: true,
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'legal',
  subsection: 'associations/membership-violence-or-force',
  addressBooks: {},
  dispatch: (action) => {},
  validator: (data) => {
    return validate(schema('legal.associations.membership-violence-or-force', data))
  },
  scrollToBottom: ''
}
