/**
 * HOC that connects input event handlers and optionally renders inside of a
 * FormField component
 */
import React from 'react'
import PropTypes from 'prop-types'

import { newGuid } from 'components/Form/ValidationElement/helpers'
import { REQUIRED } from 'constants/errors'

import FormField from './FormField/FormField'
import styles from './FormField/FormField.module.scss'

const connectInput = (Component, renderFormField = true) => {
  class ConnectedInput extends React.Component {
    constructor(props) {
      super(props)

      // TODO - newGuid should be replaced with a library for generating uuids
      this.uid = newGuid()

      this.state = {
        focus: false,
        showHelp: false,
      }
    }

    toggleHelp = () => {
      const { showHelp } = this.state
      this.setState({ showHelp: !showHelp })
    }

    handleChange = (value) => {
      const { name, onChange } = this.props
      onChange(name, value)
    }

    handleFocus = () => {
      this.setState({ focus: true })
    }

    handleBlur = () => {
      this.setState({ focus: false })
    }

    showErrors = () => {
      // Only show required error if required prop is true
      // Otherwise only show other errors if there is no required error (there's an invalid value)
      const { errors, required } = this.props
      if (required) return true
      return errors.filter(e => e.indexOf(`presence.${REQUIRED}`) > -1).length < 1
    }

    filterErrors = () => {
      // If there's a required error, only only that
      // Otherwise show the rest of the errors
      const { errors } = this.props
      const requiredError = errors.filter(e => e.indexOf(`presence.${REQUIRED}`) > -1)
      if (requiredError.length) return requiredError
      return errors
    }

    render() {
      const { errors } = this.props

      const showErrors = this.showErrors()

      const errorProps = {
        errors: showErrors && this.filterErrors(),
        valid: !errors || errors.length < 1,
        error: showErrors && errors.length > 0,
      }

      const inputComponent = (
        <Component
          uid={this.uid}
          {...this.props}
          {...this.state}
          {...errorProps}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
      )

      if (renderFormField) {
        const { modifiers } = this.props
        const { showHelp } = this.state
        return (
          <FormField
            {...this.props}
            {...this.state}
            {...errorProps}
            inputId={this.uid}
            showHelp={showHelp}
            toggleHelp={this.toggleHelp}
          >
            {inputComponent}
            {modifiers && (
              <div className={styles.modifiers}>{modifiers}</div>
            )}
          </FormField>
        )
      }

      return inputComponent
    }
  }

  ConnectedInput.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    modifiers: PropTypes.array,
    errors: PropTypes.array,
    required: PropTypes.bool,
  }

  ConnectedInput.defaultProps = {
    modifiers: null,
    onChange: () => {},
    errors: [],
    required: false,
  }

  return ConnectedInput
}

export default connectInput
