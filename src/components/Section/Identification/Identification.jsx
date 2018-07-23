import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../../config'
import { SectionViews, SectionView } from '../SectionView'
import SectionElement from '../SectionElement'
import SectionComments from '../SectionComments'
import AuthenticatedView from '../../../views/AuthenticatedView'
import { Field } from '../../Form'
import navigation from '../../../config/navigation'
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
  getSubsectionComponent (name) {
    // https://reactjs.org/docs/jsx-in-depth.html#choosing-the-type-at-runtime
    const SubsectionComponent = storeToComponentMap[name]
    if (!SubsectionComponent) {
      console.error(`${name} component not found`)
    }
    return SubsectionComponent
  }

  // Returns the component corresponding to the provided subsection object
  createSubsection (subsection) {
    const SubsectionComponent = this.getSubsectionComponent(subsection.store)

    const props = {
      ...this.props[subsection.store],
      name: subsection.url,
      dispatch: this.props.dispatch,
      onUpdate: this.handleUpdate.bind(this, subsection.store),
      onError: this.handleError
    }

    return React.createElement(SubsectionComponent, props)
  }

  // Returns an array of SectionViews with their corresponding child component, based on the navigation
  createSectionViews () {
    const sectionNav = navigation.find(n => n.url === 'identification')
    const subsections = sectionNav.subsections

    const views = subsections.map((ss, i) => {
      if (ss.exclude) {
        return null
      }

      const prev = subsections[i-1]
      const next = subsections[i+1]
      const ssComponent = this.createSubsection(ss)

      return (
        <SectionView key={`identification/${ss.url}`}
          name={ss.url}
          back={`identification/${prev.url}`}
          backLabel={i18n.t(`identification.destination.${prev.url}`)}
          next={`identification/${next.url}`}
          nextLabel={i18n.t(`identification.destination.${next.url}`)}>
          {ssComponent}
        </SectionView>
      )
    })

    // exclude nulls
    return views.filter(v => !!v)
  }

  render () {
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
            <ApplicantName name="name"
                           {...this.props.ApplicantName}
                           section="identification"
                           subsection="name"
                           dispatch={this.props.dispatch}
                           onUpdate={this.handleUpdate.bind(this, 'ApplicantName')}
                           onError={this.handleError}
                           required={true}
                           scrollIntoView={false}
                           />
            <hr className="section-divider" />
            <OtherNames name="othernames"
                        {...this.props.OtherNames}
                        section="identification"
                        subsection="othernames"
                        defaultState={false}
                        dispatch={this.props.dispatch}
                        onUpdate={this.handleUpdate.bind(this, 'OtherNames')}
                        onError={this.handleError}
                        required={true}
                        scrollIntoView={false}
                        />
            <hr className="section-divider" />
            <ContactInformation name="contacts"
                                {...this.props.Contacts}
                                section="identification"
                                subsection="contacts"
                                minimumPhoneNumbers={1}
                                minimumEmails={1}
                                shouldFilterEmptyItems={true}
                                defaultState={false}
                                dispatch={this.props.dispatch}
                                onUpdate={this.handleUpdate.bind(this, 'Contacts')}
                                onError={this.handleError}
                                required={true}
                                scrollIntoView={false}
                                />
            <hr className="section-divider" />
            <ApplicantBirthDate name="birthdate"
                                {...this.props.ApplicantBirthDate}
                                section="identification"
                                subsection="birthdate"
                                dispatch={this.props.dispatch}
                                onUpdate={this.handleUpdate.bind(this, 'ApplicantBirthDate')}
                                onError={this.handleError}
                                required={true}
                                scrollIntoView={false}
                                />
            <hr className="section-divider" />
            <ApplicantBirthPlace name="birthplace"
                                 {...this.props.ApplicantBirthPlace}
                                 section="identification"
                                 subsection="birthplace"
                                 dispatch={this.props.dispatch}
                                 onUpdate={this.handleUpdate.bind(this, 'ApplicantBirthPlace')}
                                 onError={this.handleError}
                                 required={true}
                                 scrollIntoView={false}
                                 />
            <hr className="section-divider" />
            <ApplicantSSN name="ssn"
                          {...this.props.ApplicantSSN}
                          section="identification"
                          subsection="ssn"
                          dispatch={this.props.dispatch}
                          onUpdate={this.handleUpdate.bind(this, 'ApplicantSSN')}
                          onError={this.handleError}
                          required={true}
                          scrollIntoView={false}
                          />
            <hr className="section-divider" />
            <Physical name="physical"
                      {...this.props.Physical}
                      section="identification"
                      subsection="physical"
                      dispatch={this.props.dispatch}
                      onUpdate={this.handleUpdate.bind(this, 'Physical')}
                      onError={this.handleError}
                      required={true}
                      scrollIntoView={false}
                      />
            <hr className="section-divider" />
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
