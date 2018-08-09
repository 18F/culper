import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../../config'
import { SectionViews } from '../SectionView'
import SectionElement from '../SectionElement'
import SectionComments from '../SectionComments'
import AuthenticatedView from '../../../views/AuthenticatedView'
import {
  addDividers,
  createIntroSubsection,
  createPrintSubsectionViews
} from '../generators'
import navigation from './navigation'

class Identification extends SectionElement {
  getReviewGroupProps(subsection) {
    const props = super.getReviewGroupProps(subsection)
    if (subsection.url === 'contacts') {
      props.shouldFilterEmptyItems = true
    }
    return props
  }

  render() {
    const introSubsection = createIntroSubsection(this.props.section)
    const sectionViews = this.createSectionViews(navigation)
    const reviewSubsection = this.createReviewSubsection(navigation, 'history')

    return (
      <div>
        <SectionViews
          current={this.props.subsection}
          dispatch={this.props.dispatch}
          update={this.props.update}>
          {introSubsection}
          {sectionViews}
          {reviewSubsection}
        </SectionViews>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const app = state.application || {}
  const identification = app.Identification || {}
  const errors = app.Errors || {}
  const completed = app.Completed || {}
  return {
    Identification: identification,
    ApplicantName: identification.ApplicantName || {},
    ApplicantBirthDate: identification.ApplicantBirthDate || {},
    ApplicantBirthPlace: identification.ApplicantBirthPlace || {},
    ApplicantSSN: identification.ApplicantSSN || {},
    OtherNames: identification.OtherNames || {},
    Contacts: identification.Contacts || {},
    Physical: identification.Physical || {},
    Comments: identification.Comments || {},
    Errors: errors.identification || [],
    Completed: completed.identification || []
  }
}

Identification.defaultProps = {
  section: 'identification',
  store: 'Identification'
}

export class IdentificationSections extends React.Component {
  getSubsectionProps(subsection) {
    const extraProps = {
      ...this.props[subsection.store],
      dispatch: this.props.dispatch,
      onError: this.props.onError
    }

    switch (subsection.url) {
      case 'contacts':
        extraProps.defaultState = false
        extraProps.shouldFilterEmptyItems = true
        break
      case 'othernames':
        extraProps.defaultState = false
    }

    return extraProps
  }

  createSubsections() {
    return createPrintSubsectionViews(navigation, subsection => {
      return this.getSubsectionProps(subsection)
    })
  }

  render() {
    const components = addDividers(this.createSubsections())

    return (
      <div>
        {components}
        <SectionComments
          name="comments"
          {...this.props.Comments}
          title={i18n.t('identification.review.comments')}
          dispatch={this.props.dispatch}
          onError={this.props.onError}
          required={false}
          scrollIntoView={false}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps)(AuthenticatedView(Identification))
