import React from 'react'
import { i18n } from 'config'
import ValidationElement from '../ValidationElement'
import Field from '../Field'
import Show from '../Show'
import Text from '../Text'
import Checkbox from '../Checkbox'
import SelectDropdown from '../SelectDropdown'

export default class Name extends ValidationElement {
  constructor(props) {
    super(props)

    this.state = {
      uid: `${this.props.name}-${super.guid()}`,
    }
  }

  update = (queue, callback) => {
    this.props.onUpdate({
      first: this.props.first,
      firstInitialOnly: this.props.firstInitialOnly,
      last: this.props.last,
      middle: this.props.middle,
      middleInitialOnly: this.props.middleInitialOnly,
      hideMiddleName: this.props.hideMiddleName,
      noMiddleName: this.props.noMiddleName,
      suffix: this.props.suffix,
      suffixOther: this.props.suffixOther,
      ...queue,
    })

    if (callback) {
      callback()
    }
  }

  updateFirstInitial = (values) => {
    this.update(
      {
        firstInitialOnly: values.checked,
      },
      () => {
        this.refs.first.refs.text.refs.input.focus()
        this.refs.first.refs.text.refs.input.blur()
        this.refs.first.refs.text.refs.input.focus()
        this.refs.firstInitialOnly.refs.checkbox.focus()
      }
    )
  }

  updateMiddleInitial = (values) => {
    this.update(
      {
        noMiddleName: false,
        middleInitialOnly: values.checked,
      },
      () => {
        this.refs.middle.refs.text.refs.input.focus()
        this.refs.middle.refs.text.refs.input.blur()
        this.refs.middleInitialOnly.refs.checkbox.focus()
      }
    )
  }

  updateMiddleNone = (values) => {
    this.update(
      {
        middleInitialOnly: false,
        middle: '',
        noMiddleName: values.checked,
      },
      () => {
        this.refs.middle.refs.text.refs.input.focus()
        this.refs.middle.refs.text.refs.input.blur()
        this.refs.noMiddleName.refs.checkbox.focus()
      }
    )
  }

  handleErrorFirst = (value, arr) => this.handleError('first', value, arr)

  handleErrorMiddle = (value, arr) => this.handleError('middle', value, arr)

  handleErrorLast = (value, arr) => this.handleError('last', value, arr)

  handleErrorSuffix = (value, arr) => this.handleError('suffix', value, arr)

  handleError = (code, value, arr) => {
    let errors = arr.map(err => ({
      code: `name.${code}.${err.code}`,
      valid: err.valid,
      uid: err.uid,
    }))

    errors = errors.concat(
      this.constructor.errors.map(err => ({
        code: `name.${err.code}`,
        valid: err.func(value, { ...this.props, ...this.state }),
        uid: this.state.uid,
      }))
    )

    // Take the original and concatenate our new error values to it
    return this.props.onError(value, errors)
  }

  filterErrors = errors => errors.filter(err => err.code.indexOf('required') === -1)

  getSuffixOptions = () => {
    const { prefix } = this.props
    return [
      { label: '', value: '' },
      { label: i18n.t(`${prefix}.label.jr`), value: 'Jr' },
      { label: i18n.t(`${prefix}.label.sr`), value: 'Sr' },
      { label: i18n.t(`${prefix}.label.i`), value: 'I' },
      { label: i18n.t(`${prefix}.label.ii`), value: 'II' },
      { label: i18n.t(`${prefix}.label.iii`), value: 'III' },
      { label: i18n.t(`${prefix}.label.iv`), value: 'IV' },
      { label: i18n.t(`${prefix}.label.v`), value: 'V' },
      { label: i18n.t(`${prefix}.label.vi`), value: 'VI' },
      { label: i18n.t(`${prefix}.label.vii`), value: 'VII' },
      { label: i18n.t(`${prefix}.label.viii`), value: 'VIII' },
      { label: i18n.t(`${prefix}.label.ix`), value: 'IX' },
      { label: i18n.t(`${prefix}.label.x`), value: 'X' },
      { label: i18n.t(`${prefix}.label.other`), value: 'Other' },
    ]
  }

