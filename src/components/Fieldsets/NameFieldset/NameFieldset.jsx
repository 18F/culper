import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import i18n from 'util/i18n'

import {
  ConnectedTextFormField, ConnectedSelectFormField, ConnectedCheckboxInput,
} from 'components/Inputs/connectedInputs'

import nameModel from 'models/shared/name'
import { getEffectiveModel, getValidationPropsFromModel } from 'helpers/validation'
import { REQUIRED } from 'constants/errors'

const NameFieldset = (props) => {
  const {
    value, title, className, disabled, required, prefix, onUpdate,
    hideMiddleName, errors,
  } = props

  const classes = classnames('name', className, { disabled })

  const suffixOptions = [
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

  const onChange = (name, newValue) => {
    onUpdate({
      ...value,
      [`${name}`]: newValue,
    })
  }

  const {
    first, middle, last, firstInitialOnly, middleInitialOnly, noMiddleName,
    suffix, suffixOther,
  } = value

  const inputProps = {
    disabled,
    required,
    onChange,
  }

  const errorPrefix = 'Name.model'
  const effectiveNameModel = getEffectiveModel(nameModel, value)

  const validationProps = {}

  // Filter out "required" errors unless fieldset is required (on review page)
  const filteredErrors = required
    ? errors
    : errors.filter(e => e.indexOf(`presence.${REQUIRED}`) < 0)

  Object.keys(effectiveNameModel).forEach((field) => {
    const fieldModel = getEffectiveModel(effectiveNameModel[field], value)
    const fieldErrors = errors.filter(e => e.indexOf(`${errorPrefix}.${field}`) === 0)
    const filteredFieldErrors = filteredErrors.filter(e => e.indexOf(`${errorPrefix}.${field}`) === 0)

    validationProps[field] = {
      ...getValidationPropsFromModel(fieldModel),
      errors: filteredFieldErrors,
      error: filteredFieldErrors && filteredFieldErrors.length > 0,
      valid: !fieldErrors || fieldErrors.length < 1,
    }
  })

  const firstInitialOnlyCheckbox = (
    <div className="modifier">
      <ConnectedCheckboxInput
        label={i18n.t(`${prefix}.label.initialOnly`)}
        value={firstInitialOnly}
        inputId="firstInitialOnly"
        name="firstInitialOnly"
        {...inputProps}
        {...validationProps.firstInitialOnly}
      />
    </div>
  )

  const middleInitialOnlyCheckbox = (
    <div className="modifier">
      <ConnectedCheckboxInput
        label={i18n.t(`${prefix}.label.initialOnly`)}
        value={middleInitialOnly}
        inputId="middleInitialOnly"
        name="middleInitialOnly"
        {...inputProps}
        {...validationProps.middleInitialOnly}
      />
    </div>
  )

  const noMiddleNameCheckbox = (
    <div className="modifier">
      <ConnectedCheckboxInput
        label={i18n.t(`${prefix}.label.noMiddle`)}
        value={noMiddleName}
        inputId="noMiddleName"
        name="noMiddleName"
        {...inputProps}
        {...validationProps.noMiddleName}
      />
    </div>
  )

  return (
    <fieldset className={classes}>
      {title && <legend>{title}</legend>}

      <ConnectedTextFormField
        name="first"
        label={i18n.t(`${prefix}.label.first`)}
        helptext={i18n.m('identification.name.first.help.message')}
        value={first}
        {...inputProps}
        {...validationProps.first}
        modifiers={firstInitialOnlyCheckbox}
      />

      {!hideMiddleName && (
        <ConnectedTextFormField
          name="middle"
          label={i18n.t(`${prefix}.label.middle`)}
          value={middle}
          {...inputProps}
          {...validationProps.middle}
          disabled={noMiddleName}
          modifiers={(
            <span>
              {noMiddleNameCheckbox}
              {middleInitialOnlyCheckbox}
            </span>
          )}
        />
      )}

      <ConnectedTextFormField
        name="last"
        label={i18n.t(`${prefix}.label.last`)}
        value={last}
        {...inputProps}
        {...validationProps.last}
      />

      <ConnectedSelectFormField
        name="suffix"
        label={i18n.t(`${prefix}.label.suffix`)}
        value={suffix}
        optional={true}
        className="option-list suffix usa-small-input"
        {...inputProps}
        {...validationProps.suffix}
        options={suffixOptions}
      />

      {suffix === 'Other' && (
        <ConnectedTextFormField
          name="suffixOther"
          label={i18n.t(`${prefix}.label.other`)}
          value={suffixOther}
          {...inputProps}
          {...validationProps.suffixOther}
        />
      )}

    </fieldset>
  )
}

NameFieldset.propTypes = {
  value: PropTypes.object,
  prefix: PropTypes.string,
  onUpdate: PropTypes.func,
  errors: PropTypes.array,
}

NameFieldset.defaultProps = {
  value: {},
  prefix: 'name',
  onUpdate: () => {},
  errors: [],
}

export default NameFieldset
