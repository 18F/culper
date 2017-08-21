import React from 'react'
import { i18n } from '../../../../config'
import { PoliceOffensesValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion } from '../../../Form'
import { Summary, DateSummary } from '../../../Summary'
import Offense from './Offense'

export default class Offenses extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateHasOffenses = this.updateHasOffenses.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      List: this.props.List,
      ListBranch: this.props.ListBranch,
      HasOffenses: this.props.HasOffenses,
      ...queue
    })
  }

  updateHasOffenses (value, event) {
    this.update({
      HasOffenses: value,
      List: value === 'Yes' ? this.props.List : [],
      ListBranch: value === 'Yes' ? this.props.ListBranch : ''
    })
  }

  updateList (values) {
    this.update({
      List: values.items,
      ListBranch: values.branch
    })
  }

  /**
   * Assists in rendering the summary section.
   */
  summary (item, index) {
    const o = (item || {}).Item || {}
    const dates = DateSummary(o.Date)
    const description = o.Description && o.Description.value ? o.Description.value : ''

    return Summary({
      type: i18n.t('legal.police.collection.summary.item'),
      index: index,
      left: description,
      right: dates,
      placeholder: i18n.m('legal.police.collection.summary.unknown')
    })
  }

  render () {
    return (
      <div className="police-offenses">
        <h2>{i18n.t('legal.police.heading.questions')}</h2>
        <Branch name="has_offenses"
                className="has-offenses"
                value={this.props.HasOffenses}
                warning={true}
                onUpdate={this.updateHasOffenses}
                onError={this.handleError}>
          <ul>
            <li>{i18n.m('legal.police.label.summons')}</li>
            <li>{i18n.m('legal.police.label.arrests')}</li>
            <li>{i18n.m('legal.police.label.charges')}</li>
            <li>{i18n.m('legal.police.label.probation')}</li>
            <li>{i18n.m('legal.police.label.trial')}</li>
          </ul>
        </Branch>
        <Show when={this.props.HasOffenses === 'Yes'}>
          <div>
            <Accordion items={this.props.List}
                       defaultState={this.props.defaultState}
                       branch={this.props.ListBranch}
                       onUpdate={this.updateList}
                       onError={this.handleError}
                       summary={this.summary}
                       description={i18n.t('legal.police.collection.summary.title')}
                       appendTitle={i18n.t('legal.police.collection.appendTitle')}
                       appendMessage={i18n.m('legal.police.collection.appendMessage')}
                       appendLabel={i18n.t('legal.police.collection.append')}>
              <Offense name="Item"
                       addressBooks={this.props.addressBooks}
                       dispatch={this.props.dispatch}
                       bind={true}
                       />
            </Accordion>
          </div>
        </Show>
      </div>
    )
  }
}

Offenses.defaultProps = {
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'legal',
  subsection: 'police/offenses',
  addressBooks: {},
  dispatch: (action) => {},
  validator: (state, props) => {
    return new PoliceOffensesValidator(props).isValid()
  },
  defaultState: true
}
