import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Collection, Radio, RadioGroup, Comments, DateRange, Address, Textarea, Text, Help, HelpIcon, Branch } from '../../../Form'

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
        HasAdditionalActivity: this.state.HasAdditionalActivity
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
        className="eapp-field-wrap no-label"
        value={this.state.HasAdditionalActivity}
        help="history.employment.additionalActivity.help"
        onUpdate={this.onBranchUpdate.bind(this)}>
        <h4>{i18n.t('history.employment.additionalActivity.label')}</h4>
      </Branch>
    )
  }
  render () {
    const klass = `${this.props.className || ''}`.trim()
    let options = this.options()

    if (this.state.HasAdditionalActivity === 'Yes') {
      return (
        <div className={klass}>
          <div>
              {options}
          </div>

          <Collection minimum="1"
            items={this.state.List}
            dispatch={this.myDispatch.bind(this)}
            appendClass="eapp-field-wrap"
            appendLabel={i18n.t('history.employment.additionalActivity.collection.append')}>

            <h3>{i18n.t('history.employment.additionalActivity.heading.position')}</h3>
            <div className="eapp-field-wrap">
              <Help id="history.employment.additionalActivity.position.help">
                <Text name="Position"
                  className="text"
                  label={i18n.t('history.employment.additionalActivity.position.label')}
                  onValidate={this.handleValidation}
                />
                <HelpIcon className="employer" />
              </Help>
            </div>

            <h3>{i18n.t('history.employment.additionalActivity.heading.supervisor')}</h3>
            <div className="eapp-field-wrap">
              <Help id="history.employment.additionalActivity.supervisor.help">
                <Text name="Supervisor"
                  className="text"
                  label={i18n.t('history.employment.additionalActivity.supervisor.label')}
                  onValidate={this.handleValidation}
                />
                <HelpIcon className="employer" />
              </Help>
            </div>

            <h3>{i18n.t('history.employment.additionalActivity.heading.datesEmployed')}</h3>
            <div className="eapp-field-wrap">
              <Help id="history.employment.additionalActivity.datesEmployed.help">
                <DateRange name="DatesEmployed"
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
      <div className={klass}>
          {options}
      </div>
    )
  }
}
