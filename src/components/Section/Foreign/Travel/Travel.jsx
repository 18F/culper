import React from 'react'
import { i18n } from '../../../../config'
import { DateSummary } from '../../../Summary'
import { ForeignTravelValidator } from '../../../../validators'
import { ValidationElement, Branch, Show, Accordion } from '../../../Form'
import TravelQuestions from './TravelQuestions'

export default class Travel extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      error: props.error,
      valid: props.valid,
      errorCodes: []
    }

    this.updateHasForeignTravelOutside = this.updateHasForeignTravelOutside.bind(this)
    this.updateHasForeignTravelOfficial = this.updateHasForeignTravelOfficial.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    if (this.props.onUpdate) {
      let obj = {
        List: this.props.List,
        ListBranch: this.props.ListBranch,
        HasForeignTravelOutside: this.props.HasForeignTravelOutside,
        HasForeignTravelOfficial: this.props.HasForeignTravelOfficial
      }

      for (const q of queue) {
        obj = { ...obj, [q.name]: q.value }
      }

      this.props.onUpdate(obj)
    }
  }

  updateHasForeignTravelOutside (values) {
    this.update([
      { name: 'HasForeignTravelOutside', value: values }
    ])
  }

  updateHasForeignTravelOfficial (values) {
    this.update([
      { name: 'HasForeignTravelOfficial', value: values }
    ])
  }

  updateList (values) {
    this.update([
      { name: 'List', value: values.items },
      { name: 'ListBranch', value: values.branch }
    ])
  }

  /**
   * Handle the validation event.
   */
  handleValidation (event, status, error) {
    if (!event) {
      return
    }

    const codes = super.mergeError(this.state.errorCodes, super.flattenObject(error))
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

  isValid () {
    return new ForeignTravelValidator(this.state, this.props).isValid()
  }

  summary (item, index) {
    const obj = (item || {}).Item || {}
    const country = (obj.Country || {}).value || i18n.t('foreign.travel.collection.summary.unknown')
    const date = DateSummary(obj.Dates)

    return (
      <span>
        <span className="index">{i18n.t('foreign.travel.collection.summary.item')} {index + 1}:</span>
        <span><strong>{country}</strong></span>
        <span className="dates"><strong>{date}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="foreign-travel">
        <Branch label={i18n.t('foreign.travel.heading.outside')}
                labelSize="h3"
                name="has_foreign_travel_outside"
                help="foreign.travel.help.outside"
                value={this.props.HasForeignTravelOutside}
                onUpdate={this.updateHasForeignTravelOutside}
                onValidate={this.props.onValidate}>
        </Branch>

        <Show when={this.props.HasForeignTravelOutside === 'Yes'}>
          <Branch label={i18n.t('foreign.travel.heading.official')}
                  labelSize="h3"
                  name="has_foreign_travel_official"
                  help="foreign.travel.help.official"
                  value={this.props.HasForeignTravelOfficial}
                  onUpdate={this.updateHasForeignTravelOfficial}
                  onValidate={this.props.onValidate}>
          </Branch>
        </Show>

        <Show when={this.props.HasForeignTravelOutside === 'Yes' && this.props.HasForeignTravelOfficial === 'No'}>
          <Accordion minimum="1"
                     items={this.props.List}
                     branch={this.props.ListBranch}
                     onUpdate={this.updateList}
                     onValidate={this.handleValidation}
                     summary={this.summary}
                     description={i18n.t('foreign.travel.collection.summary.title')}
                     appendTitle={i18n.t('foreign.travel.collection.appendTitle')}
                     appendLabel={i18n.t('foreign.travel.collection.append')}>
            <TravelQuestions name="Item" bind={true} />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Travel.defaultProps = {
  name: 'Travel',
  HasForeignTravelOutside: '',
  HasForeignTravelOfficial: '',
  List: [],
  ListBranch: '',
  error: false,
  valid: false
}
