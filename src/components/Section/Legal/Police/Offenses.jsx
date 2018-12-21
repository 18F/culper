import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate, { OffenseValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion } from '../../../Form'
import { Summary, DateSummary } from '../../../Summary'
import Offense from './Offense'

export default class Offenses extends SubsectionElement {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateHasOffenses = this.updateHasOffenses.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      List: this.props.List,
      HasOffenses: this.props.HasOffenses,
      ...queue
    })
  }

  updateHasOffenses(values) {
    this.update({
      HasOffenses: values,
      List: values.value === 'Yes' ? this.props.List : []
    })
  }

  updateList(values) {
    this.update({
      List: values
    })
  }

  /**
   * Assists in rendering the summary section.
   */
  summary(item, index) {
    const o = (item || {}).Item || {}
    const dates = DateSummary(o.Date)
    const description =
      o.Description && o.Description.value ? o.Description.value : ''

    return Summary({
      type: i18n.t('legal.police.collection.summary.item'),
      index: index,
      left: description,
      right: dates,
      placeholder: i18n.t('legal.police.collection.summary.unknown')
    })
  }

  render() {
    return (
      <div
        className="section-content police-offenses"
        {...super.dataAttributes(this.props)}>
        <h1 className="section-header">Offenses</h1>
        <Branch
          name="has_offenses"
          label={i18n.t('legal.police.heading.questions')}
          labelSize="h4"
          className="has-offenses"
          {...this.props.HasOffenses}
          warning={true}
          onUpdate={this.updateHasOffenses}
          required={this.props.required}
          onError={this.handleError}
          scrollIntoView={this.props.scrollIntoView}>
          <ul>
            <li>{i18n.m('legal.police.label.summons')}</li>
            <li>{i18n.m('legal.police.label.arrests')}</li>
            <li>{i18n.m('legal.police.label.charges')}</li>
            <li>{i18n.m('legal.police.label.probation')}</li>
            <li>{i18n.m('legal.police.label.trial')}</li>
          </ul>
        </Branch>
        <Show when={this.props.HasOffenses.value === 'Yes'}>
          <div>
            <Accordion
              {...this.props.List}
              defaultState={this.props.defaultState}
              scrollToBottom={this.props.scrollToBottom}
              onUpdate={this.updateList}
              onError={this.handleError}
              validator={OffenseValidator}
              summary={this.summary}
              description={i18n.t('legal.police.collection.summary.title')}
              appendTitle={i18n.t('legal.police.collection.appendTitle')}
              appendMessage={i18n.m('legal.police.collection.appendMessage')}
              appendLabel={i18n.t('legal.police.collection.append')}
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}>
              <Offense
                name="Item"
                addressBooks={this.props.addressBooks}
                dispatch={this.props.dispatch}
                bind={true}
                required={this.props.required}
                scrollIntoView={this.props.scrollIntoView}
              />
            </Accordion>
          </div>
        </Show>
      </div>
    )
  }
}

Offenses.defaultProps = {
  List: Accordion.defaultList,
  HasOffenses: {},
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  },
  section: 'legal',
  subsection: 'police/offenses',
  addressBooks: {},
  dispatch: action => {},
  validator: data => {
    return validate(schema('legal.police.offenses', data))
  },
  defaultState: true,
  scrollToBottom: ''
}
