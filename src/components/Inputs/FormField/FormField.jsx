import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

class FormField extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      helpActive: false,
    }
  }

  render() {
    const { children, optional, className, dataTestId } = this.props

    const required = !optional

    const classes = classnames(
      'field',
      { required },
      className,
    )

    return (
      <div className={classes}>
        {children}
      </div>
    )
  }
}

export default FormField
