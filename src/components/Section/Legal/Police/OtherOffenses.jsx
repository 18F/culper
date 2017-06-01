import React from 'react'
import { i18n } from '../../../../config'
import { PoliceOtherOffensesValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion } from '../../../Form'
import { DateSummary } from '../../../Summary'
import OtherOffense from './OtherOffense'

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

export default class OtherOffenses extends SubsectionElement {
  constructor (props) {
    super(props)
    this.state = {
      HasOtherConviction: props.HasOtherConviction,
      HasOtherFelony: props.HasOtherFelony,
      HasOtherDomestic: props.HasOtherDomestic,
      HasOtherFirearms: props.HasOtherFirearms,
      HasOtherAlcohol: props.HasOtherAlcohol,
      List: props.List,
      ListBranch: props.ListBranch
    }

    this.onUpdate = this.onUpdate.bind(this)
    this.checkToClear = this.checkToClear.bind(this)
    this.hasOtherOffenses = this.hasOtherOffenses.bind(this)
    this.updateList = this.updateList.bind(this)
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
    if (!this.hasOtherOffenses()) {
      this.onUpdate('List', [])
      this.onUpdate('ListBranch', '')
    }
  }

  updateList (values) {
    this.onUpdate('List', values.items)
    this.onUpdate('ListBranch', values.branch)
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
      <div className="police-other-offenses">
        <h2>{i18n.t('legal.police.para.otherOffense.intro')}</h2>
        <Branch name="has_otherconviction"
                className="otherconviction"
                value={this.state.HasOtherConviction}
                help="legal.police.help.otherConviction"
                onUpdate={this.updateOtherConviction}
                onError={this.handleError}>
          {i18n.m('legal.police.para.otherOffense.first')}
        </Branch>

        <Branch name="has_otherfelony"
                className="otherfelony"
                value={this.state.HasOtherFelony}
                help="legal.police.help.otherFelony"
                onUpdate={this.updateOtherFelony}
                onError={this.handleError}>
          {i18n.m('legal.police.para.otherOffense.second')}
        </Branch>

        <Branch name="has_otherdomestic"
                className="otherdomestic"
                value={this.state.HasOtherDomestic}
                onUpdate={this.updateOtherDomestic}
                onError={this.handleError}>
          {i18n.m('legal.police.para.otherOffense.third')}
        </Branch>

        <Branch name="has_otherfirearms"
                className="otherfirearms"
                value={this.state.HasOtherFirearms}
                onUpdate={this.updateOtherFirearms}
                onError={this.handleError}>
          {i18n.m('legal.police.para.otherOffense.fourth')}
        </Branch>

        <Branch name="has_otheralchohol"
                className="otheralcohol"
                value={this.state.HasOtherAlcohol}
                onUpdate={this.updateOtherAlchohol}
                onError={this.handleError}>
          {i18n.m('legal.police.para.otherOffense.fifth')}
        </Branch>

        <Show when={this.hasOtherOffenses()}>
          <div>
            <Show when={this.hasOtherOffensesCount() > 1}>
              <div>
                <h4>{i18n.m('legal.police.para.answeredMultiple')}</h4>
              </div>
            </Show>
            <Accordion minimum="1"
                       items={this.state.List}
                       branch={this.state.ListBranch}
                       onUpdate={this.updateList}
                       onError={this.handleError}
                       summary={this.summary}
                       description={i18n.t('legal.police.collection.summary.title')}
                       appendTitle={i18n.t('legal.police.collection.appendTitle')}
                       appendMessage={this.otherOffenseBranch()}
                       appendLabel={i18n.t('legal.police.collection.append')}>
              <OtherOffense name="Item"
                            bind={true}
                            />
            </Accordion>
          </div>
        </Show>
      </div>
    )
  }
}

OtherOffenses.defaultProps = {
  onError: (value, arr) => { return arr },
  section: 'legal',
  subsection: 'police/additionaloffenses',
  dispatch: () => {},
  validator: (state, props) => {
    return new PoliceOtherOffensesValidator(state, props).isValid()
  }
}
