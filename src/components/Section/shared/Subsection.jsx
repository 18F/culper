import React from 'react'
import PropTypes from 'prop-types'
import { newGuid } from 'components/Form/ValidationElement'

export default class SubsectionElement extends React.Component {
  constructor(props) {
    super(props)

    this.handleError = this.handleError.bind(this)
  }

  handleError(value, arr) {
    const { onError } = this.props

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
  onError: PropTypes.func,
}

SubsectionElement.defaultProps = {
  onError: (value, arr) => arr,
}
