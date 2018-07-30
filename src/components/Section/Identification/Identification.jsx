import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../../config'
import { SectionViews, SectionView } from '../SectionView'
import SectionElement from '../SectionElement'
import SectionComments from '../SectionComments'
import { Field } from '../../Form'
import { addDividers, createSubsection } from '../generators'
import navigation from './navigation'
import ApplicantName from './ApplicantName'
import ApplicantSSN from './ApplicantSSN'
import ApplicantBirthPlace from './ApplicantBirthPlace'
import ApplicantBirthDate from './ApplicantBirthDate'
import OtherNames from './OtherNames'
import Physical from './Physical'
import ContactInformation from './ContactInformation'

const storeToComponentMap = {
  ApplicantBirthDate,
  ApplicantBirthPlace,
  ApplicantName,
  ApplicantSSN,
  Contacts: ContactInformation,
  OtherNames,
  Physical
}

class Identification extends SectionElement {
  createSubsection(subsection, extraExtraProps = {}) {
    const extraProps = {
      ...this.props[subsection.store],
      dispatch: this.props.dispatch,
      onUpdate: this.handleUpdate.bind(this, subsection.store),
      onError: this.handleError,
      ...extraExtraProps
    }
    return createSubsection(storeToComponentMap, subsection, extraProps)
  }

  createReviewGroups() {
    const subsections = navigation.subsections

    let components = subsections.map(subsection => {
      if (subsection.exclude) {
        return null
      }

      const extraProps = {
        section: this.props.section,
        subsection: subsection.url,
        required: true,
        scrollIntoView: false
      }

      // TODO figure out a better way to handle these special properties
      if (subsection.url === 'contacts') {
        extraProps.shouldFilterEmptyItems = true
      }

      return this.createSubsection(subsection, extraProps)
    })

    // exclude nulls
    components = components.filter(c => !!c)

    return addDividers(components)
  }

  // Returns an array of SectionViews with their corresponding child component, based on the navigation
  createSectionViews() {
    const subsections = navigation.subsections

    const views = subsections.map((subsection, i) => {
      if (subsection.exclude) {
        return null
      }

      const prev = subsections[i - 1]
      const next = subsections[i + 1]
      const ssComponent = this.createSubsection(subsection)

      return (
        <SectionView
          key={`${this.props.section}/${subsection.url}`}
          name={subsection.url}
          back={`${this.props.section}/${prev.url}`}
          backLabel={i18n.t(`${this.props.section}.destination.${prev.url}`)}
          next={`${this.props.section}/${next.url}`}
          nextLabel={i18n.t(`${this.props.section}.destination.${next.url}`)}>
          {ssComponent}
        </SectionView>
      )
    })

    // exclude nulls
    return views.filter(v => !!v)
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
  createSubsection(subsection) {
    const extraProps = {
      ...this.props[subsection.store],
      dispatch: this.props.dispatch,
      onError: this.props.onError,
      required: true,
      scrollIntoView: false
    }

    // TODO figure out a better way to handle these special properties
    switch (subsection.url) {
      case 'contacts':
        extraProps.defaultState = false
        extraProps.shouldFilterEmptyItems = true
        break
      case 'othernames':
        extraProps.defaultState = false
    }

    return createSubsection(storeToComponentMap, subsection, extraProps)
  }

  createSubsections() {
    const subsections = navigation.subsections

    const components = subsections.map((subsection, i) => {
      if (subsection.exclude) {
        return null
      }

      return this.createSubsection(subsection)
    })

    // exclude nulls
    return components.filter(v => !!v)
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

export default connect(mapStateToProps)(Identification)
