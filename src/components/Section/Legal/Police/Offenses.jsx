import React from 'react'
import { i18n } from '../../../../config'
import { PoliceOffensesValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion } from '../../../Form'
import { DateSummary } from '../../../Summary'
import Offense from './Offense'

/**
 * Convenience function to send updates along their merry way
 */
const sendUpdate = (fn, name, props) => {
  if (fn) {
    fn({
      name: name,
      ...props
    })
  }
}

export default class Offenses extends SubsectionElement {
  constructor (props) {
    super(props)

    this.state = {
      HasSummons: props.HasSummons,
      HasArrests: props.HasArrests,
      HasCharges: props.HasCharges,
      HasProbation: props.HasProbation,
      HasTrial: props.HasTrial,
      List: props.List || [],
      ListBranch: props.ListBranch
    }

    this.onUpdate = this.onUpdate.bind(this)
    this.checkToClear = this.checkToClear.bind(this)
    this.updateSummons = this.updateSummons.bind(this)
    this.updateArrests = this.updateArrests.bind(this)
    this.updateCharges = this.updateCharges.bind(this)
    this.updateProbation = this.updateProbation.bind(this)
    this.updateTrial = this.updateTrial.bind(this)
    this.updateList = this.updateList.bind(this)
    this.hasOffenses = this.hasOffenses.bind(this)
  }

  onUpdate (name, values, fn) {
    this.setState({ [name]: values }, () => {
      sendUpdate(this.props.onUpdate, this.props.name, this.state)

      if (fn) {
        fn()
      }
    })
  }

  checkToClear () {
    // If there is no history clear out any previously entered data
    if (!this.hasOffenses()) {
      this.onUpdate('List', [])
      this.onUpdate('ListBranch', '')
    }
  }

  updateSummons (value, event) {
    this.onUpdate('HasSummons', value, () => {
      this.checkToClear()
    })
  }

  updateArrests (value, event) {
    this.onUpdate('HasArrests', value, () => {
      this.checkToClear()
    })
  }

  updateCharges (value, event) {
    this.onUpdate('HasCharges', value, () => {
      this.checkToClear()
    })
  }

  updateProbation (value, event) {
    this.onUpdate('HasProbation', value, () => {
      this.checkToClear()
    })
  }

  updateTrial (value, event) {
    this.onUpdate('HasTrial', value, () => {
      this.checkToClear()
    })
  }

  updateList (values) {
    this.onUpdate('List', values.items)
    this.onUpdate('ListBranch', values.branch)
  }

  hasOffenses () {
    return new PoliceOffensesValidator(this.state, null).answeredYes()
  }

  hasOffensesCount () {
    return new PoliceOffensesValidator(this.state, null).answeredYesCount()
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
        <Branch name="has_summons"
                className="summons"
                value={this.state.HasSummons}
                help="legal.police.help.summons"
                onUpdate={this.updateSummons}
                onError={this.handleError}>
          {i18n.m('legal.police.label.summons')}
        </Branch>

        <Branch name="has_arrests"
                className="arrests"
                value={this.state.HasArrests}
                onUpdate={this.updateArrests}
                onError={this.handleError}>
          {i18n.m('legal.police.label.arrests')}
        </Branch>

        <Branch name="has_charges"
                className="charges"
                value={this.state.HasCharges}
                help="legal.police.help.charges"
                onUpdate={this.updateCharges}
                onError={this.handleError}>
          {i18n.m('legal.police.label.charges')}
        </Branch>

        <Branch name="has_probation"
                className="probation"
                value={this.state.HasProbation}
                onUpdate={this.updateProbation}
                onError={this.handleError}>
          {i18n.m('legal.police.label.probation')}
        </Branch>

        <Branch name="has_trial"
                className="trial"
                value={this.state.HasTrial}
                onUpdate={this.updateTrial}
                onError={this.handleError}>
          {i18n.m('legal.police.label.trial')}
        </Branch>

        <Show when={this.hasOffenses()}>
          <div>
            <Show when={this.hasOffensesCount() > 1}>
              <h4>{i18n.m('legal.police.para.answeredMultiple')}</h4>
            </Show>
            <Accordion minimum="1"
                       items={this.state.List}
                       defaultState={this.props.defaultState}
                       branch={this.state.ListBranch}
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
    return new PoliceOffensesValidator(state, props).isValid()
  },
  defaultState: true
}
