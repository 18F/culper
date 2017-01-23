import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Branch, Collection, DateRange, Number, Textarea, Help, HelpIcon } from '../../../Form'

export default class Gambling extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      List: props.List || [],
      HasGamblingDebt: props.HasGamblingDebt,
      errorCodes: []
    }

    this.myDispatch = this.myDispatch.bind(this)
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
      let e = { [this.props.name]: codes }
      let s = { [this.props.name]: { status: complexStatus } }
      if (this.state.error === false || this.state.valid === true) {
        super.handleValidation(event, s, e)
        return
      }

      super.handleValidation(event, s, e)
    })
  }

  isValid () {
    for (let item of this.state.List) {
      if (!item.Losses || parseInt(item.Losses.value) < 1) {
        return false
      }

      if (!item.Description || !item.Description.value) {
        return false
      }

      if (!item.Actions || !item.Actions.value) {
        return false
      }

      if (!item.Dates || !item.Dates.from || (!item.Dates.to && !item.Dates.present)) {
        return false
      }
    }

    return true
  }

  onUpdate (val) {
    this.setState({ HasGamblingDebt: val }, () => {
      if (val === 'No') {
        this.myDispatch([])
      }
    })
  }

  myDispatch (collection) {
    this.setState({ List: collection }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          List: this.state.List,
          HasGamblingDebt: this.state.HasGamblingDebt
        })
      }
    })
  }

  /**
   * Render children only when we explicit state to do so
   */
  visibleComponents () {
    if (this.state.HasGamblingDebt !== 'Yes') {
      return ''
    }

    return (
      <Collection minimum="1"
                  items={this.state.List}
                  dispatch={this.myDispatch}
                  appendLabel={i18n.t('financial.gambling.collection.append')}>

        <h3>{i18n.t('financial.gambling.label.dates')}</h3>
        <Help id="financial.gambling.help.dates">
          <DateRange name="Dates"
                     onValidate={this.handleValidation}
                     />
          <HelpIcon className="dates-help-icon" />
        </Help>

        <h3>{i18n.t('financial.gambling.label.losses')}</h3>
        <Help id="financial.gambling.help.losses">
          <i className="fa fa-dollar"></i>
          <Number name="Losses"
                  className="losses"
                  placeholder={i18n.t('financial.gambling.placeholder.losses')}
                  min="0"
                  onValidate={this.handleValidation}
                  />
          <HelpIcon className="losses-help-icon" />
        </Help>

        <h3>{i18n.t('financial.gambling.label.description')}</h3>
        <Help id="financial.gambling.help.description">
          <Textarea name="Description"
                    className="description"
                    onValidate={this.handleValidation}
                    label={''}
                    />
          <HelpIcon className="description-help-icon" />
        </Help>

        <h3>{i18n.t('financial.gambling.label.actions')}</h3>
        <Help id="financial.gambling.help.actions">
          <Textarea name="Actions"
                    className="actions"
                    onValidate={this.handleValidation}
                    label={''}
                    />
          <HelpIcon className="actions-help-icon" />
        </Help>
      </Collection>
    )
  }

  render () {
    return (
      <div className="gambling eapp-field-wrap">
        <h2>{i18n.t('financial.gambling.title')}</h2>
        <Branch name="has_gamblingdebt" value={this.state.HasGamblingDebt} onUpdate={this.onUpdate.bind(this)}>
          <p>{i18n.t('financial.gambling.branch.para')}</p>
          <div>{i18n.t('financial.gambling.branch.question')}</div>
        </Branch>
        {this.visibleComponents()}
      </div>
    )
  }
}
