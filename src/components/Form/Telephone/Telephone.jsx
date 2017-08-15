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
      uid: `${this.props.name}-${super.guid()}`,
      value: props.value,
      type: props.type,
      numberType: props.numberType,
      timeOfDay: props.timeOfDay,
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
    this.handleNoNumberChange = this.handleNoNumberChange.bind(this)
    this.handleError = this.handleError.bind(this)
    this.handleErrorDomestic = this.handleErrorDomestic.bind(this)
    this.handleErrorDomesticFirst = this.handleErrorDomesticFirst.bind(this)
    this.handleErrorDomesticSecond = this.handleErrorDomesticSecond.bind(this)
    this.handleErrorDomesticThird = this.handleErrorDomesticThird.bind(this)
    this.handleErrorDomesticExtension = this.handleErrorDomesticExtension.bind(this)
    this.handleErrorInternational = this.handleErrorInternational.bind(this)
    this.handleErrorInternationalFirst = this.handleErrorInternationalFirst.bind(this)
    this.handleErrorInternationalSecond = this.handleErrorInternationalSecond.bind(this)
    this.handleErrorInternationalExtension = this.handleErrorInternationalExtension.bind(this)
    this.handleErrorDsn = this.handleErrorDsn.bind(this)
    this.handleErrorDsnFirst = this.handleErrorDsnFirst.bind(this)
    this.handleErrorDsnSecond = this.handleErrorDsnSecond.bind(this)
    this.handleErrorNoNumber = this.handleErrorNoNumber.bind(this)
    this.handleErrorTime = this.handleErrorTime.bind(this)
    this.handleErrorType = this.handleErrorType.bind(this)
    this.handleErrorNumberType = this.handleErrorNumberType.bind(this)
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

  handleNumberTypeChange (cb) {
    this.setState({ numberType: cb.value }, () => {
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

  handleNoNumberChange (cb) {
    this.setState({
      noNumber: cb.value,
      timeOfDay: '',
      numberType: '',
      extension: '',
      ...defaultNumbers
    }, () => {
      switch (this.state.type) {
        case 'Domestic':
          this.refs.domestic_first.refs.text.refs.input.focus()
          this.refs.domestic_first.refs.text.refs.input.blur()
          this.refs.domestic_second.refs.text.refs.input.focus()
          this.refs.domestic_second.refs.text.refs.input.blur()
          this.refs.domestic_third.refs.text.refs.input.focus()
          this.refs.domestic_third.refs.text.refs.input.blur()
          this.refs.domestic_extension.refs.text.refs.input.focus()
          this.refs.domestic_extension.refs.text.refs.input.blur()
          break
        case 'DSN':
          this.refs.dsn_first.refs.text.refs.input.focus()
          this.refs.dsn_first.refs.text.refs.input.blur()
          this.refs.dsn_second.refs.text.refs.input.focus()
          this.refs.dsn_second.refs.text.refs.input.blur()
          break
        case 'International':
          this.refs.int_first.refs.text.refs.input.focus()
          this.refs.int_first.refs.text.refs.input.blur()
          this.refs.int_second.refs.text.refs.input.focus()
          this.refs.int_second.refs.text.refs.input.blur()
          this.refs.int_extension.refs.text.refs.input.focus()
          this.refs.int_extension.refs.text.refs.input.blur()
          break
      }
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

  handleErrorDomesticFirst (value, arr) {
    return this.handleErrorDomestic('first', value, arr)
  }

  handleErrorDomesticSecond (value, arr) {
    return this.handleErrorDomestic('second', value, arr)
  }

  handleErrorDomesticThird (value, arr) {
    return this.handleErrorDomestic('third', value, arr)
  }

  handleErrorDomesticExtension (value, arr) {
    return this.handleErrorDomestic('extension', value, arr)
  }

  handleErrorDomestic (code, value, arr) {
    return this.handleError(`domestic.${code}`, value, arr)
  }

  handleErrorInternationalFirst (value, arr) {
    return this.handleErrorInternational('first', value, arr)
  }

  handleErrorInternationalSecond (value, arr) {
    return this.handleErrorInternational('second', value, arr)
  }

  handleErrorInternationalExtension (value, arr) {
    return this.handleErrorInternational('extension', value, arr)
  }

  handleErrorInternational (code, value, arr) {
    return this.handleError(`international.${code}`, value, arr)
  }

  handleErrorDsnFirst (value, arr) {
    return this.handleErrorDsn('first', value, arr)
  }

  handleErrorDsnSecond (value, arr) {
    return this.handleErrorDsn('second', value, arr)
  }

  handleErrorDsn (code, value, arr) {
    return this.handleError(`dsn.${code}`, value, arr)
  }

  handleErrorNoNumber (value, arr) {
    return this.handleError('none', value, arr)
  }

  handleErrorTime (value, arr) {
    return this.handleError('time', value, arr)
  }

  handleErrorType (value, arr) {
    return this.handleError('type', value, arr)
  }

  handleErrorNumberType (value, arr) {
    return this.handleError('numberType', value, arr)
  }

  handleError (code, value, arr) {
    arr = arr.map(err => {
      return {
        code: `telephone.${code}.${err.code}`,
        valid: err.valid,
        uid: err.uid
      }
    })

    const requiredErr = arr.concat(this.constructor.errors.map(err => {
      return {
        code: `telephone.${err.code}`,
        valid: err.func(value, {...this.props, ...this.state}),
        uid: this.state.uid
      }
    }))

    // Take the original and concatenate our new error values to it
    this.props.onError(value, requiredErr)
    return arr
  }

  dsn () {
    return (
      <div className="numbers">
        <label className={this.state.noNumber ? 'disabled' : ''}>{i18n.t('telephone.dsn.label')}</label>
        <Text name="dsn_first"
              ref="dsn_first"
              className="number three"
              placeholder="000"
              pattern="\d{3}"
              label=""
              aria-describedby=""
              disabled={this.state.noNumber}
              maxlength="3"
              minlength="3"
              readonly={this.props.readonly}
              required={this.props.required}
              value={this.state.dsn.first}
              onChange={this.handleNumberChange('dsn', 'first').bind(this)}
              onError={this.handleErrorDsnFirst}
              tabNext={() => { this.props.tab(this.refs.dsn_second.refs.text.refs.input) }} />
        <span className="separator">-</span>
        <Text name="dsn_second"
              ref="dsn_second"
              className="number four"
              placeholder="0000"
              pattern="\d{4}"
              label=""
              aria-describedby=""
              disabled={this.state.noNumber}
              minlengh="4"
              maxlength="4"
              readonly={this.props.readonly}
              required={this.props.required}
              step="1"
              value={this.state.dsn.second}
              onChange={this.handleNumberChange('dsn', 'second').bind(this)}
              onError={this.handleErrorDsnSecond}
              tabBack={() => { this.props.tab(this.refs.dsn_first.refs.text.refs.input) }} />
        <Show when={this.props.allowNotApplicable}>
          <span>
            <span className="separator extension">or</span>
            <RadioGroup className="nonumber" selectedValue={this.state.noNumber}>
              <Radio name="nonumber"
                     label={i18n.t('telephone.noNumber.label')}
                     value="NA"
                     onUpdate={this.handleNoNumberChange}
                     onError={this.handleErrorNoNumber} />
            </RadioGroup>
          </span>
        </Show>
      </div>
    )
  }

  domestic () {
    return (
      <div className="numbers">
        <label className={this.state.noNumber ? 'disabled' : ''}>{i18n.t('telephone.domestic.label')}</label>

        <span className="separator">(</span>
        <Text name="domestic_first"
              ref="domestic_first"
              className="number three"
              placeholder="000"
              label=""
              aria-describedby=""
              disabled={this.state.noNumber}
              maxlength="3"
              pattern="\d{3}"
              readonly={this.props.readonly}
              required={this.props.required}
              value={this.state.domestic.first}
              onChange={this.handleNumberChange('domestic', 'first').bind(this)}
              onError={this.handleErrorDomesticFirst}
              tabNext={() => { this.props.tab(this.refs.domestic_second.refs.text.refs.input) }} />
        <span className="separator">)</span>
        <Text name="domestic_second"
              ref="domestic_second"
              className="number three"
              placeholder="000"
              label=""
              aria-describedby=""
              disabled={this.state.noNumber}
              maxlength="3"
              pattern="\d{3}"
              readonly={this.props.readonly}
              required={this.props.required}
              value={this.state.domestic.second}
              onChange={this.handleNumberChange('domestic', 'second').bind(this)}
              onError={this.handleErrorDomesticSecond}
              tabBack={() => { this.props.tab(this.refs.domestic_first.refs.text.refs.input) }}
              tabNext={() => { this.props.tab(this.refs.domestic_third.refs.text.refs.input) }} />
        <span className="separator">-</span>
        <Text name="domestic_third"
              ref="domestic_third"
              className="number four"
              placeholder="0000"
              label=""
              aria-describedby=""
              disabled={this.state.noNumber}
              minlengh="4"
              maxlength="4"
              pattern="\d{4}"
              readonly={this.props.readonly}
              required={this.props.required}
              value={this.state.domestic.third}
              onChange={this.handleNumberChange('domestic', 'third').bind(this)}
              onError={this.handleErrorDomesticThird}
              tabBack={() => { this.props.tab(this.refs.domestic_second.refs.text.refs.input) }}
              tabNext={() => { this.props.tab(this.refs.domestic_extension.refs.text.refs.input) }} />
        <span className="separator pound">#</span>
        <Text name="domestic_extension"
              ref="domestic_extension"
              className="number six"
              placeholder="000000"
              label={i18n.t('telephone.domestic.extension.label')}
              aria-describedby=""
              disabled={this.state.noNumber}
              maxlength="10"
              pattern="^\d{0,10}$"
              readonly={this.props.readonly}
              required={false}
              value={this.state.extension}
              onChange={this.handleExtensionChange.bind(this)}
              onError={this.handleErrorDomesticExtension}
              tabBack={() => { this.props.tab(this.refs.domestic_third.refs.text.refs.input) }} />
        <Show when={this.props.allowNotApplicable}>
          <span>
            <span className="separator extension">or</span>
            <RadioGroup className="nonumber" selectedValue={this.state.noNumber}>
              <Radio name="nonumber"
                      label={i18n.t('telephone.noNumber.label')}
                      value="NA"
                      onUpdate={this.handleNoNumberChange}
                      onError={this.handleErrorNoNumber} />
            </RadioGroup>
          </span>
        </Show>
      </div>
    )
  }

  international () {
    return (
      <div className="international numbers">
        <label className={this.state.noNumber ? 'disabled' : ''}>{i18n.t('telephone.international.label')}</label>
        <span className="separator">+</span>
        <Text name="int_first"
              ref="int_first"
              className="number three"
              placeholder="000"
              label=""
              aria-describedby=""
              disabled={this.state.noNumber}
              maxlength="3"
              pattern="\d{3}"
              readonly={this.props.readonly}
              required={this.props.required}
              value={this.state.international.first}
              onChange={this.handleNumberChange('international', 'first').bind(this)}
              onError={this.handleErrorInternationalFirst}
              tabNext={() => { this.props.tab(this.refs.int_second.refs.text.refs.input) }} />
        <span className="separator">-</span>
        <Text name="int_second"
              ref="int_second"
              className="number ten"
              placeholder="0000000000"
              label=""
              aria-describedby=""
              disabled={this.state.noNumber}
              maxlength="10"
              pattern="\d{10}"
              readonly={this.props.readonly}
              required={this.props.required}
              value={this.state.international.second}
              onChange={this.handleNumberChange('international', 'second').bind(this)}
              onError={this.handleErrorInternationalSecond}
              tabBack={() => { this.props.tab(this.refs.int_first.refs.text.refs.input) }}
              tabNext={() => { this.props.tab(this.refs.int_extension.refs.text.refs.input) }} />
        <span className="separator pound">#</span>
        <Text name="int_extension"
              ref="int_extension"
              className="number six"
              placeholder="000000"
              label={i18n.t('telephone.international.extension.label')}
              aria-describedby=""
              disabled={this.state.noNumber}
              maxlength="10"
              pattern="^\d{0,10}$"
              readonly={this.props.readonly}
              required={false}
              value={this.state.extension}
              onChange={this.handleExtensionChange.bind(this)}
              onError={this.handleErrorInternationalExtension}
              tabBack={() => { this.props.tab(this.refs.int_second.refs.text.refs.input) }} />
        <Show when={this.props.allowNotApplicable}>
          <span>
            <span className="separator extension">or</span>
            <RadioGroup className="nonumber" selectedValue={this.state.noNumber}>
              <Radio name="nonumber"
                     label={i18n.t('telephone.noNumber.label')}
                     value="NA"
                     onUpdate={this.handleNoNumberChange}
                     onError={this.handleErrorNoNumber} />
            </RadioGroup>
          </span>
        </Show>
      </div>
    )
  }

  render () {
    const klass = `telephone ${this.props.className || ''}`.trim()
    return (
      <div className={klass}>
        <Show when={this.props.label}>
          <span>{this.props.label}</span>
        </Show>
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
                   disabled={this.state.noNumber}
                   onChange={this.handleTimeOfDayChange.bind(this, 'Day')}
                   onError={this.handleErrorTime}
                   />
            <Radio native={true}
                   className="time night"
                   label={i18n.t('telephone.timeOfDay.night')}
                   value="Night"
                   disabled={this.state.noNumber}
                   onChange={this.handleTimeOfDayChange.bind(this, 'Night')}
                   onError={this.handleErrorTime}
                   />
            <Radio native={true}
                   className="time both"
                   label={i18n.t('telephone.timeOfDay.both')}
                   value="Both"
                   disabled={this.state.noNumber}
                   onChange={this.handleTimeOfDayChange.bind(this, 'Both')}
                   onError={this.handleErrorTime}
                   />
          </RadioGroup>
        </div>

        <div className="phonetype">
          <label className={this.state.noNumber ? 'disabled' : ''}>Select phone number type</label>
          <RadioGroup selectedValue={this.state.numberType} required={this.props.required} onError={this.handleErrorNumberType}>
            <Radio name="numbertype-cell"
                   className="phonetype-option cell"
                   label={i18n.t('telephone.numberType.cell')}
                   value="Cell"
                   disabled={this.state.noNumber}
                   onUpdate={this.handleNumberTypeChange}
                   onError={this.handleErrorType}
                   />
            <Radio name="numbertype-home"
                   className="phonetype-option home"
                   label={i18n.t('telephone.numberType.home')}
                   value="Home"
                   disabled={this.state.noNumber}
                   onUpdate={this.handleNumberTypeChange}
                   onError={this.handleErrorType}
                   />
            <Radio name="numbertype-work"
                   className="phonetype-option work"
                   label={i18n.t('telephone.numberType.work')}
                   value="Work"
                   disabled={this.state.noNumber}
                   onUpdate={this.handleNumberTypeChange}
                   onError={this.handleErrorType}
                   />
            <Radio name="numbertype-other"
                   className="phonetype-option other"
                   label={i18n.t('telephone.numberType.other')}
                   value="Other"
                   disabled={this.state.noNumber}
                   onUpdate={this.handleNumberTypeChange}
                   onError={this.handleErrorType}
                   />
          </RadioGroup>
        </div>
      </div>
    )
  }
}

Telephone.defaultProps = {
  name: 'telephone',
  value: '',
  type: 'Domestic',
  numberType: '',
  timeOfDay: 'Both',
  number: '',
  extension: '',
  noNumber: '',
  allowNotApplicable: true,
  tab: (input) => { input.focus() },
  onError: (value, arr) => { return arr }
}

Telephone.errors = [
  {
    code: 'required',
    func: (value, props) => {
      if (props.required) {
        return !!props.domestic.first &&
          !!props.domestic.second &&
          !!props.domestic.third &&
          !!props.numberType
      }
      return true
    }
  }
]
