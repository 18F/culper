import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Accordion, Branch, Show } from '../../../Form'
import OrderedCounseling from './OrderedCounseling'
import { DateSummary } from '../../../Summary'
import { AlcoholOrderedCounselingsValidator } from '../../../../validators'

export default class OrderedCounselings extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      errorCodes: props.ErrorCodes || []
    }

    this.update = this.update.bind(this)
    this.updateHasBeenOrdered = this.updateHasBeenOrdered.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (updateValues) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        HasBeenOrdered: this.props.HasBeenOrdered,
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

  updateHasBeenOrdered (values) {
    this.update({HasBeenOrdered: values})
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
    const type = i18n.t('substance.alcohol.orderedCounseling.collection.itemType')

    return (
      <span className="content">
        <span className="index">{type} {index + 1}:</span>
        <span className="occurred">
          <strong>
            {occurred || i18n.t('substance.alcohol.orderedCounseling.collection.summary')}
          </strong>
        </span>
      </span>
    )
  }

  isValid () {
    return new AlcoholOrderedCounselingsValidator(this.props).isValid()
  }

  render () {
    return (
      <div className="ordered-counselings">
        <h2>{i18n.t('substance.alcohol.heading.orderedCounseling')}</h2>
        <Branch name="HasBeenOrdered"
          className="has-been-ordered"
          value={this.props.HasBeenOrdered}
          onValidate={this.handleValidation}
          onUpdate={this.updateHasBeenOrdered}>
        </Branch>

        <Show when={this.props.HasBeenOrdered === 'Yes'}>
          <Accordion minimum="1"
            defaultState={this.props.defaultState}
            items={this.props.List}
            branch={this.props.ListBranch}
            summary={this.summary}
            onUpdate={this.updateList}
            onValidate={this.handleValidation}
            description={i18n.t('substance.alcohol.orderedCounseling.collection.description')}
            appendTitle={i18n.t('substance.alcohol.orderedCounseling.collection.appendTitle')}
            appendLabel={i18n.t('substance.alcohol.orderedCounseling.collection.appendLabel')}>
            <OrderedCounseling name="OrderedCounseling"
              bind={true} />
          </Accordion>
        </Show>
      </div>
    )
  }
}

OrderedCounselings.defaultProps = {
  List: [],
  ListBranch: ''
}
