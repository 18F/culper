import React from 'react'
import { i18n } from '../../../config'
import ValidationElement from '../ValidationElement'
import Text from '../Text'
import Radio from '../Radio'
import RadioGroup from '../RadioGroup'
import Show from '../Show'

const defaultNumbers = {
  domestic: {
    first: '',
    second: '',
    third: ''
  },
  international: {
    first: '',
    second: ''
  },
  dsn: {
    first: '',
    second: ''
  }
}

export default class Telephone extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      value: props.value,
      focus: props.focus || false,
      error: props.error || false,
      valid: props.valid || false,
      type: props.type || 'Domestic',
      numberType: props.numberType,
      timeOfDay: props.timeOfDay || 'Both',
      number: props.number,
      extension: props.extension,
      noNumber: props.noNumber,
      domestic: {
        first: this.parseNumber(0, 3, props.number),
        second: this.parseNumber(3, 6, props.number),
        third: this.parseNumber(6, 10, props.number)
      },
      dsn: {
        first: this.parseNumber(0, 3, props.number),
        second: this.parseNumber(3, 7, props.number)
      },
      international: {
        first: this.parseNumber(0, 3, props.number),
        second: this.parseNumber(3, 13, props.number)
      }
    }

    this.handleNumberTypeChange = this.handleNumberTypeChange.bind(this)
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
        noNumber: '',
        [fieldType]: fieldTypeObj
      }, () => {
        this.onUpdate()
        this.forceUpdate()
      })
    }
  }

  handleTimeOfDayChange (value) {
    this.setState({
      timeOfDay: value
    }, () => {
      this.onUpdate()
    })
  }

  handleNumberTypeChange (event) {
    this.setState({ numberType: event.target.value }, () => {
      this.onUpdate()
    })
  }

  handleExtensionChange (e) {
    const ext = e.target.value
    this.setState({
      extension: ext
    }, () => {
      this.onUpdate()
    })
  }

  handleNoNumberChange (e) {
    this.setState({
      noNumber: e.target.value,
      timeOfDay: '',
      numberType: '',
      extension: '',
      ...defaultNumbers
    }, () => {
      this.onUpdate()
    })
  }

  toggleTypeChange (type) {
    this.setState({
      ...defaultNumbers,
      type: type
    }, () => {
      this.onUpdate()
    })
  }

  onUpdate (updated) {
    if (this.props.onUpdate) {
      let toUpdate = {
        name: this.props.name,
        timeOfDay: this.state.timeOfDay,
        type: this.state.type,
        numberType: this.state.numberType,
        number: this.getFormattedNumber(),
        extension: this.state.extension,
        noNumber: this.state.noNumber,
        ...updated
      }

      this.props.onUpdate(toUpdate)
    }
  }

  getFormattedNumber () {
    switch (this.state.type) {
      case 'Domestic':
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
  handleValidation (event, status, error) {
    this.setState({error: status === false, valid: status === true}, () => {
      super.handleValidation(event, status, error)
    })
  }

  dsn () {
    return (
      <div>
        <label>{i18n.t('telephone.dsn.label')}</label>
        <Text name="dsn_first"
              className="number three"
              placeholder="000"
              pattern="\d{3}"
              label=""
              aria-describedby=""
              disabled={this.props.disabled}
              maxlength="3"
              minlength="3"
              readonly={this.props.readonly}
              required={this.props.required}
              value={this.state.dsn.first}
              onChange={this.handleNumberChange('dsn', 'first').bind(this)}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onValidate={this.handleValidation}
              />
        <span className="separator">-</span>
        <Text name="dsn_second"
              className="number four"
              placeholder="0000"
              pattern="\d{4}"
              label=""
              aria-describedby=""
              disabled={this.props.disabled}
              minlengh="4"
              maxlength="4"
              readonly={this.props.readonly}
              required={this.props.required}
              step="1"
              value={this.state.dsn.second}
              onChange={this.handleNumberChange('dsn', 'second').bind(this)}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onValidate={this.handleValidation}
              />
        <span className="separator extension">or</span>
        <RadioGroup className="nonumber" selectedValue={this.state.noNumber}>
          <Radio name="nonumber"
                 label={i18n.t('telephone.noNumber.label')}
                 value="NA"
                 onChange={this.handleNoNumberChange.bind(this)}
                 />
        </RadioGroup>
      </div>
    )
  }

  domestic () {
    return (
      <div>
        <label>{i18n.t('telephone.domestic.label')}</label>

        <span className="separator">(</span>
        <Text name="domestic_first"
              className="number three"
              placeholder="000"
              label=""
              aria-describedby=""
              disabled={this.props.disabled}
              maxlength="3"
              pattern="\d{3}"
              readonly={this.props.readonly}
              required={this.props.required}
              value={this.state.domestic.first}
              onChange={this.handleNumberChange('domestic', 'first').bind(this)}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onValidate={this.handleValidation}
              />
        <span className="separator">)</span>
        <Text name="domestic_second"
              className="number three"
              placeholder="000"
              label=""
              aria-describedby=""
              disabled={this.props.disabled}
              maxlength="3"
              pattern="\d{3}"
              readonly={this.props.readonly}
              required={this.props.required}
              value={this.state.domestic.second}
              onChange={this.handleNumberChange('domestic', 'second').bind(this)}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onValidate={this.handleValidation}
              />
        <span className="separator">-</span>
        <Text name="domestic_third"
              className="number four"
              placeholder="0000"
              label=""
              aria-describedby=""
              disabled={this.props.disabled}
              minlengh="4"
              maxlength="4"
              pattern="\d{4}"
              readonly={this.props.readonly}
              required={this.props.required}
              value={this.state.domestic.third}
              onChange={this.handleNumberChange('domestic', 'third').bind(this)}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onValidate={this.handleValidation}
              />
        <span className="separator"></span>
        <Text name="domestic_extension"
              className="number four"
              placeholder="0000"
              label={i18n.t('telephone.domestic.extension.label')}
              aria-describedby=""
              disabled={this.props.disabled}
              maxlength="4"
              pattern="\d{0,4}"
              readonly={this.props.readonly}
              required={this.props.required}
              value={this.state.extension}
              onChange={this.handleExtensionChange.bind(this)}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onValidate={this.handleValidation}
              />
        <span className="separator extension">or</span>
        <RadioGroup className="nonumber" selectedValue={this.state.noNumber}>
          <Radio name="nonumber"
                 label={i18n.t('telephone.noNumber.label')}
                 value="NA"
                 onChange={this.handleNoNumberChange.bind(this)}
                 />
        </RadioGroup>
      </div>
    )
  }

  international () {
    return (
      <div className="international">
        <label>{i18n.t('telephone.international.label')}</label>
        <span className="separator">+</span>
        <Text name="int_first"
              className="number three"
              placeholder="000"
              label=""
              aria-describedby=""
              disabled={this.props.disabled}
              maxlength="3"
              pattern="\d{3}"
              readonly={this.props.readonly}
              required={this.props.required}
              value={this.state.international.first}
              onChange={this.handleNumberChange('international', 'first').bind(this)}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onValidate={this.handleValidation}
              />
        <span className="separator">-</span>
        <Text name="int_second"
              className="number ten"
              placeholder="0000000000"
              label=""
              aria-describedby=""
              disabled={this.props.disabled}
              maxlength="10"
              pattern="\d{10}"
              readonly={this.props.readonly}
              required={this.props.required}
              value={this.state.international.second}
              onChange={this.handleNumberChange('international', 'second').bind(this)}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onValidate={this.handleValidation}
              />
        <span className="separator"></span>
        <Text name="domestic_extension"
              className="number four"
              placeholder="0000"
              label={i18n.t('telephone.international.extension.label')}
              aria-describedby=""
              disabled={this.props.disabled}
              maxlength="4"
              pattern="\d{0,4}"
              readonly={this.props.readonly}
              required={this.props.required}
              value={this.state.extension}
              onChange={this.handleExtensionChange.bind(this)}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onValidate={this.handleValidation}
              />
        <span className="separator extension">or</span>
        <RadioGroup className="nonumber" selectedValue={this.state.noNumber}>
          <Radio name="nonumber"
                 label={i18n.t('telephone.noNumber.label')}
                 value="NA"
                 onChange={this.handleNoNumberChange.bind(this)}
                 />
        </RadioGroup>
      </div>
    )
  }

  render () {
    return (
      <div className="telephone">
        <div className="type">
          Switch to:
          <Show when={this.state.type !== 'Domestic'}>
            <span className="type">
              <a className="domestic-number" href="javascript:;" onClick={this.toggleTypeChange.bind(this, 'Domestic')}>
                {i18n.t('telephone.type.domestic')}
              </a>
            </span>
          </Show>
          <Show when={this.state.type !== 'DSN'}>
            <span className="type">
              <a className="dsn-number" href="javascript:;" onClick={this.toggleTypeChange.bind(this, 'DSN')}>
                {i18n.t('telephone.type.dsn')}
              </a>
            </span>
          </Show>
          <Show when={this.state.type !== 'International'}>
            <span className="type">
              <a className="international-number" href="javascript:;" onClick={this.toggleTypeChange.bind(this, 'International')}>
                {i18n.t('telephone.type.international')}
              </a>
            </span>
          </Show>
        </div>

        <Show when={this.state.type === 'Domestic'}>
          { this.domestic() }
        </Show>

        <Show when={this.state.type === 'DSN'}>
          { this.dsn() }
        </Show>

        <Show when={this.state.type === 'International'}>
          { this.international() }
        </Show>

        <div className="timeofday">
          <RadioGroup selectedValue={this.state.timeOfDay} name="timeofday">
            <Radio native={true}
                   className="time day"
                   label={i18n.t('telephone.timeOfDay.day')}
                   value="Day"
                   onChange={this.handleTimeOfDayChange.bind(this, 'Day')}
                   onValidate={this.handleValidation}
                   />
            <Radio native={true}
                   className="time night"
                   label={i18n.t('telephone.timeOfDay.night')}
                   value="Night"
                   onChange={this.handleTimeOfDayChange.bind(this, 'Night')}
                   onValidate={this.handleValidation}
                   />
          </RadioGroup>
        </div>

        <div className="phonetype">
          <label>Select phone number type</label>
          <RadioGroup selectedValue={this.state.numberType}>
            <Radio name="numbertype-cell"
                   className="phonetype-option cell"
                   label={i18n.t('telephone.numberType.cell')}
                   value="Cell"
                   onChange={this.handleNumberTypeChange}
                   onValidate={this.handleValidation}
                   />
            <Radio name="numbertype-home"
                   className="phonetype-option home"
                   label={i18n.t('telephone.numberType.home')}
                   value="Home"
                   onChange={this.handleNumberTypeChange}
                   onValidate={this.handleValidation}
                   />
            <Radio name="numbertype-work"
                   className="phonetype-option work"
                   label={i18n.t('telephone.numberType.work')}
                   value="Work"
                   onChange={this.handleNumberTypeChange}
                   onValidate={this.handleValidation}
                   />
            <Radio name="numbertype-other"
                   className="phonetype-option other"
                   label={i18n.t('telephone.numberType.other')}
                   value="Other"
                   onChange={this.handleNumberTypeChange}
                   onValidate={this.handleValidation}
                   />
          </RadioGroup>
        </div>
      </div>
    )
  }
}
