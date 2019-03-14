import React from 'react'
import PropTypes from 'prop-types'

import i18n from 'util/i18n'

import { Svg } from 'components/Form'

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
    const { history } = this.props
    const formIsValid = true // false // TODO - validate form

    if (formIsValid) {
      history.push('/form/package/submit')
    } else {
      history.push('/form/package/errors')
    }
  }

  render() {
    const { width } = this.state

    const style = {
      width: `${width}%`,
    }

    return (
      <div className="submission-status">
        {i18n.m('application.submissionStatus.validating')}
        <div className="progress-container">
          <div className="review-icon">
            <img src="/img/review-checking.svg" alt="" />
          </div>
          <div className="progress-outline">
            <div className="progress-default">
              <div
                className="progress transition"
                style={style}
                onTransitionEnd={this.onTransitionEnd}
              />
            </div>
          </div>
          <div className="icon-container">
            <span className="icon">
              <Svg src="/img/checkmark.svg" />
            </span>
          </div>
        </div>
      </div>
    )
  }
}

PackageReview.propTypes = {
  history: PropTypes.object.isRequired,
}

export default PackageReview
