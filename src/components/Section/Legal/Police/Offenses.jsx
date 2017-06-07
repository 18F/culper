import React from 'react'
import { i18n } from '../../../../config'
import { PoliceOffensesValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion } from '../../../Form'
import { DateSummary } from '../../../Summary'
import Offense from './Offense'

export default class Offenses extends SubsectionElement {
  constructor (props) {
    super(props)

    this.onUpdate = this.onUpdate.bind(this)
    this.updateHasOffenses = this.updateHasOffenses.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  onUpdate (updateValues) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        HasOffenses: this.props.HasOffenses,
        List: this.props.List,
        ListBranch: this.props.ListBranch,
        ...updateValues
      })
    }
  }

  updateHasOffenses (value, event) {
    if (value === 'No') {
      this.onUpdate({
        HasOffenses: value,
        List: [],
        ListBranch: ''
      })
    } else {
      this.onUpdate({
        HasOffenses: value
      })
    }
  }

  updateList (values) {
    this.onUpdate({
      List: values.items,
      ListBranch: values.branch
    })
  }

  /**
   * Assists in rendering the summary section.
   */
  summary (item, index) {
    const o = (item || {}).Item || {}
    const description = o.Description && o.Description.value
          ? o.Description.value
          : i18n.t('legal.police.collection.summary.unknown')
    const dates = DateSummary(o.Date)

    return (
      <span>
        <span className="index">{i18n.t('legal.police.collection.summary.item')} {index + 1}:</span>
        <span className="info"><strong>{description}</strong></span>
        <span className="dates"><strong>{dates}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="police-offenses">
        <h2>{i18n.t('legal.police.heading.questions')}</h2>
        <Branch name="has_offenses"
                className="has-offenses"
                value={this.props.HasOffenses}
                help="legal.police.help.hasOffenses"
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
            <Accordion minimum="1"
                       items={this.props.List}
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
  onError: (value, arr) => { return arr },
  section: 'legal',
  subsection: 'police/offenses',
  dispatch: () => {},
  validator: (state, props) => {
    return new PoliceOffensesValidator(props).isValid()
  },
  defaultState: true
}
