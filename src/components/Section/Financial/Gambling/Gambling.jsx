import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Branch, Collection, Comments, DateRange, Number, Textarea, Help, HelpIcon } from '../../../Form'

export default class Gambling extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      List: props.List || [],
      HasGamblingDebt: props.HasGamblingDebt,
      Comments: props.Comments,
      errorCodes: []
    }

    this.commentsUpdated = this.commentsUpdated.bind(this)
    this.myDispatch = this.myDispatch.bind(this)
    this.summary = this.summary.bind(this)
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

  /**
   * Determine if all items in the collection are considered to be in
   * a valid state.
   */
  isValid () {
    if (!this.state.HasGamblingDebt) {
      return false
    }

    if (this.state.HasGamblingDebt === 'No') {
      return true
    }

    if (this.state.HasGamblingDebt === 'Yes' && this.state.List.length === 0) {
      return false
    }

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

  /**
   * Updates triggered by the branching component.
   */
  onUpdate (val, event) {
    this.setState({ HasGamblingDebt: val }, () => {
      this.myDispatch(val === 'No' ? [] : this.state.List)
      this.handleValidation(event, null, null)
    })
  }

  /**
   * Persist changes to comments
   */
  commentsUpdated (val) {
    this.setState({ Comments: val }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          List: this.state.List,
          Comments: this.state.Comments,
          HasGamblingDebt: this.state.HasGamblingDebt
        })
      }
    })
  }

  /**
   * Dispatch callback initiated from the collection to notify of any new
   * updates to the items.
   */
  myDispatch (collection) {
    this.setState({ List: collection }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          List: this.state.List,
          Comments: this.state.Comments,
          HasGamblingDebt: this.state.HasGamblingDebt
        })
      }
    })
  }

  /**
   * Takes a value such as "1000" and converts it to "1,000".
   */
  fancyNumber (value) {
    const n = new window.Number(value)
    return n.toLocaleString()
  }

  /**
   * Assists in rendering the summary section.
   */
  summary (item, index) {
    let losses = i18n.t('financial.gambling.collection.summary.unknownlosses')
    if (item.Losses && item.Losses.value) {
      losses = '$' + this.fancyNumber(item.Losses.value)
    }

    let from = ''
    if (item.Dates && item.Dates.from) {
      from = '' + item.Dates.from.getFullYear()
    }

    let to = ''
    if (item.Dates && item.Dates.to) {
      to = '' + item.Dates.to.getFullYear()
    } else if (item.Dates && item.Dates.present) {
      to = i18n.t('financial.gambling.collection.summary.present')
    }

    const dates = from === '' && to === ''
          ? i18n.t('financial.gambling.collection.summary.nodates')
          : `${from} - ${to}`

    return (
      <div className="table">
        <div className="table-cell index">{i18n.t('financial.gambling.collection.summary.debt')} {index + 1}:</div>
        <div className="table-cell losses"><strong>{losses}</strong></div>
        <div className="table-cell dates"><strong>{dates}</strong></div>
      </div>
    )
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
                  summary={this.summary}
                  summaryTitle={i18n.t('financial.gambling.collection.summary.title')}
                  appendClass="eapp-field-wrap"
                  appendLabel={i18n.t('financial.gambling.collection.append')}>

        <h3>{i18n.t('financial.gambling.heading.details')}</h3>

        <h4>{i18n.t('financial.gambling.heading.dates')}</h4>
        <div className="eapp-field-wrap">
          <Help id="financial.gambling.help.dates">
            <DateRange name="Dates"
                       label={i18n.t('financial.gambling.label.dates')}
                       onValidate={this.handleValidation}
                       />
            <HelpIcon className="dates-help-icon" />
          </Help>
        </div>

        <h4>{i18n.t('financial.gambling.heading.losses')}</h4>
        <div className="eapp-field-wrap">
          <Help id="financial.gambling.help.losses">
            <i className="fa fa-dollar"></i>
            <Number name="Losses"
                    className="losses"
                    placeholder={i18n.t('financial.gambling.placeholder.losses')}
                    label={i18n.t('financial.gambling.label.losses')}
                    min="1"
                    onValidate={this.handleValidation}
                    />
            <HelpIcon className="losses-help-icon" />
          </Help>
        </div>

        <h4>{i18n.t('financial.gambling.heading.description')}</h4>
        <div className="eapp-field-wrap">
          <Help id="financial.gambling.help.description">
            <Textarea name="Description"
                      className="description"
                      onValidate={this.handleValidation}
                      label={i18n.t('financial.gambling.label.description')}
                      />
            <HelpIcon className="description-help-icon" />
          </Help>
        </div>

        <h4>{i18n.t('financial.gambling.heading.actions')}</h4>
        <div className="eapp-field-wrap">
          <Help id="financial.gambling.help.actions">
            <Textarea name="Actions"
                      className="actions"
                      onValidate={this.handleValidation}
                      label={i18n.t('financial.gambling.label.actions')}
                      />
            <HelpIcon className="actions-help-icon" />
          </Help>
        </div>
      </Collection>
    )
  }

  render () {
    return (
      <div className="gambling">
        <Branch name="has_gamblingdebt"
                className="eapp-field-wrap"
                value={this.state.HasGamblingDebt}
                help="financial.gambling.branch.help"
                label={i18n.t('financial.gambling.branch.question')}
                onUpdate={this.onUpdate.bind(this)}>
        </Branch>
        {this.visibleComponents()}
        <Comments name="Comments"
                  value={this.state.Comments}
                  label={i18n.t('financial.gambling.help.comments')}
                  className="eapp-field-wrap"
                  onUpdate={this.commentsUpdated}
                  onValidate={this.handleValidation}>
          <h3>{i18n.t('financial.gambling.label.comments')}</h3>
        </Comments>
      </div>
    )
  }
}
