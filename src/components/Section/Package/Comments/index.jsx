import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import i18n from 'util/i18n'
import { validateSection } from 'helpers/validation'
import { updateApplication, reportCompletion } from 'actions/ApplicationActions'
import { REVIEW_AND_SUBMIT, REVIEW_AND_SUBMIT_COMMENTS } from 'config/formSections/review'
import {
  Branch, Show, Field, Textarea,
} from 'components/Form'
import SectionNavigation from 'components/Section/shared/SectionNavigation'

const sectionConfig = {
  key: REVIEW_AND_SUBMIT_COMMENTS.key,
  section: REVIEW_AND_SUBMIT.name,
  store: REVIEW_AND_SUBMIT.store,
  subsection: REVIEW_AND_SUBMIT_COMMENTS.name,
  storeKey: REVIEW_AND_SUBMIT_COMMENTS.storeKey,
}

const PackageComments = (props) => {
  const {
    HasComments, Comments, required, dispatch, location, formType,
  } = props

  const updateBranch = (values) => {
    const updatedValues = { HasComments: values }
    dispatch(updateApplication(
      sectionConfig.store,
      sectionConfig.storeKey,
      updatedValues,
    ))

    dispatch(reportCompletion(
      sectionConfig.section,
      sectionConfig.subsection,
      validateSection({
        data: { HasComments, Comments, ...updatedValues },
        key: sectionConfig.key,
      }, formType) === true
    ))
  }

  const updateComments = (values) => {
    const updatedValues = { Comments: values }
    dispatch(updateApplication(
      sectionConfig.store,
      sectionConfig.storeKey,
      { HasComments, ...updatedValues },
    ))

    dispatch(reportCompletion(
      sectionConfig.section,
      sectionConfig.subsection,
      validateSection({
        data: { HasComments, Comments, ...updatedValues },
        key: sectionConfig.key,
      }, formType) === true
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
  formType: PropTypes.string,
}

PackageComments.defaultProps = {
  HasComments: {},
  Comments: {},
  required: false,
  dispatch: () => {},
  location: {},
  formType: '',
}

const mapStateToProps = (state) => {
  const { application } = state
  const { Package = {} } = application
  const { Comments = {} } = Package

  return {
    HasComments: Comments.HasComments,
    Comments: Comments.Comments,
    formType: application.Settings.formType,
  }
}

export default connect(mapStateToProps)(PackageComments)
