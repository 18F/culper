import React from 'react'
import { i18n } from '../../../../../config'
import { Accordion, ValidationElement, Branch, Show } from '../../../../Form'
import { ForeignRealEstateActivityValidator } from '../../../../../validators'
import RealEstateInterest from './RealEstateInterest'

export default class RealEstateActivity extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      errorCodes: []
    }

    this.update = this.update.bind(this)
    this.updateHasInterests = this.updateHasInterests.bind(this)
    this.updateList = this.updateList.bind(this)
    this.isValid = this.isValid.bind(this)
  }

  update (field, values) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        HasInterests: this.props.HasInterests,
        List: this.props.List,
        [field]: values
      })
    }
  }

  updateList (values) {
    this.update('List', values)
  }

  updateHasInterests (values) {
    this.update('HasInterests', values)
  }

  isValid () {
    return new ForeignRealEstateActivityValidator(null, this.props).isValid()
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
    const o = (item || {}).RealEstateInterest || {}
    const who = (o.InterestTypes || []).join(', ')
    const acquired = (o.Acquired || {}).date ? `${o.Acquired.month}/${o.Acquired.year}` : ''
    const address = addressSummary(o)
    const type = i18n.t('foreign.activities.realestate.collection.itemType')

    const summary = [who, address].reduce((prev, next) => {
      if (prev && next) {
        return prev + ' - ' + next
      }
      return prev
    })

    return (
      <span className="content">
        <span className="index">{type} {index + 1}:</span>
        <span className="interest">
          <strong>{summary || i18n.t('foreign.activities.realestate.collection.summary')}</strong>
        </span>
        <span className="acquired">{acquired}</span>
      </span>
    )
  }

  render () {
    return (
      <div className="realestate">
        <Branch name="has_interests"
          label={<h3>{i18n.t('foreign.activities.realestate.heading.title')}</h3>}
          labelSize="h3"
          value={this.props.HasInterests}
          onValidate={this.handleValidation}
          onUpdate={this.updateHasInterests}>
        </Branch>

        <Show when={this.props.HasInterests === 'Yes'}>
          <Accordion minimum="1"
            defaultState={this.props.defaultState}
            items={this.props.List}
            onUpdate={this.updateList}
            summary={this.summary}
            onValidate={this.handleValidation}
            description={i18n.t('foreign.activities.realestate.collection.description')}
            appendTitle={i18n.t('foreign.activities.realestate.collection.appendTitle')}
            appendMessage={i18n.m('foreign.activities.realestate.collection.appendMessage')}
            appendLabel={i18n.t('foreign.activities.realestate.collection.appendLabel')}>
            <RealEstateInterest name="RealEstateInterest"
              bind={true}
            />
          </Accordion>
        </Show>
      </div>
    )
  }
}

RealEstateActivity.defaultProps = {
  name: 'realestate',
  HasInterests: '',
  List: [],
  defaultState: true
}

export const addressSummary = (item) => {
  let address = ''
  let address1 = ''
  let address2 = ''
  if (item.Address) {
    address1 += `${item.Address.address || ''}`.trim()
    if (item.Address.addressType === 'United States' || item.Address.addressType === 'APOFPO') {
      address2 = `${item.Address.city || ''}, ${item.Address.state || ''} ${item.Address.zipcode || ''}`.trim()
    } else if (item.Address.addressType === 'International') {
      address2 = `${item.Address.city || ''}, ${item.Address.country || ''}`.trim()
    }
  }

  if (address1.length === 0 || address2.length === 1) {
    address = ''
  } else {
    address = `${address1}, ${address2}`.trim()
  }
  return address
}
