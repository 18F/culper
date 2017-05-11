import React from 'react'
import { i18n } from '../../../../config'
import { PoliceOffensesValidator } from '../../../../validators'
import { ValidationElement, Branch, Show, Accordion } from '../../../Form'
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

export default class Offenses extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      HasSummons: props.HasSummons,
      HasArrests: props.HasArrests,
      HasCharges: props.HasCharges,
      HasProbation: props.HasProbation,
      HasTrial: props.HasTrial,
      List: props.List,
      errorCodes: []
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

  updateList (collection) {
    this.onUpdate('List', collection)
  }

  /**
   * Handle the validation event.
   */
  handleValidation (event, status, error) {
    let codes = super.mergeError(this.state.errorCodes, super.flattenObject(error))
    let complexStatus = null
    if (codes.length > 0) {
      complexStatus = false
    } else if (this.isValid()) {
      complexStatus = true
    }

    this.setState({error: complexStatus === false, valid: complexStatus === true, errorCodes: codes}, () => {
      const errorObject = { [this.props.name]: codes }
      const statusObject = { [this.props.name]: { status: complexStatus } }
      super.handleValidation(event, statusObject, errorObject)
    })
  }

  /**
   * Determine if all items in the collection are considered to be in
   * a valid state.
   */
  isValid () {
    return new PoliceOffensesValidator(this.state, null).isValid()
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
      <div className="police">
        <h2>{i18n.t('legal.police.heading.questions')}</h2>
        <Branch name="has_summons"
          className="summons"
          value={this.state.HasSummons}
          help="legal.police.help.summons"
          onUpdate={this.updateSummons}
          onValidate={this.handleValidation}>
          {i18n.m('legal.police.label.summons')}
          <div className="blue">
            {i18n.m('legal.police.para.summons')}
          </div>
        </Branch>

        <Branch name="has_arrests"
          className="arrests"
          value={this.state.HasArrests}
          help="legal.police.help.arrests"
          onUpdate={this.updateArrests}
          onValidate={this.handleValidation}>
          {i18n.m('legal.police.label.arrests')}
        </Branch>

        <Branch name="has_charges"
          className="charges"
          value={this.state.HasCharges}
          help="legal.police.help.charges"
          onUpdate={this.updateCharges}
          onValidate={this.handleValidation}>
          {i18n.m('legal.police.label.charges')}
          <div className="blue">
            {i18n.m('legal.police.para.charges')}
          </div>
        </Branch>

        <Branch name="has_probation"
          className="probation"
          value={this.state.HasProbation}
          help="legal.police.help.probation"
          onUpdate={this.updateProbation}
          onValidate={this.handleValidation}>
          {i18n.m('legal.police.label.probation')}
        </Branch>

        <Branch name="has_trial"
          className="trial"
          value={this.state.HasTrial}
          help="legal.police.help.trial"
          onUpdate={this.updateTrial}
          onValidate={this.handleValidation}>
          {i18n.m('legal.police.label.trial')}
        </Branch>

        <Show when={this.hasOffenses()}>
          <div>
            <Show when={this.hasOffensesCount() > 1}>
              <h4>{i18n.m('legal.police.para.answeredMultiple')}</h4>
            </Show>
            <Accordion minimum="1"
              items={this.state.List}
              onUpdate={this.updateList}
              onValidate={this.handleValidation}
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
