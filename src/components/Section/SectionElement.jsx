import React from 'react'
import { push } from '../../middleware/history'
import { updateApplication, reportErrors, reportCompletion } from '../../actions/ApplicationActions'

export default class SectionElement extends React.Component {
  constructor (props) {
    super(props)

    this.handleError = this.handleError.bind(this)
    this.handleTour = this.handleTour.bind(this)
    this.handleReview = this.handleReview.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  componentDidMount () {
    let current = this.launch(this.props[this.props.store], this.props.Section.subsection, this.props.defaultView)
    if (current !== '') {
      this.props.dispatch(push(`/form/${this.props.Section.section}/${current}`))
    }
  }

  launch (storage, subsection, defaultView) {
    subsection = subsection || ''
    if (subsection === '') {
      let keys = Object.keys(storage)
      if (keys.length === 0 && storage.constructor === Object) {
        return defaultView
      }
    }

    return subsection
  }

  handleTour (event) {
    this.props.dispatch(push(`/form/${this.props.Section.section}/${this.props.defaultView}`))
  }

  handleReview (event) {
    this.props.dispatch(push(`/form/${this.props.Section.section}/review`))
  }

  handleError (value, arr) {
    arr = arr.map(err => {
      return {
        section: this.props.Section.section,
        subsection: this.props.Section.subsection,
        code: err.code,
        valid: err.valid
      }
    })

    this.props.dispatch(reportErrors(this.props.Section.section, '', arr))
    return arr
  }

  handleUpdate (field, values) {
    this.props.dispatch(updateApplication(this.props.store, field, values))
  }
}

SectionElement.defaultProps = {
  Section: { section: '', subsection: '' },
  defaultView: '',
  store: ''
}
