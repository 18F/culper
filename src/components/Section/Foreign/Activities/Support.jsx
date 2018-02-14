import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate from '../../../../validators'
import { ForeignActivitiesSupportValidator, SupportValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion } from '../../../Form'
import SupportItem from './SupportItem'

export default class Support extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateHasForeignSupport = this.updateHasForeignSupport.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      HasForeignSupport: this.props.HasForeignSupport,
      List: this.props.List,
      ...queue
    })
  }

  updateHasForeignSupport (values) {
    this.update({
      HasForeignSupport: values,
      List: values.value === 'Yes' ? this.props.List : []
    })
  }

  updateList (values) {
    this.update({
      List: values
    })
  }

  summary (item, index) {
    const obj = item || {}
    const name = obj.Name || {}
    const display = `${name.first || ''} ${name.middle || ''} ${name.last || ''}`.trim() || i18n.m('foreign.activities.support.collection.summary.unknown')

    return (
      <span>
        <span className="index">{i18n.t('foreign.activities.support.collection.summary.item')} {index + 1}:</span>
        <span><strong>{display}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="foreign-activities-support">
        <Branch name="has_foreign_support"
                label={i18n.t('foreign.activities.support.heading.title')}
                labelSize="h2"
                {...this.props.HasForeignSupport}
                warning={true}
                onUpdate={this.updateHasForeignSupport}
                onError={this.handleError}
                required={this.props.required}
                scrollIntoView={this.props.scrollIntoView}
                />

        <Show when={this.props.HasForeignSupport.value === 'Yes'}>
          <Accordion {...this.props.List}
                     defaultState={this.props.defaultState}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     validator={SupportValidator}
                     summary={this.summary}
                     description={i18n.t('foreign.activities.support.collection.summary.title')}
                     appendTitle={i18n.t('foreign.activities.support.collection.appendTitle')}
                     appendLabel={i18n.t('foreign.activities.support.collection.append')}
                     required={this.props.required}
                     scrollToBottom={this.props.scrollToBottom}
                     scrollIntoView={this.props.scrollIntoView}>
            <SupportItem name="Item"
                         bind={true}
                         dispatch={this.props.dispatch}
                         addressBooks={this.props.addressBooks}
                         required={this.props.required}
                         scrollIntoView={this.props.scrollIntoView}
                         />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Support.defaultProps = {
  name: 'Support',
  HasForeignSupport: {},
  List: {},
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'foreign',
  subsection: 'activities/support',
  addressBooks: {},
  dispatch: () => {},
  validator: (data) => {
    return validate(schema('foreign.activities.support', data))
  },
  defaultState: true
}
