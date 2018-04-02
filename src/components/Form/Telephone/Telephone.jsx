import React from 'react'
import { i18n } from '../../../config'
import ValidationElement from '../ValidationElement'
import Generic from '../Generic'
import Text from '../Text'
import Checkbox from '../Checkbox'
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

const padleft = (str, len, char = ' ') => {
  let padding = ''
  for (let i = 0; i < len; i++) {
    padding += char
  }
  return padding.substring(0, padding.length - str.length) + str
}

const trimleading = (str) => {
  return (str || '').trim()
}

const digitsOnly = (value = '') => {
  if (!value.match(/^(\s*|\d+)$/)) {
    value = value.replace(/\D/g, '')
  }
  return value
}

export default class Telephone extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      uid: `${this.props.name}-${super.guid()}`,
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

    this.update = this.update.bind(this)
    this.updateDomesticFirst = this.updateDomesticFirst.bind(this)
    this.updateDomesticSecond = this.updateDomesticSecond.bind(this)
    this.updateDomesticThird = this.updateDomesticThird.bind(this)
    this.updateDsnFirst = this.updateDsnFirst.bind(this)
    this.updateDsnSecond = this.updateDsnSecond.bind(this)
    this.updateExtension = this.updateExtension.bind(this)
    this.updateInternationalFirst = this.updateInternationalFirst.bind(this)
    this.updateInternationalSecond = this.updateInternationalSecond.bind(this)
    this.updateNoNumber = this.updateNoNumber.bind(this)
    this.updateTimeOfDay = this.updateTimeOfDay.bind(this)
    this.updateNumberType = this.updateNumberType.bind(this)
    this.updateToggleDomestic = this.updateToggleDomestic.bind(this)
    this.updateToggleDsn = this.updateToggleDsn.bind(this)
    this.updateToggleInternational = this.updateToggleInternational.bind(this)
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
    this.errors = []
  }

  parseNumber (start, end, number) {
    if (!number) {
      return ''
    }
    return number.substring(start, end)
  }

  update (queue) {
    this.props.onUpdate({
      name: this.props.name,
      timeOfDay: this.props.timeOfDay,
      type: this.props.type || 'Domestic',
      numberType: this.props.showNumberType ? this.props.numberType : 'NA',
      number: this.getFormattedNumber(),
      extension: this.props.extension,
      noNumber: this.props.noNumber || false,
      ...queue
    })
  }

  updateNumber (type, values) {
    this.update({ type, noNumber: false })
  }

  updateToggleDomestic () {
    this.setState({ ...defaultNumbers }, () => {
      this.updateNumber('Domestic')
    })
  }

  updateToggleDsn () {
    this.setState({ ...defaultNumbers }, () => {
      this.updateNumber('DSN')
    })
  }

  updateToggleInternational () {
    this.setState({ ...defaultNumbers }, () => {
      this.updateNumber('International')
    })
  }

  updateDsnFirst (values) {
    const dsn = { ...this.state.dsn, first: values.value }
    this.setState({ dsn }, () => {
      this.updateNumber('DSN')
    })
  }

  updateDsnSecond (values) {
    const dsn = { ...this.state.dsn, second: values.value }
    this.setState({ dsn }, () => {
      this.updateNumber('DSN')
    })
  }

  updateDomesticFirst (values) {
    const domestic = { ...this.state.domestic, first: values.value }
    this.setState({ domestic }, () => {
      this.updateNumber('Domestic')
    })
  }

  updateDomesticSecond (values) {
    const domestic = { ...this.state.domestic, second: values.value }
    this.setState({ domestic }, () => {
      this.updateNumber('Domestic')
    })
  }

  updateDomesticThird (values) {
    const domestic = { ...this.state.domestic, third: values.value }
    this.setState({ domestic }, () => {
      this.updateNumber('Domestic')
    })
  }

  updateInternationalFirst (values) {
    const international = { ...this.state.international, first: values.value }
    this.setState({ international }, () => {
      this.updateNumber('International')
    })
  }

  updateInternationalSecond (values) {
    const international = { ...this.state.international, second: values.value }
    this.setState({ international }, () => {
      this.updateNumber('International')
    })
  }

  updateExtension (values) {
    this.update({
      extension: values.value
    })
  }

  updateNoNumber (values) {
    this.setState({ ...defaultNumbers }, () => {
      this.update({
        noNumber: !this.props.noNumber,
        timeOfDay: '',
        numberType: '',
        extension: ''
      })
    })
  }

  updateTimeOfDay (values) {
    this.update({
      timeOfDay: values.value
    })
  }

  updateNumberType (values) {
    this.update({
      numberType: values.value
    })
  }

  getFormattedNumber () {
    switch (this.props.type) {
      case 'Domestic':
        return [
          padleft(this.state.domestic.first, 3),
          padleft(this.state.domestic.second, 3),
          padleft(this.state.domestic.third, 4)
        ].join('').trim()
      case 'DSN':
        return [
          padleft(this.state.dsn.first, 3),
          padleft(this.state.dsn.second, 4)
        ].join('').trim()
      case 'International':
        return [
          padleft(this.state.international.first, 3),
          this.state.international.second
        ].join('').trim()
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
    let localErr = arr.map(err => {
      return {
        code: `telephone.${code}.${err.code}`,
        valid: err.valid,
        uid: err.uid
      }
    })

    // Replace errors with new values
    for (let err of localErr) {
      const idx = this.errors.findIndex(x => x.code === err.code)
      if (idx > -1) {
        this.errors[idx] = err
      } else {
        this.errors.push(err)
      }
    }

    // Nullify unused codes
    const allowedTypes = ['Domestic', 'DSN', 'International']
    allowedTypes.filter(x => x !== (this.props.type || 'Domestic')).forEach(x => {
      this.errors.filter(err => err.code.indexOf(`telephone.${x.toLowerCase()}.`) > -1).forEach(err => {
        err.valid = null
      })
    })

    // Zero out any required fields if IDK is selected
    if (code === 'none' && value === true) {
      this.errors.filter(err => err.code.indexOf(`.required`) > -1).forEach(err => {
        err.valid = true
      })
    }

    // Run the entire component through it's own error checks as a whole
    const requiredErr = this.errors.concat(this.constructor.errors.map(err => {
      let errProps = {...this.props, ...this.state}
      if (code === 'none') {
        errProps.noNumber = value
      }

      return {
        code: `telephone.${err.code}`,
        valid: err.func(value, errProps),
        uid: this.state.uid
      }
    }))

    // Take the original and concatenate our new error values to it
    this.props.onError(value, requiredErr)
    return localErr
  }

  dsn () {
    return (
      <div className="numbers">
        <label className={`${this.props.typeClass || ''} ${this.props.noNumber ? 'disabled' : ''}`.trim()}>{i18n.t('telephone.dsn.label')}</label>
        <Text name="dsn_first"
              ref="dsn_first"
              className="number three"
              placeholder="000"
              pattern="\d{3}"
              prefilter={digitsOnly}
              label=""
              ariaLabel={i18n.t('telephone.aria.dsnThree')}
              aria-describedby=""
              disabled={this.props.noNumber}
              maxlength="3"
              minlength="3"
              readonly={this.props.readonly}
              required={this.required('DSN')}
              value={trimleading(this.state.dsn.first)}
              onUpdate={this.updateDsnFirst}
              onError={this.handleErrorDsnFirst}
              tabNext={() => { this.props.tab(this.refs.dsn_second.refs.text.refs.input) }} />
        <span className="separator">-</span>
        <Text name="dsn_second"
              ref="dsn_second"
              className="number four"
              placeholder="0000"
              pattern="\d{4}"
              prefilter={digitsOnly}
              label=""
              ariaLabel={i18n.t('telephone.aria.dsnFour')}
              aria-describedby=""
              disabled={this.props.noNumber}
              minlengh="4"
              maxlength="4"
              readonly={this.props.readonly}
              required={this.required('DSN')}
              step="1"
              value={trimleading(this.state.dsn.second)}
              onUpdate={this.updateDsnSecond}
              onError={this.handleErrorDsnSecond}
              tabBack={() => { this.props.tab(this.refs.dsn_first.refs.text.refs.input) }} />
        <Show when={this.props.allowNotApplicable}>
          <span>
            <span className="separator extension">or</span>
              <Checkbox name="nonumber"
                        className="nonumber"
                        label={i18n.t('telephone.noNumber.label')}
                        value="NA"
                        checked={this.props.noNumber}
                        onUpdate={this.updateNoNumber}
                        onError={this.handleErrorNoNumber} />
          </span>
        </Show>
      </div>
    )
  }

  domestic () {
    return (
      <div className="numbers">
        <label className={`${this.props.typeClass || ''} ${this.props.noNumber ? 'disabled' : ''}`.trim()}>{i18n.t('telephone.domestic.label')}</label>
        <span className="separator">(</span>
        <Text name="domestic_first"
              ref="domestic_first"
              className="number three"
              placeholder="000"
              label=""
              ariaLabel={i18n.t('telephone.aria.domesticAreaCode')}
              disabled={this.props.noNumber}
              maxlength="3"
              pattern="\d{3}"
              prefilter={digitsOnly}
              readonly={this.props.readonly}
              required={this.required('Domestic')}
              value={trimleading(this.state.domestic.first)}
              onUpdate={this.updateDomesticFirst}
              onError={this.handleErrorDomesticFirst}
              tabNext={() => { this.props.tab(this.refs.domestic_second.refs.text.refs.input) }} />
        <span className="separator">)</span>
        <Text name="domestic_second"
              ref="domestic_second"
              className="number three"
              placeholder="000"
              label=""
              ariaLabel={i18n.t('telephone.aria.domesticThree')}
              disabled={this.props.noNumber}
              maxlength="3"
              pattern="\d{3}"
              prefilter={digitsOnly}
              readonly={this.props.readonly}
              required={this.required('Domestic')}
              value={trimleading(this.state.domestic.second)}
              onUpdate={this.updateDomesticSecond}
              onError={this.handleErrorDomesticSecond}
              tabBack={() => { this.props.tab(this.refs.domestic_first.refs.text.refs.input) }}
            tabNext={() => { this.props.tab(this.refs.domestic_third.refs.text.refs.input) }} />
        <span className="separator">-</span>
        <Text name="domestic_third"
              ref="domestic_third"
              className="number four"
              placeholder="0000"
              label=""
              ariaLabel={i18n.t('telephone.aria.domesticFour')}
              disabled={this.props.noNumber}
              minlengh="4"
              maxlength="4"
              pattern="\d{4}"
              prefilter={digitsOnly}
              readonly={this.props.readonly}
              required={this.required('Domestic')}
              value={trimleading(this.state.domestic.third)}
              onUpdate={this.updateDomesticThird}
              onError={this.handleErrorDomesticThird}
              tabBack={() => { this.props.tab(this.refs.domestic_second.refs.text.refs.input) }}
              tabNext={() => { this.props.tab(this.refs.domestic_extension.refs.text.refs.input) }} />
        <span className="separator pound">#</span>
        <Text name="domestic_extension"
              ref="domestic_extension"
              className="number six"
              placeholder="000000"
              label={i18n.t('telephone.domestic.extension.label')}
              ariaLabel={i18n.t('telephone.aria.extension')}
              disabled={this.props.noNumber}
              maxlength="10"
              pattern="^\d{0,10}$"
              prefilter={digitsOnly}
              readonly={this.props.readonly}
              required={false}
              value={this.props.extension}
              onUpdate={this.updateExtension}
              onError={this.handleErrorDomesticExtension}
              tabBack={() => { this.props.tab(this.refs.domestic_third.refs.text.refs.input) }} />
        <Show when={this.props.allowNotApplicable}>
          <span>
            <span className="separator extension">or</span>
              <Checkbox name="nonumber"
                        className="nonumber"
                        label={i18n.t('telephone.noNumber.label')}
                        value="NA"
                        checked={this.props.noNumber}
                        onUpdate={this.updateNoNumber}
                        onError={this.handleErrorNoNumber} />
          </span>
        </Show>
      </div>
    )
  }

  international () {
    return (
      <div className="international numbers">
        <label className={`{this.props.typeClass || ''} ${this.props.noNumber ? 'disabled' : ''}`.trim()}>{i18n.t('telephone.international.label')}</label>
        <span className="separator">+</span>
        <Text name="int_first"
              ref="int_first"
              className="number three"
              placeholder="000"
              label=""
              ariaLabel={i18n.t('telephone.aria.countryCode')}
              disabled={this.props.noNumber}
              maxlength="3"
              pattern="\d{1,3}"
              prefilter={digitsOnly}
              readonly={this.props.readonly}
              required={this.required('International')}
              value={trimleading(this.state.international.first)}
              onUpdate={this.updateInternationalFirst}
              onError={this.handleErrorInternationalFirst}
              tabNext={() => { this.props.tab(this.refs.int_second.refs.text.refs.input) }} />
        <span className="separator">-</span>
        <Text name="int_second"
              ref="int_second"
              className="number ten"
              placeholder="0000000000"
              label=""
              ariaLabel={i18n.t('telephone.aria.phoneNumber')}
              disabled={this.props.noNumber}
              maxlength="10"
              pattern="\d{10}"
              prefilter={digitsOnly}
              readonly={this.props.readonly}
              required={this.required('International')}
              value={trimleading(this.state.international.second)}
              onUpdate={this.updateInternationalSecond}
              onError={this.handleErrorInternationalSecond}
              tabBack={() => { this.props.tab(this.refs.int_first.refs.text.refs.input) }}
              tabNext={() => { this.props.tab(this.refs.int_extension.refs.text.refs.input) }} />
        <span className="separator pound">#</span>
        <Text name="int_extension"
              ref="int_extension"
              className="number six"
              placeholder="000000"
              label={i18n.t('telephone.international.extension.label')}
              ariaLabel={i18n.t('telephone.aria.extension')}
              disabled={this.props.noNumber}
              maxlength="10"
              pattern="^\d{0,10}$"
              prefilter={digitsOnly}
              readonly={this.props.readonly}
              required={false}
              value={this.props.extension}
              onUpdate={this.updateExtension}
              onError={this.handleErrorInternationalExtension}
              tabBack={() => { this.props.tab(this.refs.int_second.refs.text.refs.input) }} />
        <Show when={this.props.allowNotApplicable}>
          <span>
            <span className="separator extension">or</span>
              <Checkbox name="nonumber"
                        className="nonumber"
                        label={i18n.t('telephone.noNumber.label')}
                        value="NA"
                        checked={this.props.noNumber}
                        onUpdate={this.updateNoNumber}
                        onError={this.handleErrorNoNumber} />
          </span>
        </Show>
      </div>
    )
  }

  required (type) {
    if (type && type !== (this.props.type || 'Domestic')) {
      return false
    }

    if (this.props.allowNotApplicable && this.props.noNumber) {
      return false
    }

    return this.props.required
  }

  render () {
    const klass = `telephone ${this.props.className || ''}`.trim()
    const phoneType = this.props.type || 'Domestic'
    return (
      <div className={klass}>
        <Show when={this.props.label}>
          <span>{this.props.label}</span>
        </Show>
        <div className="type">
          Switch to:
          <Show when={phoneType !== 'Domestic'}>
            <span className="type">
              <button className="domestic-number link" onClick={this.updateToggleDomestic} title={i18n.t('telephone.aria.domestic')} aria-label={i18n.t('telephone.aria.domestic')}>
                {i18n.t('telephone.type.domestic')}
              </button>
            </span>
          </Show>
          <Show when={phoneType !== 'DSN'}>
            <span className="type">
              <button className="dsn-number link" onClick={this.updateToggleDsn} title={i18n.t('telephone.aria.dsn')} aria-label={i18n.t('telephone.aria.dsn')}>
                {i18n.t('telephone.type.dsn')}
              </button>
            </span>
          </Show>
          <Show when={phoneType !== 'International'}>
            <span className="type">
              <button className="international-number link" onClick={this.updateToggleInternational} title={i18n.t('telephone.aria.international')} aria-label={i18n.t('telephone.aria.international')}>
                {i18n.t('telephone.type.international')}
              </button>
            </span>
          </Show>
        </div>

        <Show when={phoneType === 'Domestic'}>
          { this.domestic() }
        </Show>

        <Show when={phoneType === 'DSN'}>
          { this.dsn() }
        </Show>

        <Show when={phoneType === 'International'}>
          { this.international() }
        </Show>

        <div className="timeofday">
          <RadioGroup selectedValue={this.props.timeOfDay}
                      name="timeofday"
                      disabled={this.props.noNumber}>
            <Radio native={true}
                   className="time day"
                   label={i18n.t('telephone.timeOfDay.day')}
                   value="Day"
                   ariaLabel={i18n.t('telephone.aria.day')}
                   disabled={this.props.noNumber}
                   onUpdate={this.updateTimeOfDay}
                   onError={this.handleErrorTime}
                   />
            <Radio native={true}
                   className="time night"
                   label={i18n.t('telephone.timeOfDay.night')}
                   value="Night"
                   ariaLabel={i18n.t('telephone.aria.night')}
                   disabled={this.props.noNumber}
                   onUpdate={this.updateTimeOfDay}
                   onError={this.handleErrorTime}
                   />
            <Radio native={true}
                   className="time both"
                   label={i18n.t('telephone.timeOfDay.both')}
                   value="Both"
                   ariaLabel={i18n.t('telephone.aria.both')}
                   disabled={this.props.noNumber}
                   onUpdate={this.updateTimeOfDay}
                   onError={this.handleErrorTime}
                   />
          </RadioGroup>
        </div>

        <Show when={this.props.showNumberType}>
          <div className={`phonetype ${this.props.noNumber ? 'disabled' : ''}`.trim()}>
            <label>{i18n.t('telephone.numberType.title')}</label>
            <RadioGroup selectedValue={this.props.numberType}
                        required={this.required()}
                        disabled={this.props.noNumber}>
              <Radio name="numbertype-cell"
                     className="phonetype-option cell"
                     label={i18n.t('telephone.numberType.cell')}
                     value="Cell"
                     ariaLabel={i18n.t('telephone.aria.cell')}
                     disabled={this.props.noNumber}
                     onUpdate={this.updateNumberType}
                     onError={this.handleErrorNumberType}
                     />
              <Radio name="numbertype-home"
                     className="phonetype-option home"
                     label={i18n.t('telephone.numberType.home')}
                     value="Home"
                     ariaLabel={i18n.t('telephone.aria.home')}
                     disabled={this.props.noNumber}
                     onUpdate={this.updateNumberType}
                     onError={this.handleErrorNumberType}
                     />
              <Radio name="numbertype-work"
                     className="phonetype-option work"
                     label={i18n.t('telephone.numberType.work')}
                     value="Work"
                     ariaLabel={i18n.t('telephone.aria.work')}
                     disabled={this.props.noNumber}
                     onUpdate={this.updateNumberType}
                     onError={this.handleErrorNumberType}
                     />
              <Radio name="numbertype-other"
                     className="phonetype-option other"
                     label={i18n.t('telephone.numberType.other')}
                     value="Other"
                     ariaLabel={i18n.t('telephone.aria.other')}
                     disabled={this.props.noNumber}
                     onUpdate={this.updateNumberType}
                     onError={this.handleErrorNumberType}
                     />
            </RadioGroup>
          </div>
        </Show>
      </div>
    )
  }
}

Telephone.defaultProps = {
  name: 'telephone',
  value: '',
  type: 'Domestic',
  typeClass: '',
  numberType: '',
  timeOfDay: 'Both',
  number: '',
  extension: '',
  noNumber: false,
  showNumberType: true,
  allowNotApplicable: true,
  tab: (input) => { input.focus() },
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr }
}

Telephone.errors = [
  {
    code: 'required',
    func: (value, props) => {
      if (props.required) {
        if (props.allowNotApplicable && props.noNumber) {
          return true
        }

        if (props.showNumberType && !props.numberType) {
          return false
        }

        switch (props.type) {
        case 'Domestic':
          return !!props.domestic.first &&
            !!props.domestic.second &&
            !!props.domestic.third
        case 'DSN':
          return !!props.dsn.first &&
            !!props.dsn.second
        case 'International':
          return !!props.international.first &&
            !!props.international.second
        default:
          return false
        }
      }

      return true
    }
  }
]
