import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../../config'
import { SectionViews, SectionView } from '../SectionView'
import SectionElement from '../SectionElement'
import SectionComments from '../SectionComments'
import AuthenticatedView from '../../../views/AuthenticatedView'
import { Field } from '../../Form'
import { addDividers, createSubsection, getSectionConfig } from '../generators'
import ApplicantName from './ApplicantName'
import ApplicantSSN from './ApplicantSSN'
import ApplicantBirthPlace from './ApplicantBirthPlace'
import ApplicantBirthDate from './ApplicantBirthDate'
import OtherNames from './OtherNames'
import Physical from './Physical'
import ContactInformation from './ContactInformation'

const section = 'identification'

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
  createSubsection (subsection, extraExtraProps = {}) {
    const extraProps = {
      ...this.props[subsection.store],
      dispatch: this.props.dispatch,
      onUpdate: this.handleUpdate.bind(this, subsection.store),
      onError: this.handleError,
      ...extraExtraProps
    }
    return createSubsection(storeToComponentMap, subsection, extraProps)
  }

  createReviewGroups () {
    const subsections = getSectionConfig(section).subsections

    let components = subsections.map((subsection) => {
      if (subsection.exclude) {
        return null
      }

      const extraProps = {
        section,
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
  createSectionViews () {
    const subsections = getSectionConfig(section).subsections

    const views = subsections.map((subsection, i) => {
      if (subsection.exclude) {
        return null
      }

      const prev = subsections[i-1]
      const next = subsections[i+1]
      const ssComponent = this.createSubsection(subsection)

      return (
        <SectionView key={`${section}/${subsection.url}`}
          name={subsection.url}
          back={`${section}/${prev.url}`}
          backLabel={i18n.t(`${section}.destination.${prev.url}`)}
          next={`${section}/${next.url}`}
          nextLabel={i18n.t(`${section}.destination.${next.url}`)}>
          {ssComponent}
        </SectionView>
      )
    })

    // exclude nulls
    return views.filter(v => !!v)
  }

  render () {
    const reviewComponents = this.createReviewGroups()
    const sectionViews = this.createSectionViews()

    return (
      <div>
        <SectionViews current={this.props.subsection} dispatch={this.props.dispatch} update={this.props.update}>
          <SectionView name="intro"
                       next="identification/name"
                       nextLabel={i18n.t('identification.destination.name')}>
            <Field title={i18n.t('identification.intro.title')}
                   titleSize="h2"
                   optional={true}
                   className="no-margin-bottom">
              {i18n.m('identification.intro.body')}
            </Field>
          </SectionView>

          <SectionView name="review"
                       title={i18n.t('review.title')}
                       para={i18n.m('review.para')}
                       showTop={true}
                       back="identification/physical"
                       backLabel={i18n.t('identification.destination.physical')}
                       next="history/intro"
                       nextLabel={i18n.t('history.destination.intro')}>
            {reviewComponents}
            <SectionComments name="comments"
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

function mapStateToProps (state) {
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
  render () {
    return (
      <div>
        <ApplicantName name="name"
                       {...this.props.ApplicantName}
                       dispatch={this.props.dispatch}
                       onError={this.props.onError}
                       required={true}
                       scrollIntoView={false}
                       />
        <hr className="section-divider" />
        <OtherNames name="othernames"
                    {...this.props.OtherNames}
                    defaultState={false}
                    dispatch={this.props.dispatch}
                    onError={this.props.onError}
                    required={true}
                    scrollIntoView={false}
                    />
        <hr className="section-divider" />
        <ContactInformation name="contacts"
                            {...this.props.Contacts}
                            minimumPhoneNumbers={1}
                            minimumEmails={1}
                            shouldFilterEmptyItems={true}
                            defaultState={false}
                            dispatch={this.props.dispatch}
                            onError={this.props.onError}
                            required={true}
                            scrollIntoView={false}
                            />
        <hr className="section-divider" />
        <ApplicantBirthDate name="birthdate"
                            {...this.props.ApplicantBirthDate}
                            dispatch={this.props.dispatch}
                            onError={this.props.onError}
                            required={true}
                            scrollIntoView={false}
                            />
        <hr className="section-divider" />
        <ApplicantBirthPlace name="birthplace"
                             {...this.props.ApplicantBirthPlace}
                             dispatch={this.props.dispatch}
                             onError={this.props.onError}
                             required={true}
                             scrollIntoView={false}
                             />
        <hr className="section-divider" />
        <ApplicantSSN name="ssn"
                      {...this.props.ApplicantSSN}
                      dispatch={this.props.dispatch}
                      onError={this.props.onError}
                      required={true}
                      scrollIntoView={false}
                      />
        <hr className="section-divider" />
        <Physical name="physical"
                  {...this.props.Physical}
                  dispatch={this.props.dispatch}
                  onError={this.props.onError}
                  required={true}
                  scrollIntoView={false}
                  />
        <hr className="section-divider" />
        <SectionComments name="comments"
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
