import React from 'react'
import PropTypes from 'prop-types'
import { i18n } from '../../../config'
import { Field, Radio, RadioGroup } from '../../Form'

const propTypes = {
  adjustFor: PropTypes.string.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  help: PropTypes.string,
  label: PropTypes.string,
  labelSize: PropTypes.string,
  name: PropTypes.string,
  noAriaLabel: PropTypes.string,
  noLabel: PropTypes.string,
  noValue: PropTypes.string,
  onError: PropTypes.func,
  onUpdate: PropTypes.func,
  optional: PropTypes.bool,
  required: PropTypes.bool,
  scrollIntoView: PropTypes.bool,
  value: PropTypes.string,
  yesAriaLabel: PropTypes.string,
  yesLabel: PropTypes.string,
  yesValue: PropTypes.string
}

/**
 * Branch is a component that stores whether Yes/No options were selected. It contains a callback
 * function that can be used to be upated when a button is clicked. The button labels and values are
 * configurable by passing in the appropriate property which are defined in the Branch.defaultProps object.
 */
export default class Branch extends React.Component {
  constructor(props) {
    super(props)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  handleUpdate(values) {
    // If they answered "No" (or deselects "Yes" entirely) we need to
    // check if a confirmation is required.
    if (
      (values.value === this.props.noValue || values.value === '') &&
      this.props.value === this.props.yesValue
    ) {
      // When a `warning` should be displayed AND they do no approve the change then
      // set the old value back to "Yes".
      if (
        this.props.warning &&
        window.confirm(this.props.confirmation) === false
      ) {
        return
      }
    }

    this.props.onUpdate({
      name: this.props.name,
      value: values.value
    })
  }

  render() {
    const klass = `branch ${this.props.className || ''}`.trim()

    return (
      <Field
        title={this.props.label}
        titleSize={this.props.labelSize}
        optional={this.props.optional}
        className={klass}
        help={this.props.help}
        adjustFor={this.props.adjustFor}
        scrollIntoView={this.props.scrollIntoView}
        shrink={true}>
        <div className="content">{this.props.children}</div>
        <RadioGroup
          className="option-list branch"
          disabled={this.props.disabled}
          required={this.props.required}
          onError={this.props.onError}
          selectedValue={this.props.value}>
          <Radio
            name={this.props.name}
            label={this.props.yesLabel}
            value={this.props.yesValue}
            ariaLabel={this.props.yesAriaLabel}
            className="yes"
            onUpdate={this.handleUpdate}
            onError={this.props.onError}
          />
          <Radio
            name={this.props.name}
            label={this.props.noLabel}
            value={this.props.noValue}
            ariaLabel={this.props.noAriaLabel}
            className="no"
            onUpdate={this.handleUpdate}
            onError={this.props.onError}
          />
        </RadioGroup>
      </Field>
    )
  }
}

Branch.propTypes = propTypes;

// Default values for properties that are not specified
Branch.defaultProps = {
  adjustFor: 'buttons',
  className: '',
  confirmation: i18n.t('branch.confirmation'),
  yesLabel: i18n.t('branch.label.yes'),
  yesValue: i18n.t('branch.value.yes'),
  yesAriaLabel: null,
  noLabel: i18n.t('branch.label.no'),
  noValue: i18n.t('branch.value.no'),
  noAriaLabel: null,
  labelSize: 'label',
  
  warning: false,
  
  value: '',
  onUpdate: queue => {},
  optional: false,
  onError: (value, arr) => {
    return arr
  }
}
