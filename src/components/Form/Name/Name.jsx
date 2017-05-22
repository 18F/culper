import React from 'react'
import { i18n } from '../../../config'
import { NameValidator } from '../../../validators'
import ValidationElement from '../ValidationElement'
import Field from '../Field'
import Text from '../Text'
import Checkbox from '../Checkbox'
import Radio from '../Radio'
import RadioGroup from '../RadioGroup'

export default class Name extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      first: props.first,
      firstInitialOnly: props.firstInitialOnly,
      last: props.last,
      lastInitialOnly: props.lastInitialOnly,
      middle: props.middle,
      middleInitialOnly: props.middleInitialOnly,
      noMiddleName: props.noMiddleName,
      suffix: props.suffix,
      suffixOther: props.suffixOther
    }

    this.handleError = this.handleError.bind(this)
    this.handleErrorFirst = this.handleErrorFirst.bind(this)
    this.handleErrorMiddle = this.handleErrorMiddle.bind(this)
    this.handleErrorLast = this.handleErrorLast.bind(this)
    this.handleErrorSuffix = this.handleErrorSuffix.bind(this)
  }

  /**
   * Handle the change event.
   */
  handleChange (event) {
    let part = event.target.name || ''
    let value = event.target.value
    let updated = null

    switch (part) {
      case 'first':
        updated = { first: value }
        break
      case 'last':
        updated = { last: value }
        break
      case 'middle':
        updated = { middle: value }
        break
      case 'suffix':
        updated = { suffix: value }
        break
      case 'suffixOther':
        updated = { suffixOther: value }
        break
      case 'firstInitialOnly':
        event.persist()
        updated = { firstInitialOnly: event.target.checked }
        break
      case 'lastInitialOnly':
        event.persist()
        updated = { lastInitialOnly: event.target.checked }
        break
      case 'middleInitialOnly':
        event.persist()
        updated = { middleInitialOnly: event.target.checked, noMiddleName: false }
        break
      case 'noMiddleName':
        event.persist()
        updated = { noMiddleName: event.target.checked, middleInitialOnly: false, middle: '' }
        break

    }

    this.setState(updated, () => {
      super.handleChange(event)

      if (part.indexOf('InitialOnly') !== -1) {
        // Blur/validation forced
        this.refs.first.refs.text.refs.input.focus()
        this.refs.first.refs.text.refs.input.blur()
        this.refs.middle.refs.text.refs.input.focus()
        this.refs.middle.refs.text.refs.input.blur()
        this.refs.last.refs.text.refs.input.focus()
        this.refs.last.refs.text.refs.input.blur()

        // Re-focus on the target
        if (event.target) {
          event.target.focus()
        }
      }

      if (this.props.onUpdate) {
        const {
          first,
          firstInitialOnly,
          last,
          lastInitialOnly,
          middle,
          middleInitialOnly,
          noMiddleName,
          suffix,
          suffixOther
        } = this.state

        this.props.onUpdate({
          name: this.props.name,
          first: first,
          firstInitialOnly: firstInitialOnly,
          last: last,
          lastInitialOnly: lastInitialOnly,
          middle: middle,
          middleInitialOnly: middleInitialOnly,
          noMiddleName: noMiddleName,
          suffix: suffix,
          suffixOther: suffixOther
        })
      }
    })
  }

  handleErrorFirst (value, arr) {
    return this.handleError('first', value, arr)
  }

  handleErrorMiddle (value, arr) {
    return this.handleError('middle', value, arr)
  }

  handleErrorLast (value, arr) {
    return this.handleError('last', value, arr)
  }

  handleErrorSuffix (value, arr) {
    return this.handleError('suffix', value, arr)
  }

  handleError (code, value, arr) {
    arr = arr.map(err => {
      return {
        code: `name.${code}.${err.code}`,
        valid: err.valid
      }
    })

    // Take the original and concatenate our new error values to it
    return this.props.onError(value, arr.concat(this.constructor.errors.map(err => {
      return {
        code: err.code,
        valid: err.func(value, this.props)
      }
    })))
  }

  isValid () {
    return new NameValidator(this.state, null).isValid()
  }

  /**
   * Toggles visibility class for the extended suffix element.
   */
  suffixOtherClass () {
    return this.state.suffix === 'Other'
      ? 'suffix-other'
      : 'hidden'
  }

  render () {
    const prefix = this.props.prefix
    const klass = `name ${this.props.className || ''}`.trim()
    return (
      <div className={klass}>
        {this.props.title && <h2>{this.props.title}</h2>}
        <Field help="identification.name.first.help"
               errorPrefix="name"
               adjustFor="labels">
          <Text name="first"
                ref="first"
                label={i18n.t(`${prefix}.label.first`)}
                pattern="^[a-zA-Z\-\.' ]*$"
                maxlength={this.state.firstInitialOnly ? '1' : '100'}
                className="first"
                value={this.state.first}
                onChange={this.handleChange}
                onError={this.handleErrorFirst}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                />
          <div className="flags">
            <Checkbox name="firstInitialOnly"
                      label={i18n.t(`${prefix}.label.initialOnly`)}
                      toggle="false"
                      value="firstInitial"
                      checked={this.state.firstInitialOnly}
                      onChange={this.handleChange}
                      onError={this.handleErrorFirst}
                      />
          </div>
        </Field>
        <Field help="identification.name.middle.help"
               errorPrefix="name"
               adjustFor="labels">
          <Text name="middle"
                ref="middle"
                label={i18n.t(`${prefix}.label.middle`)}
                minlength="0"
                maxlength={this.state.middleInitialOnly ? '1' : '100'}
                className="middle"
                value={this.state.middle}
                disabled={this.state.noMiddleName}
                onChange={this.handleChange}
                onError={this.handleErrorMiddle}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                />
          <div className="middle-options flags">
            <Checkbox name="noMiddleName"
                      label={i18n.t(`${prefix}.label.noMiddle`)}
                      toggle="false"
                      value="noMiddleName"
                      checked={this.state.noMiddleName}
                      onChange={this.handleChange}
                      onError={this.handleErrorMiddle}
                      />
            <Checkbox name="middleInitialOnly"
                      label={i18n.t(`${prefix}.label.initialOnly`)}
                      toggle="false"
                      value="middleInitialOnly"
                      checked={this.state.middleInitialOnly}
                      onChange={this.handleChange}
                      onError={this.handleErrorMiddle}
                      />
          </div>
        </Field>
        <Field help="identification.name.last.help"
               errorPrefix="name"
               adjustFor="labels">
          <Text name="last"
                ref="last"
                label={i18n.t(`${prefix}.label.last`)}
                maxlength={this.state.lastInitialOnly ? '1' : '100'}
                className="last"
                pattern="^[a-zA-Z\-\.' ]*$"
                value={this.state.last}
                onChange={this.handleChange}
                onError={this.handleErrorLast}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                />
          <div className="flags">
            <Checkbox name="lastInitialOnly"
                      label={i18n.t(`${prefix}.label.initialOnly`)}
                      toggle="false"
                      value="lastInitial"
                      checked={this.state.lastInitialOnly}
                      onChange={this.handleChange}
                      onError={this.handleErrorLast}
                      />
          </div>
        </Field>
        <Field help="identification.name.suffix.help"
               errorPrefix="name"
               adjustFor="labels">
          <label>{i18n.t(`${prefix}.label.suffix`)} <span className="optional">({i18n.t(`${prefix}.label.optional`)})</span></label>

          <RadioGroup className="option-list suffix" selectedValue={this.state.suffix}>
            <Radio name="suffix"
                   label={i18n.t(`${prefix}.label.jr`)}
                   value="Jr"
                   onChange={this.handleChange}
                   onError={this.handleErrorSuffix}
                   onFocus={this.props.onFocus}
                   onBlur={this.props.onBlur}
                   />
            <Radio name="suffix"
                   label={i18n.t(`${prefix}.label.sr`)}
                   value="Sr"
                   onChange={this.handleChange}
                   onError={this.handleErrorSuffix}
                   onFocus={this.props.onFocus}
                   onBlur={this.props.onBlur}
                   />
            <Radio name="suffix"
                   label={i18n.t(`${prefix}.label.i`)}
                   value="I"
                   onChange={this.handleChange}
                   onError={this.handleErrorSuffix}
                   onFocus={this.props.onFocus}
                   onBlur={this.props.onBlur}
                   />
            <Radio name="suffix"
                   label={i18n.t(`${prefix}.label.ii`)}
                   value="II"
                   onChange={this.handleChange}
                   onError={this.handleErrorSuffix}
                   onFocus={this.props.onFocus}
                   onBlur={this.props.onBlur}
                   />
            <Radio name="suffix"
                   label={i18n.t(`${prefix}.label.iii`)}
                   value="III"
                   onChange={this.handleChange}
                   onError={this.handleErrorSuffix}
                   onFocus={this.props.onFocus}
                   onBlur={this.props.onBlur}
                   />
            <Radio name="suffix"
                   label={i18n.t(`${prefix}.label.iv`)}
                   value="IV"
                   onChange={this.handleChange}
                   onError={this.handleErrorSuffix}
                   onFocus={this.props.onFocus}
                   onBlur={this.props.onBlur}
                   />
            <Radio name="suffix"
                   label={i18n.t(`${prefix}.label.v`)}
                   value="V"
                   onChange={this.handleChange}
                   onError={this.handleErrorSuffix}
                   onFocus={this.props.onFocus}
                   onBlur={this.props.onBlur}
                   />
            <Radio name="suffix"
                   label={i18n.t(`${prefix}.label.vi`)}
                   value="VI"
                   onChange={this.handleChange}
                   onError={this.handleErrorSuffix}
                   onFocus={this.props.onFocus}
                   onBlur={this.props.onBlur}
                   />
            <Radio name="suffix"
                   label={i18n.t(`${prefix}.label.vii`)}
                   value="VII"
                   onChange={this.handleChange}
                   onError={this.handleErrorSuffix}
                   onFocus={this.props.onFocus}
                   onBlur={this.props.onBlur}
                   />
            <Radio name="suffix"
                   label={i18n.t(`${prefix}.label.viii`)}
                   value="VIII"
                   onChange={this.handleChange}
                   onError={this.handleErrorSuffix}
                   onFocus={this.props.onFocus}
                   onBlur={this.props.onBlur}
                   />
            <Radio name="suffix"
                   label={i18n.t(`${prefix}.label.ix`)}
                   value="IX"
                   onChange={this.handleChange}
                   onError={this.handleErrorSuffix}
                   onFocus={this.props.onFocus}
                   onBlur={this.props.onBlur}
                   />
            <Radio name="suffix"
                   label={i18n.t(`${prefix}.label.x`)}
                   value="X"
                   onChange={this.handleChange}
                   onError={this.handleErrorSuffix}
                   onFocus={this.props.onFocus}
                   onBlur={this.props.onBlur}
                   />
            <Radio name="suffix"
                   label={i18n.t(`${prefix}.label.other`)}
                   value="Other"
                   onChange={this.handleChange}
                   onError={this.handleErrorSuffix}
                   onFocus={this.props.onFocus}
                   onBlur={this.props.onBlur}
                   />
          </RadioGroup>
          <div className={this.suffixOtherClass()}>
            <Text name="suffixOther"
                  label={i18n.t(`${prefix}.label.other`)}
                  maxlength="100"
                  value={this.state.suffixOther}
                  onChange={this.handleChange}
                  onError={this.handleErrorSuffix}
                  onFocus={this.props.onFocus}
                  onBlur={this.props.onBlur}
                  />
          </div>
        </Field>
      </div>
    )
  }
}

Name.defaultProps = {
  first: '',
  firstInitialOnly: false,
  last: '',
  lastInitialOnly: false,
  middle: '',
  middleInitialOnly: false,
  noMiddleName: false,
  suffix: '',
  suffixOther: '',
  prefix: 'name',
  focus: false,
  error: false,
  valid: false,
  errorCodes: [],
  onError: (value, arr) => { return arr }
}

Name.errors = []
