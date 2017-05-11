import React from 'react'
import { i18n } from '../../../../config'
import { PoliceOtherOffensesValidator } from '../../../../validators'
import { ValidationElement, Branch, Show, Accordion, BranchCollection } from '../../../Form'
import { DateSummary } from '../../../Summary'
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

export default class OtherOffenses extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      HasOtherConviction: props.HasOtherConviction,
      HasOtherFelony: props.HasOtherFelony,
      HasOtherDomestic: props.HasOtherDomestic,
      HasOtherFirearms: props.HasOtherFirearms,
      HasOtherAlcohol: props.HasOtherAlcohol,
      OtherOffenses: props.OtherOffenses,
      errorCodes: []
    }

    this.onUpdate = this.onUpdate.bind(this)
    this.checkToClear = this.checkToClear.bind(this)
    this.hasOtherOffenses = this.hasOtherOffenses.bind(this)
    this.updateDomesticViolence = this.updateDomesticViolence.bind(this)
    this.updateOtherOffenses = this.updateOtherOffenses.bind(this)
    this.updateOtherConviction = this.updateOtherConviction.bind(this)
    this.updateOtherFelony = this.updateOtherFelony.bind(this)
    this.updateOtherDomestic = this.updateOtherDomestic.bind(this)
    this.updateOtherFirearms = this.updateOtherFirearms.bind(this)
    this.updateOtherAlchohol = this.updateOtherAlchohol.bind(this)
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

  updateOtherOffenses (value) {
    this.onUpdate('OtherOffenses', value, () => {
      this.checkToClear()
    })
  }

  updateOtherConviction (value) {
    this.onUpdate('HasOtherConviction', value, () => {
      this.checkToClear()
    })
  }

  updateOtherFelony (value) {
    this.onUpdate('HasOtherFelony', value, () => {
      this.checkToClear()
    })
  }

  updateOtherDomestic (value) {
    this.onUpdate('HasOtherDomestic', value, () => {
      this.checkToClear()
    })
  }

  updateOtherFirearms (value) {
    this.onUpdate('HasOtherFirearms', value, () => {
      this.checkToClear()
    })
  }

  updateOtherAlchohol (value) {
    this.onUpdate('HasOtherAlcohol', value, () => {
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
    return new PoliceOtherOffensesValidator(this.state, null).isValid()
  }

  hasOtherOffenses () {
    return new PoliceOtherOffensesValidator(this.state, null).hasOtherOffenses()
  }

  hasOtherOffensesCount () {
    return new PoliceOtherOffensesValidator(this.state, null).hasOtherOffensesCount()
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

  otherOffenseBranch () {
    return (
      <div>
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
        <h2>{i18n.t('legal.police.para.otherOffense.intro')}</h2>
        <Branch name="has_otherconviction"
          className="otherconviction"
          value={this.state.HasOtherConviction}
          help="legal.police.help.otherConviction"
          onUpdate={this.updateOtherConviction}
          onValidate={this.handleValidation}>
          {i18n.m('legal.police.para.otherOffense.first')}
        </Branch>

        <Branch name="has_otherfelony"
          className="otherfelony"
          value={this.state.HasOtherFelony}
          help="legal.police.help.otherFelony"
          onUpdate={this.updateOtherFelony}
          onValidate={this.handleValidation}>
          {i18n.m('legal.police.para.otherOffense.second')}
        </Branch>

        <Branch name="has_otherdomestic"
          className="otherdomestic"
          value={this.state.HasOtherDomestic}
          help="legal.police.help.otherDomestic"
          onUpdate={this.updateOtherDomestic}
          onValidate={this.handleValidation}>
          {i18n.m('legal.police.para.otherOffense.third')}
        </Branch>

        <Branch name="has_otherfirearms"
          className="otherfirearms"
          value={this.state.HasOtherFirearms}
          help="legal.police.help.otherFirearms"
          onUpdate={this.updateOtherFirearms}
          onValidate={this.handleValidation}>
          {i18n.m('legal.police.para.otherOffense.fourth')}
        </Branch>

        <Branch name="has_otheralchohol"
          className="otheralcohol"
          value={this.state.HasOtherAlcohol}
          help="legal.police.help.otherAlcohol"
          onUpdate={this.updateOtherAlchohol}
          onValidate={this.handleValidation}>
          {i18n.m('legal.police.para.otherOffense.fifth')}
        </Branch>

        <Show when={this.hasOtherOffenses()}>
          <Accordion minimum="1"
            items={this.state.OtherOffenses}
            onUpdate={this.updateOtherOffenses}
            onValidate={this.handleValidation}
            summary={this.summary}
            description={i18n.t('legal.police.collection.summary.title')}
            appendTitle={i18n.t('legal.police.collection.appendTitle')}
            appendMessage={this.otherOffenseBranch()}
            appendLabel={i18n.t('legal.police.collection.append')}>
            <OtherOffense name="Item"
              bind={true}
              onValidate={this.props.onValidate}
            />
          </Accordion>
        </Show>
      </div>
    )
  }
}
