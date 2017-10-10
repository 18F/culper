import React from 'react'
import { i18n } from '../../../config'
import { Show, Svg } from '../../Form'
import { Link } from 'react-router'

export default class SubmissionComplete extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className="submission-complete">
        <div className="text-center">
          <span className="checkmark">
            <Svg src="/img/checkmark.svg" />
          </span>
          { i18n.m(`submission.submissionComplete`) }
          <button className="usa-button">
            Save/Print
          </button>
        </div>
      </div>
    )
  }
}

SubmissionComplete.defaultProps = {}
