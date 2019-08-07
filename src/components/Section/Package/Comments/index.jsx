import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import i18n from 'util/i18n'
import { updateApplication } from 'actions/ApplicationActions'
import {
  Branch, Show, Field, Textarea,
} from 'components/Form'
import SectionNavigation from 'components/Section/shared/SectionNavigation'

const PackageComments = (props) => {
  const {
    Comments, required, dispatch, location,
  } = props

  const updateBranch = (values) => {
    dispatch(updateApplication(
      'Package',
      'Comments',
      { HasComments: values },
    ))
  }

  const updateComments = (values) => {
    dispatch(updateApplication(
      'Package',
      'Comments',
      {
        ...Comments,
        Comments: values,
      },
    ))
  }

  return (
    <div className="view">
      <div className="section-content">
        <h1 className="section-header">
          {i18n.t('review.commentsHeader')}
        </h1>
        <Branch
          name="has_comments"
          label={i18n.t('review.commentsBranchLabel')}
          labelSize="h4"
          {...Comments.HasComments}
          warning={true}
          required={required}
          onUpdate={updateBranch}
        />
        <Show when={Comments.HasComments && Comments.HasComments.value === 'Yes'}>
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
              {...Comments.Comments}
              required={required}
              onUpdate={updateComments}
            />
          </Field>
        </Show>
      </div>

      <SectionNavigation currentPath={location.pathname} />
    </div>
  )
}

PackageComments.propTypes = {
  HasComments: PropTypes.object,
  Comments: PropTypes.object,
  required: PropTypes.bool,
  dispatch: PropTypes.func,
  location: PropTypes.object,
}

PackageComments.defaultProps = {
  HasComments: {},
  Comments: {},
  required: false,
  dispatch: () => {},
  location: {},
}

const mapStateToProps = (state) => {
  const { application } = state
  const { Package } = application

  return { ...Package }
}

export default connect(mapStateToProps)(PackageComments)