  render() {
    const { prefix } = this.props
    const klass = [
      `name ${this.props.className || ''}`.trim(),
      this.props.disabled ? 'disabled' : '',
    ]
    const maxFirst = this.props.firstInitialOnly ? '1' : '100'
    const maxMiddle = this.props.middleInitialOnly ? '1' : '100'
    const maxLast = '100'

    return (
      <div className={klass.join(' ')}>
        {this.props.title && <h2>{this.props.title}</h2>}
        <Field
          title={i18n.t(`${prefix}.label.first`)}
          titleSize="label"
          help="identification.name.first.help"
          errorPrefix="name"
          className="usa-form-control"
          filterErrors={this.filterErrors}
          scrollIntoView={this.props.scrollIntoView}
          adjustFor="labels"
        >
          <Text
            name="first"
            ref="first"
            pattern="^[a-zA-Z\-\.' ]*$"
            minlength={this.props.firstInitialOnly ? 1 : 2}
            maxlength={maxFirst}
            className="first"
            value={this.props.first}
            onUpdate={(values) => {
              this.update({
                first: values.value,
              })
            }}
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
        {!this.props.hideMiddleName && (
          <Field
            title={i18n.t(`${prefix}.label.middle`)}
            titleSize="label"
            help="identification.name.middle.help"
            errorPrefix="name"
            className="usa-form-control"
            filterErrors={this.filterErrors}
            scrollIntoView={this.props.scrollIntoView}
            adjustFor="labels"
          >
            <Text
              name="middle"
              ref="middle"
              pattern="^[a-zA-Z\-\.' ]*$"
              minlength={this.props.middleInitialOnly ? 1 : 2}
              maxlength={maxMiddle}
              className="middle"
              value={this.props.middle}
              disabled={this.props.noMiddleName || this.props.disabled}
              onUpdate={(values) => {
                this.update({
                  middle: values.value,
                })
              }}
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
        )}
        <Field
          title={i18n.t(`${prefix}.label.last`)}
          titleSize="label"
          errorPrefix="name"
          className="usa-form-control"
          filterErrors={this.filterErrors}
          scrollIntoView={this.props.scrollIntoView}
          adjustFor="labels"
        >
          <Text
            name="last"
            ref="last"
            minlength={1}
            maxlength={maxLast}
            className="last"
            pattern="^[a-zA-Z\-\.' ]*$"
            value={this.props.last}
            onUpdate={(values) => {
              this.update({
                last: values.value,
              })
            }}
            onError={this.handleErrorLast}
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
            required={this.props.required}
            disabled={this.props.disabled}
          />
        </Field>
        {/*
          * Hacky spacer because <Field /> padding doens't stack properly.
          * This avoids having to alter the <Field /> and regressing every usage.
          * Permanent fix should be done in <Field /> and remove this hack.
        */}
        <div style={{ height: '50px' }} />
        <Field
          title={i18n.t(`${prefix}.label.suffix`)}
          titleSize="label"
          help="identification.name.suffix.help"
          errorPrefix="name"
          className="usa-form-control"
          scrollIntoView={this.props.scrollIntoView}
          optional
          optionalText={i18n.t(`${prefix}.label.optional`)}
        >
          <SelectDropdown
            className="option-list suffix usa-small-input"
            isDisabled={this.props.disabled}
            name="suffix"
            onChange={(e) => {
              this.update({
                suffix: e.target.value,
              })
            }}
            onError={this.handleErrorSuffix}
            value={this.props.suffix || ''}
          >
            {this.getSuffixOptions().map(option => (
              <option
                key={`name-${option.label}`}
                label={option.label}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </SelectDropdown>
          <Show when={this.props.suffix === 'Other'}>
            <Text
              name="suffixOther"
              label={i18n.t(`${prefix}.label.other`)}
              maxlength="100"
              className="suffix-other"
              value={this.props.suffixOther}
              onUpdate={(values) => {
                this.update({
                  suffixOther: values.value,
                })
              }}
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
  middle: '',
  middleInitialOnly: false,
  noMiddleName: false,
  hideMiddleName: false,
  suffix: '',
  suffixOther: '',
  prefix: 'name',
  focus: false,
  error: false,
  valid: false,
  required: false,
  errorCodes: [],
  onUpdate: () => {},
  onError: (value, arr) => arr,
}

Name.requiredErrorsOnly = errors => errors.filter(err => err.code.indexOf('required') !== -1)

Name.errors = [
  {
    code: 'required',
    func: (value, props) => {
      if (props.required) {
        return !!props.first && !!props.last
      }
      return true
    },
  },
]
