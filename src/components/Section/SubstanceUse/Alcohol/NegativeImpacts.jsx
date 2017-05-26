import React from 'react'
import { i18n } from '../../../../config'
import { AlcoholNegativeImpactsValidator } from '../../../../validators'
import { ValidationElement, Accordion, Branch, Show } from '../../../Form'
import NegativeImpact from './NegativeImpact'
import { DateSummary } from '../../../Summary'

export default class NegativeImpacts extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      errorCodes: props.ErrorCodes || []
    }

    this.update = this.update.bind(this)
    this.updateHasImpacts = this.updateHasImpacts.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (updateValues) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        HasImpacts: this.props.HasImpacts,
        List: this.props.List,
        ListBranch: this.props.ListBranch,
        ...updateValues
      })
    }
  }

  updateList (values) {
    this.update({
      List: values.items,
      ListBranch: values.branch
    })
  }

  updateHasImpacts (values) {
    this.update({HasImpacts: values})
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
    const o = (item || {}).NegativeImpact || {}
    const occurred = DateSummary(o.Occurred)
    const type = i18n.t('substance.alcohol.negativeImpact.collection.itemType')

    return (
      <span className="content">
        <span className="index">{type} {index + 1}:</span>
        <span className="occurred">
          <strong>
            {occurred || i18n.t('substance.alcohol.negativeImpact.collection.summary')}
          </strong>
        </span>
      </span>
    )
  }

  isValid () {
    return new AlcoholNegativeImpactsValidator(this.props).isValid()
  }

  render () {
    return (
      <div className="negative-impacts">
        <h2>{i18n.t('substance.alcohol.heading.negativeImpact')}</h2>
        <Branch name="has_impacts"
          className="has-impacts"
          value={this.props.HasImpacts}
          onValidate={this.handleValidation}
          onUpdate={this.updateHasImpacts}>
        </Branch>

        <Show when={this.props.HasImpacts === 'Yes'}>
          <Accordion minimum="1"
            defaultState={this.props.defaultState}
            items={this.props.List}
            branch={this.props.ListBranch}
            summary={this.summary}
            onUpdate={this.updateList}
            onValidate={this.handleValidation}
            description={i18n.t('substance.alcohol.negativeImpact.collection.description')}
            appendTitle={i18n.t('substance.alcohol.negativeImpact.collection.appendTitle')}
            appendLabel={i18n.t('substance.alcohol.negativeImpact.collection.appendLabel')}>
            <NegativeImpact name="NegativeImpact"
              bind={true} />
          </Accordion>
        </Show>
      </div>
    )
  }
}

NegativeImpacts.defaultProps = {
  List: [],
  ListBranch: ''
}
