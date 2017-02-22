import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Collection, DateRange, Text, Help, HelpIcon, Branch } from '../../../Form'

export default class AdditionalActivity extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      List: props.List || [],
      HasAdditionalActivity: props.HasAdditionalActivity
    }
  }

  doUpdate () {
    if (this.props.onUpdate) {
      let update = {
        name: this.props.name,
        List: this.state.List,
        HasAdditionalActivity: this.state.HasAdditionalActivity || ''
      }
      this.props.onUpdate(update)
    }
  }

  /**
   * Handle the focus event.
   */
  handleFocus (event) {
    this.setState({ focus: true }, () => {
      super.handleFocus(event)
    })
  }

  /**
   * Handle the blur event.
   */
  handleBlur (event) {
    this.setState({ focus: false }, () => {
      super.handleBlur(event)
    })
  }

  /**
   * Handle the validation event.
   */
  handleValidation (event, status) {
    this.setState({error: status === false, valid: status === true}, () => {
      super.handleValidation(event, status)
    })
  }

  myDispatch (collection) {
    this.setState({ List: collection }, () => {
      this.doUpdate()
    })
  }

  onBranchUpdate (val) {
    let list = [...this.state.List]
    if (val === 'No') {
      list = []
    }
    this.setState({ HasAdditionalActivity: val, List: list }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          name: this.props.name,
          List: this.state.List,
          HasAdditionalActivity: this.state.HasAdditionalActivity
        })
      }
    })
  }

  options () {
    return (
      <Branch name="additionalActivity"
              className="no-label"
              value={this.state.HasAdditionalActivity}
              help="history.employment.additionalActivity.help"
              onUpdate={this.onBranchUpdate.bind(this)}>
      </Branch>
    )
  }

  render () {
    const klass = `activity ${this.props.className || ''}`.trim()
    let options = this.options()

    if (this.state.HasAdditionalActivity === 'Yes') {
      return (
        <div className="has-additional">
          <h4>{i18n.t('history.employment.additionalActivity.label')}</h4>
          <div className={klass}>
            {options}
          </div>

          <Collection minimum="1"
                      items={this.state.List}
                      dispatch={this.myDispatch.bind(this)}
                      appendClass="eapp-field-wrap"
                      appendLabel={i18n.t('history.employment.additionalActivity.collection.append')}>

            <h4>{i18n.t('history.employment.additionalActivity.heading.position')}</h4>
            <div className={klass}>
              <Help id="history.employment.additionalActivity.position.help">
                <Text name="Position"
                      className="text"
                      label={i18n.t('history.employment.additionalActivity.position.label')}
                      onBlur={this.handleBlur}
                      onFocus={this.handleFocus}
                      onValidate={this.handleValidation}
                      />
                <HelpIcon className="employer" />
              </Help>
            </div>

            <h4>{i18n.t('history.employment.additionalActivity.heading.supervisor')}</h4>
            <div className={klass}>
              <Help id="history.employment.additionalActivity.supervisor.help">
                <Text name="Supervisor"
                      className="text"
                      label={i18n.t('history.employment.additionalActivity.supervisor.label')}
                      onBlur={this.handleBlur}
                      onFocus={this.handleFocus}
                      onValidate={this.handleValidation}
                      />
                <HelpIcon className="employer" />
              </Help>
            </div>

            <h4>{i18n.t('history.employment.additionalActivity.heading.datesEmployed')}</h4>
            <div className={klass}>
              <Help id="history.employment.additionalActivity.datesEmployed.help">
                <DateRange name="DatesEmployed"
                           onBlur={this.handleBlur}
                           onFocus={this.handleFocus}
                           onValidate={this.handleValidation}
                           />
                <HelpIcon className="used-help-icon" />
              </Help>
            </div>
          </Collection>
        </div>
      )
    }

    return (
      <div>
        <h4>{i18n.t('history.employment.additionalActivity.label')}</h4>
        <div className={klass}>
          {options}
        </div>
      </div>
    )
  }
}
