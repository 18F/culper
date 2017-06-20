import React from 'react'
import { i18n } from '../../../config'
import { NameValidator } from '../../../validators'
import ValidationElement from '../ValidationElement'
import Field from '../Field'
import Show from '../Show'
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

    this.updateFirst = this.updateFirst.bind(this)
    this.updateFirstInitial = this.updateFirstInitial.bind(this)
    this.updateMiddle = this.updateMiddle.bind(this)
    this.updateMiddleInitial = this.updateMiddleInitial.bind(this)
    this.updateMiddleNone = this.updateMiddleNone.bind(this)
    this.updateLast = this.updateLast.bind(this)
    this.updateLastInitial = this.updateLastInitial.bind(this)
    this.updateSuffix = this.updateSuffix.bind(this)
    this.updateSuffixOther = this.updateSuffixOther.bind(this)

    this.handleError = this.handleError.bind(this)
    this.handleErrorFirst = this.handleErrorFirst.bind(this)
    this.handleErrorMiddle = this.handleErrorMiddle.bind(this)
    this.handleErrorLast = this.handleErrorLast.bind(this)
    this.handleErrorSuffix = this.handleErrorSuffix.bind(this)
  }

  update (name, value, callback) {
    this.setState({ [name]: value }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          ...this.state,
          [name]: value
        })
      }

      if (callback) {
        callback()
      }
    })
  }

  updateFirst (values) {
    this.update('first', values.value)
  }

  updateFirstInitial (values) {
    this.update('firstInitialOnly', values.checked, () => {
      this.refs.first.refs.text.refs.input.focus()
      this.refs.first.refs.text.refs.input.blur()
      this.refs.first.refs.text.refs.input.focus()
      this.refs.firstInitialOnly.refs.checkbox.focus()
    })
  }

  updateMiddle (values) {
    this.update('middle', values.value)
  }

  updateMiddleInitial (values) {
    this.update('noMiddleName', false)
    this.update('middleInitialOnly', values.checked, () => {
      this.refs.middle.refs.text.refs.input.focus()
      this.refs.middle.refs.text.refs.input.blur()
      this.refs.middleInitialOnly.refs.checkbox.focus()
    })
  }

  updateMiddleNone (values) {
    this.update('middleInitialOnly', false)
    this.update('middle', '')
    this.update('noMiddleName', values.checked, () => {
      this.refs.middle.refs.text.refs.input.focus()
      this.refs.middle.refs.text.refs.input.blur()
      this.refs.noMiddleName.refs.checkbox.focus()
    })
  }

  updateLast (values) {
    this.update('last', values.value)
  }

  updateLastInitial (values) {
    this.update('lastInitialOnly', values.checked, () => {
      this.refs.last.refs.text.refs.input.focus()
      this.refs.last.refs.text.refs.input.blur()
      this.refs.lastInitialOnly.refs.checkbox.focus()
    })
  }

  updateSuffix (values) {
    this.update('suffix', values.value)
  }

  updateSuffixOther (values) {
    this.update('suffixOther', values.value)
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
        valid: err.valid,
        uid: err.uid
      }
    })

    // Take the original and concatenate our new error values to it
    return this.props.onError(value, arr)
  }

  render () {
    const prefix = this.props.prefix
    const klass = `name ${this.props.className || ''}`.trim()
    const maxFirst = this.state.firstInitialOnly ? '1' : '100'
    const maxMiddle = this.state.middleInitialOnly ? '1' : '100'
    const maxLast = this.state.lastInitialOnly ? '1' : '100'

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
                maxlength={maxFirst}
                className="first"
                value={this.state.first}
                onUpdate={this.updateFirst}
                onError={this.handleErrorFirst}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                />
          <div className="flags">
            <Checkbox name="firstInitialOnly"
                      ref="firstInitialOnly"
                      label={i18n.t(`${prefix}.label.initialOnly`)}
                      className="first-initial-only"
                      toggle="false"
                      value={this.state.firstInitialOnly}
                      checked={this.state.firstInitialOnly}
                      onUpdate={this.updateFirstInitial}
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
                maxlength={maxMiddle}
                className="middle"
                value={this.state.middle}
                disabled={this.state.noMiddleName}
                onUpdate={this.updateMiddle}
                onError={this.handleErrorMiddle}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                />
          <div className="middle-options flags">
            <Checkbox name="noMiddleName"
                      ref="noMiddleName"
                      label={i18n.t(`${prefix}.label.noMiddle`)}
                      className="middle-none"
                      toggle="false"
                      value={this.state.noMiddleName}
                      checked={this.state.noMiddleName}
                      onUpdate={this.updateMiddleNone}
                      onError={this.handleErrorMiddle}
                      />
            <Checkbox name="middleInitialOnly"
                      ref="middleInitialOnly"
                      label={i18n.t(`${prefix}.label.initialOnly`)}
                      className="middle-initial-only"
                      toggle="false"
                      value={this.state.middleInitialOnly}
                      checked={this.state.middleInitialOnly}
                      onUpdate={this.updateMiddleInitial}
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
                maxlength={maxLast}
                className="last"
                pattern="^[a-zA-Z\-\.' ]*$"
                value={this.state.last}
                onUpdate={this.updateLast}
                onError={this.handleErrorLast}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                />
          <div className="flags">
            <Checkbox name="lastInitialOnly"
                      ref="lastInitialOnly"
                      label={i18n.t(`${prefix}.label.initialOnly`)}
                      className="last-initial-only"
                      toggle="false"
                      value={this.state.lastInitialOnly}
                      checked={this.state.lastInitialOnly}
                      onUpdate={this.updateLastInitial}
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
                   className="suffix-jr"
                   value="Jr"
                   onUpdate={this.updateSuffix}
                   onError={this.handleErrorSuffix}
                   onFocus={this.props.onFocus}
                   onBlur={this.props.onBlur}
                   />
            <Radio name="suffix"
                   label={i18n.t(`${prefix}.label.sr`)}
                   className="suffix-sr"
                   value="Sr"
                   onUpdate={this.updateSuffix}
                   onError={this.handleErrorSuffix}
                   onFocus={this.props.onFocus}
                   onBlur={this.props.onBlur}
                   />
            <Radio name="suffix"
                   label={i18n.t(`${prefix}.label.i`)}
                   className="suffix-i"
                   value="I"
                   onUpdate={this.updateSuffix}
                   onError={this.handleErrorSuffix}
                   onFocus={this.props.onFocus}
                   onBlur={this.props.onBlur}
                   />
            <Radio name="suffix"
                   label={i18n.t(`${prefix}.label.ii`)}
                   className="suffix-ii"
                   value="II"
                   onUpdate={this.updateSuffix}
                   onError={this.handleErrorSuffix}
                   onFocus={this.props.onFocus}
                   onBlur={this.props.onBlur}
                   />
            <Radio name="suffix"
                   label={i18n.t(`${prefix}.label.iii`)}
                   className="suffix-iii"
                   value="III"
                   onUpdate={this.updateSuffix}
                   onError={this.handleErrorSuffix}
                   onFocus={this.props.onFocus}
                   onBlur={this.props.onBlur}
                   />
            <Radio name="suffix"
                   label={i18n.t(`${prefix}.label.iv`)}
                   className="suffix-iv"
                   value="IV"
                   onUpdate={this.updateSuffix}
                   onError={this.handleErrorSuffix}
                   onFocus={this.props.onFocus}
                   onBlur={this.props.onBlur}
                   />
            <Radio name="suffix"
                   label={i18n.t(`${prefix}.label.v`)}
                   className="suffix-v"
                   value="V"
                   onUpdate={this.updateSuffix}
                   onError={this.handleErrorSuffix}
                   onFocus={this.props.onFocus}
                   onBlur={this.props.onBlur}
                   />
            <Radio name="suffix"
                   label={i18n.t(`${prefix}.label.vi`)}
                   className="suffix-vi"
                   value="VI"
                   onUpdate={this.updateSuffix}
                   onError={this.handleErrorSuffix}
                   onFocus={this.props.onFocus}
                   onBlur={this.props.onBlur}
                   />
            <Radio name="suffix"
                   label={i18n.t(`${prefix}.label.vii`)}
                   className="suffix-vii"
                   value="VII"
                   onUpdate={this.updateSuffix}
                   onError={this.handleErrorSuffix}
                   onFocus={this.props.onFocus}
                   onBlur={this.props.onBlur}
                   />
            <Radio name="suffix"
                   label={i18n.t(`${prefix}.label.viii`)}
                   className="suffix-viii"
                   value="VIII"
                   onUpdate={this.updateSuffix}
                   onError={this.handleErrorSuffix}
                   onFocus={this.props.onFocus}
                   onBlur={this.props.onBlur}
                   />
            <Radio name="suffix"
                   label={i18n.t(`${prefix}.label.ix`)}
                   className="suffix-ix"
                   value="IX"
                   onUpdate={this.updateSuffix}
                   onError={this.handleErrorSuffix}
                   onFocus={this.props.onFocus}
                   onBlur={this.props.onBlur}
                   />
            <Radio name="suffix"
                   label={i18n.t(`${prefix}.label.x`)}
                   className="suffix-x"
                   value="X"
                   onUpdate={this.updateSuffix}
                   onError={this.handleErrorSuffix}
                   onFocus={this.props.onFocus}
                   onBlur={this.props.onBlur}
                   />
            <Radio name="suffix"
                   label={i18n.t(`${prefix}.label.other`)}
                   className="suffix-more"
                   value="Other"
                   onUpdate={this.updateSuffix}
                   onError={this.handleErrorSuffix}
                   onFocus={this.props.onFocus}
                   onBlur={this.props.onBlur}
                   />
          </RadioGroup>
          <Show when={this.state.suffix === 'Other'}>
            <Text name="suffixOther"
                  label={i18n.t(`${prefix}.label.other`)}
                  maxlength="100"
                  className="suffix-other"
                  value={this.state.suffixOther}
                  onUpdate={this.updateSuffixOther}
                  onError={this.handleErrorSuffix}
                  onFocus={this.props.onFocus}
                  onBlur={this.props.onBlur}
                  />
          </Show>
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
