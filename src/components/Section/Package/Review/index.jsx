import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'

import i18n from 'util/i18n'
import { env } from 'config'

import FormStatus from '../FormStatus'
import connectPackageSection from '../PackageConnector'

export class PackageReview extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      width: 0,
    }
  }

  componentDidMount() {
    window.setTimeout(() => {
      this.setState({ width: 100 })
    }, 200)
  }

  onTransitionEnd = () => {
    const { history, location, formIsValid } = this.props

    let forceValid = false
    const { search } = location
    if (search) {
      const params = queryString.parse(search)
      if (params.force === 'true' && env.isDevelopment()) {
        forceValid = true
      }
    }

    if (formIsValid || forceValid) {
      history.push('/form/package/submit')
    } else {
      history.push('/form/package/errors')
    }
  }

  render() {
    const { width } = this.state

    return (
      <div className="submission-status">
        {i18n.m('application.submissionStatus.validating')}
        <FormStatus
          isTransitioning
          progressWidth={width}
          onTransitionEnd={this.onTransitionEnd}
        />
      </div>
    )
  }
}

PackageReview.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  formIsValid: PropTypes.bool,
}

PackageReview.defaultProps = {
  formIsValid: false,
}

export default connectPackageSection(PackageReview)
