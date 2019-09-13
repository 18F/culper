import React from 'react'
import PropTypes from 'prop-types'

const connectInput = (Component) => {
  class ConnectedInput extends React.Component {
    constructor(props) {
      super(props)

      this.uid = ''

      this.state = {
        focus: false,
      }
    }

    handleChange = (event) => {
      const { name, onChange } = this.props
      const { value } = event.target
      onChange({ value, name })
    }

    handleFocus = () => {
      this.setState({ focus: true })
    }

    handleBlur = () => {
      this.setState({ focus: false })
    }

    render() {
      return (
        <Component
          uid={this.uid}
          {...this.props}
          {...this.state}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}

        />
      )
    }
  }

  ConnectedInput.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
  }

  ConnectedInput.defaultProps = {
    onChange: () => {},
  }

  return ConnectedInput
}

export default connectInput
