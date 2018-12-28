import React from 'react'
import { i18n } from '../../../../config'
import {
  Field,
  Radio,
  RadioGroup,
  Show,
  Textarea,
  DateControl
} from '../../../Form'

export default class ReasonOptions extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      Reason: props.Reason,
      Text: props.Text,
      Date: props.Date
    }
    this.onUpdate = this.onUpdate.bind(this)
    this.updateReason = this.updateReason.bind(this)
    this.updateText = this.updateText.bind(this)
    this.updateDate = this.updateDate.bind(this)
  }

  onUpdate(name, values) {
    this.setState({ [name]: values }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          name: this.props.name,
          Reason: this.state.Reason,
          Text: this.state.Text,
          Date: this.state.Date
        })
      }
    })
  }

  updateReason(values) {
    this.onUpdate('Reason', values)
  }

  updateText(values) {
    this.onUpdate('Text', values)
  }

  updateDate(values) {
    this.onUpdate('Date', values)
  }

  labelText() {
    switch ((this.state.Reason || {}).value) {
      case 'Fired':
        return i18n.t('history.employment.default.left.fired.text')
      case 'Quit':
        return i18n.t('history.employment.default.left.quit.text')
      case 'Charges':
        return i18n.t('history.employment.default.left.charges.text')
      case 'Performance':
        return i18n.t('history.employment.default.left.performance.text')
    }

    return null
  }

  labelDate() {
    switch ((this.state.Reason || {}).value) {
      case 'Fired':
        return i18n.t('history.employment.default.left.fired.date')
      case 'Quit':
        return i18n.t('history.employment.default.left.quit.date')
      case 'Charges':
        return i18n.t('history.employment.default.left.charges.date')
      case 'Performance':
        return i18n.t('history.employment.default.left.performance.date')
    }

    return null
  }

  render() {
    const text = this.labelText()
    const date = this.labelDate()
    return (
      <div className={this.props.className}>
        <Field
          title="Select the type of incident"
          adjustFor="big-buttons"
          shrink={true}
          scrollIntoView={this.props.scrollIntoView}>
          <RadioGroup
            className="employment-left option-list option-list-vertical"
            selectedValue={(this.state.Reason || {}).value}
            required={this.props.required}
            onError={this.props.onError}>
            <Radio
              name="employment_left"
              label={i18n.m('history.employment.default.left.fired.option')}
              value="Fired"
              onUpdate={this.updateReason}
              onError={this.props.onError}
            />
            <Radio
              name="employment_quit"
              label={i18n.m('history.employment.default.left.quit.option')}
              value="Quit"
              onUpdate={this.updateReason}
              onError={this.props.onError}
            />
            <Radio
              name="employment_charges"
              label={i18n.m('history.employment.default.left.charges.option')}
              value="Charges"
              onUpdate={this.updateReason}
              onError={this.props.onError}
            />
            <Radio
              name="employment_performance"
              label={i18n.m(
                'history.employment.default.left.performance.option'
              )}
              value="Performance"
              onUpdate={this.updateReason}
              onError={this.props.onError}
            />
          </RadioGroup>
          <Show when={(this.state.Reason || {}).value}>
            <div>
              <div className="explanation-left">
                <Textarea
                  name="Text"
                  label={text}
                  maxlength="100"
                  {...this.state.Text}
                  onUpdate={this.updateText}
                  onError={this.props.onError}
                  required={this.props.required}
                />
              </div>
              <div className="date-left">
                <label class="h4">{date}</label>
                <DateControl
                  name="Date"
                  {...this.state.Date}
                  minDateEqualTo={true}
                  onUpdate={this.updateDate}
                  onError={this.props.onError}
                  required={this.props.required}
                />
              </div>
            </div>
          </Show>
        </Field>
      </div>
    )
  }
}

ReasonOptions.defaultProps = {
  onError: (value, arr) => {
    return arr
  }
}
