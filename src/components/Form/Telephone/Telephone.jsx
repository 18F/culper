import React from 'react'
import ValidationElement from '../ValidationElement'
import Generic from '../Generic'
import Text from '../Text'
import Radio from '../Radio'
import RadioGroup from '../RadioGroup'

export default class Telephone extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      name: props.name,
      label: props.label,
      placeholder: props.placeholder,
      help: props.help,
      disabled: props.disabled,
      maxlength: props.maxlength,
      pattern: props.pattern,
      readonly: props.readonly,
      required: props.required,
      value: props.value,
      focus: props.focus || false,
      error: props.error || false,
      valid: props.valid || false,
      type: props.type || 'Domestic',
      timeOfDay: props.timeOfDay,
      number: props.number,
      domestic: {
        first: this.parseNumber(0, 3, props.number),
        second: this.parseNumber(3, 6, props.number),
        third: this.parseNumber(6, 10, props.number),
        extension: ''
      },
      dsn: {
        first: this.parseNumber(0, 3, props.number),
        second: this.parseNumber(3, 7, props.number)
      },
      international: {
        first: this.parseNumber(0, 3, props.number),
        second: this.parseNumber(3, 7, props.number),
        third: this.parseNumber(7, 11, props.number),
        extension: ''
      }
    }
  }

  parseNumber (start, end, number) {
    if (!number) {
      return ''
    }
    return number.substring(start, end)
  }

  /**
   * Handle the change event.
   */
  handleChange (event) {
    this.setState({ value: event.target.value }, () => {
      super.handleChange(event)
    })
  }

  handleNumberChange (fieldType, field) {
    return (event) => {
      let fieldTypeObj = { ...this.state[fieldType] }
      fieldTypeObj[field] = event.target.value
      this.setState({
        [fieldType]: fieldTypeObj
      }, () => {
        this.onUpdate()
      })
    }
  }

  handleRadioChange (field) {
    return (value) => {
      this.setState({
        domestic: {},
        international: {},
        dsn: {},
        [field]: value
      }, () => {
        this.onUpdate()
      })
    }
  }

  onUpdate (updated) {
    if (this.props.onUpdate) {
      let toUpdate = {
        name: this.props.name,
        timeOfDay: this.state.timeOfDay,
        type: this.state.type,
        number: this.getFormattedNumber(),
        ...updated
      }
      this.props.onUpdate(toUpdate)
    }
  }

  getFormattedNumber () {
    switch (this.state.type) {
      case 'Domestic':
        console.log(this.state.domestic)
        return [
          this.state.domestic.first,
          this.state.domestic.second,
          this.state.domestic.third
        ].join('')
      case 'DSN':
        return [
          this.state.dsn.first,
          this.state.dsn.second
        ].join('')
      case 'International':
        return [
          this.state.international.first,
          this.state.international.second,
          this.state.international.third
        ].join('')
      default:
        return ''
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

  dsn () {
    return (
      <div>
        <Text
          name="dsn_first"
          className="number three"
          placeholder="000"
          pattern="\d{3}"
          label=""
          aria-describedby=""
          disabled={this.state.disabled}
          maxlength="3"
          minlength="3"
          readonly={this.state.readonly}
          required={this.state.required}
          value={this.state.dsn.first}
          onChange={this.handleNumberChange('dsn', 'first').bind(this)}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onValidate={this.handleValidation}
        />
        <span className="separator">-</span>
        <Text
          name="dsn_second"
          className="number four"
          placeholder="0000"
          pattern="\d{4}"
          label=""
          aria-describedby=""
          disabled={this.state.disabled}
          minlengh="4"
          maxlength="4"
          readonly={this.state.readonly}
          required={this.state.required}
          step="1"
          value={this.state.dsn.second}
          onChange={this.handleNumberChange('dsn', 'second').bind(this)}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onValidate={this.handleValidation}
        />
      </div>
    )
  }

  domestic () {
    return (
      <div>
        <span className="separator">(</span>
        <Text
          name="domestic_first"
          className="number three"
          placeholder="000"
          label=""
          aria-describedby=""
          disabled={this.state.disabled}
          maxlength="3"
          pattern="\d{3}"
          readonly={this.state.readonly}
          required={this.state.required}
          value={this.state.domestic.first}
          onChange={this.handleNumberChange('domestic', 'first').bind(this)}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onValidate={this.handleValidation}
        />
        <span className="separator">)</span>
        <Text
          name="domestic_second"
          className="number three"
          placeholder="000"
          label=""
          aria-describedby=""
          disabled={this.state.disabled}
          maxlength="3"
          pattern="\d{3}"
          readonly={this.state.readonly}
          required={this.state.required}
          value={this.state.domestic.second}
          onChange={this.handleNumberChange('domestic', 'second').bind(this)}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onValidate={this.handleValidation}
        />
        <span className="separator">-</span>
        <Text
          name="domestic_third"
          className="number four"
          placeholder="0000"
          label=""
          aria-describedby=""
          disabled={this.state.disabled}
          minlengh="4"
          maxlength="4"
          pattern="\d{4}"
          readonly={this.state.readonly}
          required={this.state.required}
          value={this.state.domestic.third}
          onChange={this.handleNumberChange('domestic', 'third').bind(this)}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onValidate={this.handleValidation}
        />
        <span className="separator">Ext</span>
        <Text
          name="domestic_extension"
          className="number four"
          placeholder="0000"
          label=""
          aria-describedby=""
          disabled={this.state.disabled}
          maxlength="4"
          pattern="\d{0,4}"
          readonly={this.state.readonly}
          required={this.state.required}
          value={this.state.domestic.extension}
          onChange={this.handleNumberChange('domestic', 'extension').bind(this)}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onValidate={this.handleValidation}
        />
      </div>
    )
  }

  international () {
    return (
      <div className="international">
        <span className="separator">+</span>
        <Text
          name="int_first"
          className="number three"
          placeholder="000"
          label=""
          aria-describedby=""
          disabled={this.state.disabled}
          maxlength="3"
          pattern="\d{3}"
          readonly={this.state.readonly}
          required={this.state.required}
          value={this.state.international.first}
          onChange={this.handleNumberChange('international', 'first').bind(this)}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onValidate={this.handleValidation}
        />
        <span className="separator">-</span>
        <Text
          name="int_second"
          className="number four"
          placeholder="0000"
          label=""
          aria-describedby=""
          disabled={this.state.disabled}
          maxlength="4"
          pattern="\d{4}"
          readonly={this.state.readonly}
          required={this.state.required}
          value={this.state.international.second}
          onChange={this.handleNumberChange('international', 'second').bind(this)}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onValidate={this.handleValidation}
        />
        <span className="separator">-</span>
        <Text
          name="int_third"
          className="number four"
          placeholder="0000"
          label=""
          aria-describedby=""
          disabled={this.state.disabled}
          maxlength="4"
          pattern="\d{4}"
          readonly={this.state.readonly}
          required={this.state.required}
          value={this.state.international.third}
          onChange={this.handleNumberChange('international', 'third').bind(this)}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onValidate={this.handleValidation}
        />
        <span className="separator">Ext</span>
        <Text
          name="int_extension"
          className="number four"
          placeholder="0000"
          label=""
          aria-describedby=""
          disabled={this.state.disabled}
          maxlength="4"
          pattern="\d{0,4}"
          readonly={this.state.readonly}
          required={this.state.required}
          value={this.state.international.extension}
          onChange={this.handleNumberChange('international', 'extension').bind(this)}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onValidate={this.handleValidation}
        />
      </div>
    )
  }

  render () {
    return (
      <div className="telephone">
        {this.state.type === 'Domestic' && this.domestic()}
        {this.state.type === 'DSN' && this.dsn()}
        {this.state.type === 'International' && this.international()}
        <div>
          <RadioGroup className="option-list branch" selectedValue={this.state.timeOfDay}>
            <Radio name="timeofday"
              label="Day"
              value="Day"
              onChange={this.handleRadioChange('timeOfDay').bind(this, 'Day')}
              onValidate={this.handleValidation}
            />
            <Radio name="timeofday"
              label="Night"
              value="Night"
              onChange={this.handleRadioChange('timeOfDay').bind(this, 'Night')}
              onValidate={this.handleValidation}
            />
            <Radio name="timeofday"
              label="Both"
              value="Both"
              onChange={this.handleRadioChange('timeOfDay').bind(this, 'Both')}
              onValidate={this.handleValidation}
            />
          </RadioGroup>
        </div>
        <div>
          <RadioGroup className="option-list branch" selectedValue={this.state.type}>
            <Radio name="phonetype"
              label="Domestic"
              value="Domestic"
              onChange={this.handleRadioChange('type').bind(this, 'Domestic')}
              onValidate={this.handleValidation}
            />
            <Radio name="phonetype"
              label="DSN"
              value="DSN"
              onChange={this.handleRadioChange('type').bind(this, 'DSN')}
              onValidate={this.handleValidation}
            />
            <Radio name="phonetype"
              label="International"
              value="International"
              onChange={this.handleRadioChange('type').bind(this, 'International')}
              onValidate={this.handleValidation}
            />
          </RadioGroup>
        </div>
      </div>
    )
  }
}
