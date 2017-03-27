import React from 'react'
import { i18n } from '../../../../config'
import { PoliceValidator } from '../../../../validators'
import { ValidationElement, Branch, Show, Accordion, BranchCollection } from '../../../Form'
import { dateSummary } from '../../History/summaries'
import Offense from './Offense'
import OtherOffense from './OtherOffense'
import DomesticViolence from './DomesticViolence'

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

export default class Police extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      HasSummons: props.HasSummons,
      HasArrests: props.HasArrests,
      HasCharges: props.HasCharges,
      HasProbation: props.HasProbation,
      HasTrial: props.HasTrial,
      List: props.List,
      OtherOffenses: props.OtherOffenses,
      DomesticViolence: props.DomesticViolence,
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
    this.updateDomesticViolence = this.updateDomesticViolence.bind(this)
    this.updateOtherOffenses = this.updateOtherOffenses.bind(this)
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
    if (this.state.HasSummons === 'No' && this.state.HasArrests === 'No' && this.state.HasCharges === 'No' && this.state.HasProbation === 'No' && this.state.HasTrial === 'No') {
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

  updateOtherOffenses (value) {
    this.onUpdate('OtherOffenses', value, () => {
      this.checkToClear()
    })
  }

  updateDomesticViolence (value, event) {
    this.onUpdate('DomesticViolence', value, () => {
      this.checkToClear()
    })
  }

  /**
   * Handle the validation event.
   */
  handleValidation (event, status, error) {
    if (!event) {
      return
    }

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
      if (this.state.error === false || this.state.valid === true) {
        super.handleValidation(event, statusObject, errorObject)
        return
      }

      super.handleValidation(event, statusObject, errorObject)
    })
  }

  /**
   * Determine if all items in the collection are considered to be in
   * a valid state.
   */
  isValid () {
    return new PoliceValidator(this.state, null).isValid()
  }

  hasOffenses () {
    return new PoliceValidator(this.state, null).answeredYes()
  }

  /**
   * Assists in rendering the summary section.
   */
  summary (item, index) {
    const o = (item || {}).Item || {}
    const description = o.Description && o.Description.value
          ? o.Description.value
          : i18n.t('legal.police.collection.summary.unknown')
    const dates = dateSummary(o)

    return (
      <span>
        <span className="index">{i18n.t('legal.police.collection.summary.item')} {index + 1}:</span>
        <span className="info"><strong>{description}</strong></span>
        <span className="dates"><strong>{dates}</strong></span>
      </span>
    )
  }

  domesticViolenceBranch () {
    return (
      <h3 className="eapp-field-wrap">{i18n.m('legal.police.label.domesticViolence')}</h3>
    )
  }

  otherOffenseBranch () {
    return (
      <div>
        <h3 className="eapp-field-wrap">{i18n.t('legal.police.para.otherOffense.intro')}</h3>
        <ul className="other-offenses">
          <li>{i18n.m('legal.police.para.otherOffense.first')}</li>
          <li>{i18n.m('legal.police.para.otherOffense.second')}</li>
          <li>{i18n.m('legal.police.para.otherOffense.third')}</li>
          <li>{i18n.m('legal.police.para.otherOffense.fourth')}</li>
          <li>{i18n.m('legal.police.para.otherOffense.fifth')}</li>
        </ul>
      </div>
    )
  }

  render () {
    return (
      <div className="police">
        <h2>{i18n.t('legal.police.heading.questions')}</h2>
        <Branch name="has_summons"
                className="eapp-field-wrap no-label summons"
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
                className="eapp-field-wrap no-label arrests"
                value={this.state.HasArrests}
                help="legal.police.help.arrests"
                onUpdate={this.updateArrests}
                onValidate={this.handleValidation}>
          {i18n.m('legal.police.label.arrests')}
        </Branch>

        <Branch name="has_charges"
                className="eapp-field-wrap no-label charges"
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
                className="eapp-field-wrap no-label probation"
                value={this.state.HasProbation}
                help="legal.police.help.probation"
                onUpdate={this.updateProbation}
                onValidate={this.handleValidation}>
          {i18n.m('legal.police.label.probation')}
        </Branch>

        <Branch name="has_trial"
                className="eapp-field-wrap no-label trial"
                value={this.state.HasTrial}
                help="legal.police.help.trial"
                onUpdate={this.updateTrial}
                onValidate={this.handleValidation}>
          {i18n.m('legal.police.label.trial')}
        </Branch>

        <Show when={this.hasOffenses()}>
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
        </Show>

        <BranchCollection
          branchHelp="legal.police.branchCollection.otherOffenses"
          branch={this.otherOffenseBranch()}
          items={this.state.OtherOffenses}
          onUpdate={this.updateOtherOffenses}>
          <OtherOffense name="Item"
            bind={true}
            onValidate={this.props.onValidate}
          />
        </BranchCollection>

        <BranchCollection
          branchHelp="legal.police.branchCollection.domesticViolence"
          branch={this.domesticViolenceBranch()}
          items={this.state.DomesticViolence}
          onUpdate={this.updateDomesticViolence}
        >
          <DomesticViolence name="domestic"
            bind={true}
            onValidate={this.handleValidation}
          />
        </BranchCollection>

      </div>
    )
  }
}
