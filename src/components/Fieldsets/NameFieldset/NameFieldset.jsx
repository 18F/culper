import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import i18n from 'util/i18n'

import {
  ConnectedTextFormField, ConnectedSelectFormField, ConnectedCheckboxInput,
} from 'components/Inputs/connectedInputs'

import nameModel from 'models/shared/name'
import { getEffectiveModel } from 'helpers/validation'

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
    console.log('on change', name, newValue)
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

  const effectiveNameModel = getEffectiveModel(nameModel, value)

  const firstInitialOnlyCheckbox = (
    <div className="modifier">
      <ConnectedCheckboxInput
        label={i18n.t(`${prefix}.label.initialOnly`)}
        value={firstInitialOnly}
        inputId="firstInitialOnly"
        name="firstInitialOnly"
        {...inputProps}
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
        modifiers={firstInitialOnlyCheckbox}
        model={getEffectiveModel(effectiveNameModel.first, value)}
        errors={errors.filter(e => e.indexOf('first') > -1)}
      />

      {!hideMiddleName && (
        <ConnectedTextFormField
          name="middle"
          label={i18n.t(`${prefix}.label.middle`)}
          value={middle}
          {...inputProps}
          model={getEffectiveModel(effectiveNameModel.middle, value)}
          errors={errors.filter(e => e.indexOf('middle') > -1)}
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
        model={getEffectiveModel(effectiveNameModel.last, value)}
        errors={errors.filter(e => e.indexOf('last') > -1)}
      />

      <ConnectedSelectFormField
        name="suffix"
        label={i18n.t(`${prefix}.label.suffix`)}
        value={suffix}
        optional
        className="option-list suffix usa-small-input"
        {...inputProps}
        options={suffixOptions}
      />

      {suffix === 'Other' && (
        <ConnectedTextFormField
          name="suffixOther"
          label={i18n.t(`${prefix}.label.other`)}
          value={suffixOther}
          {...inputProps}
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
