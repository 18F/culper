import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../../config'
import { SectionViews, SectionView } from '../SectionView'
import SectionElement from '../SectionElement'
import SectionComments from '../SectionComments'
import AuthenticatedView from '../../../views/AuthenticatedView'
import { Field } from '../../Form'
import {
  addDividers,
  createSectionViews,
  createReviewGroups,
  createPrintSubsectionViews
} from '../generators'
import navigation from './navigation'
import storeToComponentMap from './subsections'

class Identification extends SectionElement {
  getSubsectionProps(subsection) {
    return {
      ...this.props[subsection.store],
      dispatch: this.props.dispatch,
      onUpdate: this.handleUpdate.bind(this, subsection.store),
      onError: this.handleError
    }
  }

  createReviewGroups() {
    return createReviewGroups(storeToComponentMap, navigation, subsection => {
      const props = this.getSubsectionProps(subsection)
      if (subsection.url === 'contacts') {
        props.shouldFilterEmptyItems = true
      }
      return props
    })
  }

  createSectionViews() {
    return createSectionViews(storeToComponentMap, navigation, subsection => {
      return this.getSubsectionProps(subsection)
    })
  }

  render() {
    const reviewComponents = this.createReviewGroups()
    const sectionViews = this.createSectionViews()

    return (
      <div>
        <SectionViews
          current={this.props.subsection}
          dispatch={this.props.dispatch}
          update={this.props.update}>
          <SectionView
            name="intro"
            next="identification/name"
            nextLabel={i18n.t('identification.destination.name')}>
            <Field
              title={i18n.t('identification.intro.title')}
              titleSize="h2"
              optional={true}
              className="no-margin-bottom">
              {i18n.m('identification.intro.body')}
            </Field>
          </SectionView>

          <SectionView
            name="review"
            title={i18n.t('review.title')}
            para={i18n.m('review.para')}
            showTop={true}
            back="identification/physical"
            backLabel={i18n.t('identification.destination.physical')}
            next="history/intro"
            nextLabel={i18n.t('history.destination.intro')}>
            {reviewComponents}
            <SectionComments
              name="comments"
              {...this.props.Comments}
              section="identification"
              subsection="name"
              title={i18n.t('identification.review.comments')}
              dispatch={this.props.dispatch}
              onUpdate={this.handleUpdate.bind(this, 'Comments')}
              onError={this.handleError}
              required={false}
              scrollIntoView={false}
            />
          </SectionView>

          {sectionViews}
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
    return createPrintSubsectionViews(
      storeToComponentMap,
      navigation,
      subsection => {
        return this.getSubsectionProps(subsection)
      }
    )
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
