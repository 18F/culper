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
  constructor(props) {
    super(props)

    this.state = {
      uid: `${this.props.name}-${super.guid()}`
    }

    this.update = this.update.bind(this)
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

  update(queue, callback) {
    this.props.onUpdate({
      first: this.props.first,
      firstInitialOnly: this.props.firstInitialOnly,
      last: this.props.last,
      lastInitialOnly: this.props.lastInitialOnly,
      middle: this.props.middle,
      middleInitialOnly: this.props.middleInitialOnly,
      noMiddleName: this.props.noMiddleName,
      suffix: this.props.suffix,
      suffixOther: this.props.suffixOther,
      ...queue
    })

    if (callback) {
      callback()
    }
  }

  updateFirst(values) {
    this.update({
      first: values.value
    })
  }

  updateFirstInitial(values) {
    this.update(
      {
        firstInitialOnly: values.checked
      },
      () => {
        this.refs.first.refs.text.refs.input.focus()
        this.refs.first.refs.text.refs.input.blur()
        this.refs.first.refs.text.refs.input.focus()
        this.refs.firstInitialOnly.refs.checkbox.focus()
      }
    )
  }

  updateMiddle(values) {
    this.update({
      middle: values.value
    })
  }

  updateMiddleInitial(values) {
    this.update(
      {
        noMiddleName: false,
        middleInitialOnly: values.checked
      },
      () => {
        this.refs.middle.refs.text.refs.input.focus()
        this.refs.middle.refs.text.refs.input.blur()
        this.refs.middleInitialOnly.refs.checkbox.focus()
      }
    )
  }

  updateMiddleNone(values) {
    this.update(
      {
        middleInitialOnly: false,
        middle: '',
        noMiddleName: values.checked
      },
      () => {
        this.refs.middle.refs.text.refs.input.focus()
        this.refs.middle.refs.text.refs.input.blur()
        this.refs.noMiddleName.refs.checkbox.focus()
      }
    )
  }

  updateLast(values) {
    this.update({
      last: values.value
    })
  }

  updateLastInitial(values) {
    this.update(
      {
        lastInitialOnly: values.checked
      },
      () => {
        this.refs.last.refs.text.refs.input.focus()
        this.refs.last.refs.text.refs.input.blur()
        this.refs.lastInitialOnly.refs.checkbox.focus()
      }
    )
  }

  updateSuffix(values) {
    this.update({
      suffix: values.value
    })
  }

  updateSuffixOther(values) {
    this.update({
      suffixOther: values.value
    })
  }

  handleErrorFirst(value, arr) {
    return this.handleError('first', value, arr)
  }

  handleErrorMiddle(value, arr) {
    return this.handleError('middle', value, arr)
  }

  handleErrorLast(value, arr) {
    return this.handleError('last', value, arr)
  }

  handleErrorSuffix(value, arr) {
    return this.handleError('suffix', value, arr)
  }

  handleError(code, value, arr) {
    arr = arr.map(err => {
      return {
        code: `name.${code}.${err.code}`,
        valid: err.valid,
        uid: err.uid
      }
    })

    const requiredErr = arr.concat(
      this.constructor.errors.map(err => {
        return {
          code: `name.${err.code}`,
          valid: err.func(value, { ...this.props, ...this.state }),
          uid: this.state.uid
        }
      })
    )

    // Take the original and concatenate our new error values to it
    return this.props.onError(value, arr)
  }

  filterErrors(errors) {
    return errors.filter(err => err.code.indexOf('required') === -1)
  }

  render() {
    const prefix = this.props.prefix
    const klass = [
      `name ${this.props.className || ''}`.trim(),
      this.props.disabled ? 'disabled' : ''
    ]
    const maxFirst = this.props.firstInitialOnly ? '1' : '100'
    const maxMiddle = this.props.middleInitialOnly ? '1' : '100'
    const maxLast = this.props.lastInitialOnly ? '1' : '100'

    return (
      <div className={klass.join(' ')}>
        {this.props.title && <h2>{this.props.title}</h2>}
        <Field
          title={i18n.t(`${prefix}.label.first`)}
          titleSize="label"
          help="identification.name.first.help"
          errorPrefix="name"
          filterErrors={this.filterErrors.bind(this)}
          scrollIntoView={this.props.scrollIntoView}
          adjustFor="labels">
          <Text
            name="first"
            ref="first"
            pattern="^[a-zA-Z\-\.' ]*$"
            minlength={this.props.firstInitialOnly ? 1 : 2}
            maxlength={maxFirst}
            className="first"
            value={this.props.first}
            onUpdate={this.updateFirst}
            onError={this.handleErrorFirst}
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
            required={this.props.required}
            disabled={this.props.disabled}
          />
          <div className="flags">
            <Checkbox
              name="firstInitialOnly"
              ref="firstInitialOnly"
              label={i18n.t(`${prefix}.label.initialOnly`)}
              className="first-initial-only"
              toggle="false"
              value={this.props.firstInitialOnly}
              checked={this.props.firstInitialOnly}
              onUpdate={this.updateFirstInitial}
              onError={this.handleErrorFirst}
              disabled={this.props.disabled}
            />
          </div>
        </Field>
        <Field
          title={i18n.t(`${prefix}.label.middle`)}
          titleSize="label"
          help="identification.name.middle.help"
          errorPrefix="name"
          filterErrors={this.filterErrors.bind(this)}
          scrollIntoView={this.props.scrollIntoView}
          adjustFor="labels">
          <Text
            name="middle"
            ref="middle"
            pattern="^[a-zA-Z\-\.' ]*$"
            minlength={this.props.middleInitialOnly ? 1 : 2}
            maxlength={maxMiddle}
            className="middle"
            value={this.props.middle}
            disabled={this.props.noMiddleName || this.props.disabled}
            onUpdate={this.updateMiddle}
            onError={this.handleErrorMiddle}
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
            required={!this.props.noMiddleName && this.props.required}
          />
          <div className="middle-options flags">
            <Checkbox
              name="noMiddleName"
              ref="noMiddleName"
              label={i18n.t(`${prefix}.label.noMiddle`)}
              className="middle-none"
              toggle="false"
              value={this.props.noMiddleName}
              checked={this.props.noMiddleName}
              onUpdate={this.updateMiddleNone}
              onError={this.handleErrorMiddle}
              disabled={this.props.disabled}
            />
            <Checkbox
              name="middleInitialOnly"
              ref="middleInitialOnly"
              label={i18n.t(`${prefix}.label.initialOnly`)}
              className="middle-initial-only"
              toggle="false"
              value={this.props.middleInitialOnly}
              checked={this.props.middleInitialOnly}
              onUpdate={this.updateMiddleInitial}
              onError={this.handleErrorMiddle}
              disabled={this.props.disabled}
            />
          </div>
        </Field>
        <Field
          title={i18n.t(`${prefix}.label.last`)}
          titleSize="label"
          help="identification.name.last.help"
          errorPrefix="name"
          filterErrors={this.filterErrors.bind(this)}
          scrollIntoView={this.props.scrollIntoView}
          adjustFor="labels">
          <Text
            name="last"
            ref="last"
            minlength={this.props.lastInitialOnly ? 1 : 2}
            maxlength={maxLast}
            className="last"
            pattern="^[a-zA-Z\-\.' ]*$"
            value={this.props.last}
            onUpdate={this.updateLast}
            onError={this.handleErrorLast}
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
            required={this.props.required}
            disabled={this.props.disabled}
          />
          <div className="flags">
            <Checkbox
              name="lastInitialOnly"
              ref="lastInitialOnly"
              label={i18n.t(`${prefix}.label.initialOnly`)}
              className="last-initial-only"
              toggle="false"
              value={this.props.lastInitialOnly}
              checked={this.props.lastInitialOnly}
              onUpdate={this.updateLastInitial}
              onError={this.handleErrorLast}
              disabled={this.props.disabled}
            />
          </div>
        </Field>
        <Field
          title={i18n.t(`${prefix}.label.suffix`)}
          titleSize="label"
          help="identification.name.suffix.help"
          errorPrefix="name"
          scrollIntoView={this.props.scrollIntoView}
          optional={true}
          optionalText={i18n.t(`${prefix}.label.optional`)}>
          <RadioGroup
            className="option-list option-list-inline suffix"
            selectedValue={this.props.suffix}
            disabled={this.props.disabled}>
            <Radio
              name="suffix"
              label={i18n.t(`${prefix}.label.jr`)}
              className="suffix-jr"
              value="Jr"
              onUpdate={this.updateSuffix}
              onError={this.handleErrorSuffix}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
            />
            <Radio
              name="suffix"
              label={i18n.t(`${prefix}.label.sr`)}
              className="suffix-sr"
              value="Sr"
              onUpdate={this.updateSuffix}
              onError={this.handleErrorSuffix}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
            />
            <Radio
              name="suffix"
              label={i18n.t(`${prefix}.label.i`)}
              className="suffix-i"
              value="I"
              onUpdate={this.updateSuffix}
              onError={this.handleErrorSuffix}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
            />
            <Radio
              name="suffix"
              label={i18n.t(`${prefix}.label.ii`)}
              className="suffix-ii"
              value="II"
              onUpdate={this.updateSuffix}
              onError={this.handleErrorSuffix}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
            />
            <Radio
              name="suffix"
              label={i18n.t(`${prefix}.label.iii`)}
              className="suffix-iii"
              value="III"
              onUpdate={this.updateSuffix}
              onError={this.handleErrorSuffix}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
            />
            <Radio
              name="suffix"
              label={i18n.t(`${prefix}.label.iv`)}
              className="suffix-iv"
              value="IV"
              onUpdate={this.updateSuffix}
              onError={this.handleErrorSuffix}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
            />
            <Radio
              name="suffix"
              label={i18n.t(`${prefix}.label.v`)}
              className="suffix-v"
              value="V"
              onUpdate={this.updateSuffix}
              onError={this.handleErrorSuffix}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
            />
            <Radio
              name="suffix"
              label={i18n.t(`${prefix}.label.vi`)}
              className="suffix-vi"
              value="VI"
              onUpdate={this.updateSuffix}
              onError={this.handleErrorSuffix}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
            />
            <Radio
              name="suffix"
              label={i18n.t(`${prefix}.label.vii`)}
              className="suffix-vii"
              value="VII"
              onUpdate={this.updateSuffix}
              onError={this.handleErrorSuffix}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
            />
            <Radio
              name="suffix"
              label={i18n.t(`${prefix}.label.viii`)}
              className="suffix-viii"
              value="VIII"
              onUpdate={this.updateSuffix}
              onError={this.handleErrorSuffix}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
            />
            <Radio
              name="suffix"
              label={i18n.t(`${prefix}.label.ix`)}
              className="suffix-ix"
              value="IX"
              onUpdate={this.updateSuffix}
              onError={this.handleErrorSuffix}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
            />
            <Radio
              name="suffix"
              label={i18n.t(`${prefix}.label.x`)}
              className="suffix-x"
              value="X"
              onUpdate={this.updateSuffix}
              onError={this.handleErrorSuffix}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
            />
            <Radio
              name="suffix"
              label={i18n.t(`${prefix}.label.other`)}
              className="suffix-more"
              value="Other"
              onUpdate={this.updateSuffix}
              onError={this.handleErrorSuffix}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
            />
          </RadioGroup>
          <Show when={this.props.suffix === 'Other'}>
            <Text
              name="suffixOther"
              label={i18n.t(`${prefix}.label.other`)}
              maxlength="100"
              className="suffix-other"
              value={this.props.suffixOther}
              onUpdate={this.updateSuffixOther}
              onError={this.handleErrorSuffix}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
              required={this.props.required}
              disabled={this.props.disabled}
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
  required: false,
  errorCodes: [],
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  }
}

Name.requiredErrorsOnly = errors => {
  return errors.filter(err => err.code.indexOf('required') !== -1)
}

Name.errors = [
  {
    code: 'required',
    func: (value, props) => {
      if (props.required) {
        return !!props.first && !!props.last
      }
      return true
    }
  }
]
