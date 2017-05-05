import React from 'react'
import { i18n } from '../../../../../config'
import { Accordion, ValidationElement, Branch, Show } from '../../../../Form'
//import { ForeignRealEstateActivityValidator } from '../../../../../validators'
import Benefit from './Benefit'

export default class BenefitActivity extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      errorCodes: []
    }

    this.update = this.update.bind(this)
    this.updateHasBenefits = this.updateHasBenefits.bind(this)
    this.updateList = this.updateList.bind(this)
    this.isValid = this.isValid.bind(this)
  }

  update (field, values) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        HasBenefits: this.props.HasBenefits,
        List: this.props.List,
        [field]: values
      })
    }
  }

  updateList (values) {
    this.update('List', values)
  }

  updateHasBenefits (values) {
    this.update('HasBenefits', values)
  }

  isValid () {
    return true
    //return new ForeignRealEstateActivityValidator(null, this.props).isValid()
  }

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

  summary (item, index) {
    const o = (item || {}).Benefit || {}
    const who = (o.InterestTypes || []).join(', ')
    const acquired = (o.Acquired || {}).date ? `${o.Acquired.month}/${o.Acquired.year}` : ''
    const type = i18n.t('foreign.activities.benefit.collection.itemType')

    const summary = [who].reduce((prev, next) => {
      if (prev && next) {
        return prev + ' - ' + next
      }
      return prev
    })

    return (
      <span className="content">
        <span className="index">{type} {index + 1}:</span>
        <span className="interest">
          <strong>{summary || i18n.t('foreign.activities.benefit.collection.summary')}</strong>
        </span>
        <span className="acquired">{acquired}</span>
      </span>
    )
  }

  render () {
    return (
      <div className="benefit-activity">
        <Branch name="has_benefit"
          className="has-benefits"
          label={i18n.t('foreign.activities.benefit.heading.title')}
          labelSize="h3"
          value={this.props.HasBenefits}
          onValidate={this.handleValidation}
          onUpdate={this.updateHasBenefits}>
        </Branch>

        <Show when={this.props.HasBenefits === 'Yes'}>
          <Accordion minimum="1"
            defaultState={this.props.defaultState}
            items={this.props.List}
            onUpdate={this.updateList}
            summary={this.summary}
            onValidate={this.handleValidation}
            description={i18n.t('foreign.activities.benefit.collection.description')}
            appendTitle={i18n.t('foreign.activities.benefit.collection.appendTitle')}
            appendMessage={i18n.m('foreign.activities.benefit.collection.appendMessage')}
            appendLabel={i18n.t('foreign.activities.benefit.collection.appendLabel')}>
            <Benefit name="Benefit"
              bind={true}
            />
          </Accordion>
        </Show>
      </div>
    )
  }
}

BenefitActivity.defaultProps = {
  name: 'benefit',
  HasBenefits: '',
  List: [],
  defaultState: true
}
