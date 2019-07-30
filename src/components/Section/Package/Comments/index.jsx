import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import i18n from 'util/i18n'
import { updateApplication } from 'actions/ApplicationActions'
import {
  Branch, Show, Field, Textarea,
} from 'components/Form'

const PackageComments = (props) => {
  const {
    HasComments, Comments, required, dispatch,
  } = props

  const updateBranch = (values) => {
    dispatch(updateApplication('Comments', 'HasComments', values))
  }

  const updateComments = (values) => {
    dispatch(updateApplication('Comments', 'Comments', values))
  }

  return (
    <div className="section-content">
      <h1 className="section-header">
        {i18n.t('review.commentsHeader')}
      </h1>
      <Branch
        name="has_comments"
        label={i18n.t('review.commentsBranchLabel')}
        labelSize="h4"
        {...HasComments}
        warning={true}
        required={required}
        onUpdate={updateBranch}
      />
      <Show when={HasComments && HasComments.value === 'Yes'}>
        <Field
          title={i18n.t('review.commentsTitle')}
          adjustFor="textarea"
        >
          {/* eslint jsx-a11y/label-has-associated-control: 0 */}
          <label htmlFor="Comments">
            {i18n.t('review.commentsLabel')}
          </label>
          <Textarea
            name="Comments"
            {...Comments}
            required={required}
            onUpdate={updateComments}
          />
        </Field>
      </Show>
    </div>
  )
}

PackageComments.propTypes = {
  HasComments: PropTypes.object,
  Comments: PropTypes.object,
  required: PropTypes.bool,
  dispatch: PropTypes.func,
}

PackageComments.defaultProps = {
  HasComments: {},
  Comments: {},
  required: false,
  dispatch: () => {},
}

const mapStateToProps = (state) => {
  const { application } = state
  const { Comments } = application

  return { ...Comments }
}

export default connect(mapStateToProps)(PackageComments)
