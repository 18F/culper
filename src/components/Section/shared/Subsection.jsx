import React from 'react'
import PropTypes from 'prop-types'
import { reportCompletion } from 'actions/ApplicationActions'
import { newGuid } from 'components/Form/ValidationElement'

export default class SubsectionElement extends React.Component {
  constructor(props) {
    super(props)

    this.handleError = this.handleError.bind(this)
    this.handleCompletion = this.handleCompletion.bind(this)
  }

  handleCompletion() {
    const { dispatch, validator } = this.props

    const data = {
      ...this.props,
      ...this.state,
    }

    dispatch(
      reportCompletion(
        this.section,
        this.subsection,
        validator(data) === true
      )
    )
  }

  handleError(value, arr) {
    const { onError } = this.props

    this.handleCompletion()
    /* eslint no-param-reassign: 0 */
    arr = arr.map(err => ({
      ...err,
      // note the original subsection the field is associated with, as it could
      // be appearing under 'review'
      section: this.section,
      subsection: this.subsection,
    }))
    /* eslint no-param-reassign: 1 */

    return onError(value, arr)
  }

  guid() { return newGuid() } // eslint-disable-line
}

SubsectionElement.propTypes = {
  dispatch: PropTypes.func,
  validator: PropTypes.func,
  onError: PropTypes.func,
}

SubsectionElement.defaultProps = {
  dispatch: () => {},
  validator: () => false,
  onError: (value, arr) => arr,
}
