import React from 'react'
import PropTypes from 'prop-types'
import {
  updateApplication,
  reportErrors
} from '../../actions/ApplicationActions'

export default class SectionElement extends React.Component {
  constructor(props) {
    super(props)

    this.handleError = this.handleError.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  handleError(value, arr) {
    const action = reportErrors(this.props.section, this.props.subsection, arr)
    this.props.dispatch(action)
    return arr
  }

  handleUpdate(field, values) {
    // const id = `${this.props.section}/${this.props.subsection}`.replace(/\//g, '.')
    // this.props.dispatch(updateApplication(this.props.store, field, schema(id, values, false)))
    this.props.dispatch(updateApplication(this.props.store, field, values))
  }
}

SectionElement.propTypes = {
  dispatch: PropTypes.func,
  section: PropTypes.string.isRequired,
  store: PropTypes.string.isRequired,
  // required if you want anything to be displayed
  subsection: PropTypes.string
}
