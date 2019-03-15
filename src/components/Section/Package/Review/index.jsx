import React from 'react'
import PropTypes from 'prop-types'

import i18n from 'util/i18n'

import FormStatus from '../FormStatus'
import connectPackageSection from '../PackageConnector'

class PackageReview extends React.Component {
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
    const { history, formIsValid } = this.props

    console.log('validate form', formIsValid)

    if (formIsValid) {
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
  formIsValid: PropTypes.bool,
}

PackageReview.defaultProps = {
  formIsValid: false,
}

export default connectPackageSection(PackageReview)
