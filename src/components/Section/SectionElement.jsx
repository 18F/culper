import React from 'react'
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
    this.props.dispatch(reportErrors(this.props.section, '', arr))
    return arr
  }

  handleUpdate(field, values) {
    // const id = `${this.props.section}/${this.props.subsection}`.replace(/\//g, '.')
    // this.props.dispatch(updateApplication(this.props.store, field, schema(id, values, false)))
    this.props.dispatch(updateApplication(this.props.store, field, values))
  }
}

SectionElement.defaultProps = {
  section: '',
  subsection: '',
  store: ''
}
