import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Help, HelpIcon, Radio, RadioGroup, Show, Comments, Textarea, DateControl } from '../../../Form'

export default class ReasonLeft extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      Reason: props.Reason,
      Text: props.Text,
      Date: props.Date,
      Comments: props.Comments
    }

    this.updateComments = this.updateComments.bind(this)
    this.updateReason = this.updateReason.bind(this)
    this.updateText = this.updateText.bind(this)
    this.updateDate = this.updateDate.bind(this)
  }

  /**
   * Handle any updates and bubble them up.
   */
  onUpdate (name, values) {
    this.setState({ [name]: values }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          name: this.props.name,
          Reason: this.state.Reason,
          Text: this.state.Text,
          Date: this.state.Date,
          Comments: this.state.Comments
        })
      }
    })
  }

  updateComments (values) {
    this.onUpdate('Comments', values)
  }

  updateReason (values) {
    this.onUpdate('Reason', values.value)
  }

  updateText (values) {
    this.onUpdate('Text', values)
  }

  updateDate (values) {
    this.onUpdate('Date', values)
  }

  labelText () {
    switch (this.state.Reason) {
      case 'Fired':
        return i18n.t('history.employment.default.left.fired.text')
      case 'Quit':
        return i18n.t('history.employment.default.left.quit.text')
      case 'Charges':
        return i18n.t('history.employment.default.left.charges.text')
      case 'Performance':
        return i18n.t('history.employment.default.left.performance.text')
      case 'Other':
      default:
        return i18n.t('history.employment.default.left.other.text')
    }
  }

  labelDate () {
    switch (this.state.Reason) {
      case 'Fired':
        return i18n.t('history.employment.default.left.fired.date')
      case 'Quit':
        return i18n.t('history.employment.default.left.quit.date')
      case 'Charges':
        return i18n.t('history.employment.default.left.charges.date')
      case 'Performance':
        return i18n.t('history.employment.default.left.performance.date')
      case 'Other':
      default:
        return i18n.t('history.employment.default.left.other.date')
    }
  }

  render () {
    const text = this.labelText()
    const date = this.labelDate()

    return (
      <div>
        <Comments name="comments"
                  value={this.state.Comments}
                  title={i18n.t('history.employment.default.left.comments')}
                  className={this.props.className}
                  onUpdate={this.updateComments}
                  onValidate={this.props.onValidate}
                  >
          <Help id="history.employment.default.left.help">
            <div className={this.props.className}>
              <RadioGroup className="employment-left option-list" selectedValue={this.state.Reason}>
                <Radio name="employment_left"
                      label={i18n.t('history.employment.default.left.fired.option')}
                      value="Fired"
                      onUpdate={this.updateReason}
                      onValidate={this.props.onValidate}
                      />
                <Radio name="employment_quit"
                      label={i18n.t('history.employment.default.left.quit.option')}
                      value="Quit"
                      onUpdate={this.updateReason}
                      onValidate={this.props.onValidate}
                      />
                <Radio name="employment_charges"
                      label={i18n.t('history.employment.default.left.charges.option')}
                      value="Charges"
                      onUpdate={this.updateReason}
                      onValidate={this.props.onValidate}
                      />
                <Radio name="employment_performance"
                      label={i18n.t('history.employment.default.left.performance.option')}
                      value="Performance"
                      onUpdate={this.updateReason}
                      onValidate={this.props.onValidate}
                      />
                <Radio name="employment_other"
                      label={i18n.t('history.employment.default.left.other.option')}
                      value="Other"
                      onUpdate={this.updateReason}
                      onValidate={this.props.onValidate}
                      />
              </RadioGroup>
              <HelpIcon />
            </div>
            <Show when={this.state.Reason}>
              <div>
                <div className={`${this.props.className} explanation-left`}>
                  <Textarea name="Text"
                            label={text}
                            maxlength="100"
                            {...this.state.Text}
                            onUpdate={this.updateText}
                            onValidate={this.props.onValidate}
                            />
                </div>
                <div className={`${this.props.className} date-left`}>
                  <label>{date}</label>
                  <DateControl name="Date"
                               {...this.state.Date}
                               onUpdate={this.updateDate}
                               onValidate={this.props.onValidate}
                               />
                </div>
              </div>
            </Show>
          </Help>
        </Comments>
      </div>
    )
  }
}
