/**
 * HOC that connects input event handlers and optionally renders inside of a
 * FormField component
 */
import React from 'react'
import PropTypes from 'prop-types'

import { newGuid } from 'components/Form/ValidationElement/helpers'

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

    render() {
      const inputComponent = (
        <Component
          uid={this.uid}
          {...this.props}
          {...this.state}
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
  }

  ConnectedInput.defaultProps = {
    modifiers: [],
    onChange: () => {},
  }

  return ConnectedInput
}

export default connectInput
