import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { i18n } from 'config'
import { Field, Radio, RadioGroup } from 'components/Form'

/**
 * Branch is a component that stores whether Yes/No options were selected. It contains a callback
 * function that can be used to be upated when a button is clicked. The button labels and values are
 * configurable by passing in the appropriate property which are defined in the Branch.defaultProps
 * object.
 */
export default class Branch extends React.Component {
  handleUpdate = (values) => {
    const {
      value, noValue, yesValue, warning, confirmation, onUpdate, name,
    } = this.props

    // If they answered "No" (or deselects "Yes" entirely) we need to
    // check if a confirmation is required.
    if ((values.value === noValue || values.value === '')
      && value === yesValue
    ) {
      // When a `warning` should be displayed AND they do no approve the change then
      // set the old value back to "Yes".
      if (warning && window.confirm(confirmation) === false) {
        return
      }
    }

    onUpdate({
      name,
      value: values.value,
    })
  }

  render() {
    const {
      className, label, labelSize, optional, disabled, required,
      help, helpTitle, helpMessage,
      adjustFor, scrollIntoView, children, onError,
      value, name, yesLabel, yesValue, yesAriaLabel, noLabel, noValue, noAriaLabel,
    } = this.props

    const classes = classnames('branch', className)

    return (
      <Field
        title={label}
        titleSize={labelSize}
        optional={optional}
        className={classes}
        help={help}
        helpTitle={helpTitle}
        helpMessage={helpMessage}
        adjustFor={adjustFor}
        scrollIntoView={scrollIntoView}
        shrink
      >
        <div className="content">{children}</div>
        <RadioGroup
          className="option-list branch"
          disabled={disabled}
          required={required}
          onError={onError}
          selectedValue={value}
        >
          <Radio
            name={name}
            label={yesLabel}
            value={yesValue}
            ariaLabel={yesAriaLabel}
            className="yes"
            onUpdate={this.handleUpdate}
            onError={onError}
          />
          <Radio
            name={name}
            label={noLabel}
            value={noValue}
            ariaLabel={noAriaLabel}
            className="no"
            onUpdate={this.handleUpdate}
            onError={onError}
          />
        </RadioGroup>
      </Field>
    )
  }
}

/* eslint react/forbid-prop-types: 0 */
Branch.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  labelSize: PropTypes.string,
  className: PropTypes.string,
  optional: PropTypes.bool,
  help: PropTypes.string,
  helpTitle: PropTypes.node,
  helpMessage: PropTypes.node,
  adjustFor: PropTypes.string,
  scrollIntoView: PropTypes.bool,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  onError: PropTypes.func,
  warning: PropTypes.bool,
  confirmation: PropTypes.string,
  onUpdate: PropTypes.func,
  yesLabel: PropTypes.any,
  yesValue: PropTypes.any,
  yesAriaLabel: PropTypes.any,
  noLabel: PropTypes.any,
  noValue: PropTypes.any,
  noAriaLabel: PropTypes.any,
  value: PropTypes.any,
}

// Default values for properties that are not specified
Branch.defaultProps = {
  name: undefined,
  label: undefined,
  adjustFor: 'buttons',
  className: '',
  confirmation: i18n.t('branch.confirmation'),
  yesLabel: i18n.t('branch.label.yes'),
  yesValue: i18n.t('branch.value.yes'),
  yesAriaLabel: '',
  noLabel: i18n.t('branch.label.no'),
  noValue: i18n.t('branch.value.no'),
  noAriaLabel: '',
  labelSize: 'label',
  warning: false,
  value: '',
  optional: false,
  help: undefined,
  helpTitle: undefined,
  helpMessage: undefined,
  scrollIntoView: false,
  children: undefined,
  disabled: false,
  required: false,
  onUpdate: () => {},
  onError: (value, arr) => arr,
}
