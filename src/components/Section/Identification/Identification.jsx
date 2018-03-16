import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../../config'
import { SectionViews, SectionView } from '../SectionView'
import SectionElement from '../SectionElement'
import SectionComments from '../SectionComments'
import AuthenticatedView from '../../../views/AuthenticatedView'
import { Field } from '../../Form'
import ApplicantName from './ApplicantName'
import ApplicantSSN from './ApplicantSSN'
import ApplicantBirthPlace from './ApplicantBirthPlace'
import ApplicantBirthDate from './ApplicantBirthDate'
import OtherNames from './OtherNames'
import Physical from './Physical'
import ContactInformation from './ContactInformation'

class Identification extends SectionElement {
  render () {
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

          <SectionView name="name"
                       back="identification/intro"
                       backLabel={i18n.t('identification.destination.intro')}
                       next="identification/othernames"
                       nextLabel={i18n.t('identification.destination.othernames')}>
            <ApplicantName name="name"
                           {...this.props.ApplicantName}
                           dispatch={this.props.dispatch}
                           onUpdate={this.handleUpdate.bind(this, 'ApplicantName')}
                           onError={this.handleError}
                           />
          </SectionView>

          <SectionView name="othernames"
                       back="identification/name"
                       backLabel={i18n.t('identification.destination.name')}
                       next="identification/contacts"
                       nextLabel={i18n.t('identification.destination.contacts')}>
            <OtherNames name="othernames"
                        {...this.props.OtherNames}
                        dispatch={this.props.dispatch}
                        onUpdate={this.handleUpdate.bind(this, 'OtherNames')}
                        onError={this.handleError}
                        />
          </SectionView>

          <SectionView name="birthdate"
                       next="identification/birthplace"
                       nextLabel={i18n.t('identification.destination.birthplace')}
                       back="identification/contacts"
                       backLabel={i18n.t('identification.destination.contacts')}>
            <ApplicantBirthDate name="birthdate"
                                {...this.props.ApplicantBirthDate}
                                dispatch={this.props.dispatch}
                                onUpdate={this.handleUpdate.bind(this, 'ApplicantBirthDate')}
                                onError={this.handleError}
                                />
          </SectionView>

          <SectionView name="birthplace"
                       next="identification/ssn"
                       nextLabel={i18n.t('identification.destination.ssn')}
                       back="identification/birthdate"
                       backLabel={i18n.t('identification.destination.birthdate')}>
            <ApplicantBirthPlace name="birthplace"
                                 {...this.props.ApplicantBirthPlace}
                                 dispatch={this.props.dispatch}
                                 onUpdate={this.handleUpdate.bind(this, 'ApplicantBirthPlace')}
                                 onError={this.handleError}
                                 />
          </SectionView>

          <SectionView name="contacts"
                       back="identification/othernames"
                       backLabel={i18n.t('identification.destination.othernames')}
                       next="identification/birthdate"
                       nextLabel={i18n.t('identification.destination.birthdate')}>
            <ContactInformation name="contacts"
                                {...this.props.Contacts}
                                dispatch={this.props.dispatch}
                                onUpdate={this.handleUpdate.bind(this, 'Contacts')}
                                onError={this.handleError}
                                />
          </SectionView>

          <SectionView name="ssn"
                       back="identification/birthplace"
                       backLabel={i18n.t('identification.destination.birthplace')}
                       next="identification/physical"
                       nextLabel={i18n.t('identification.destination.physical')}>
            <ApplicantSSN name="ssn"
                          {...this.props.ApplicantSSN}
                          dispatch={this.props.dispatch}
                          onUpdate={this.handleUpdate.bind(this, 'ApplicantSSN')}
                          onError={this.handleError}
                          />
          </SectionView>

          <SectionView name="physical"
                       back="identification/ssn"
                       backLabel={i18n.t('identification.destination.ssn')}
                       next="identification/review"
                       nextLabel={i18n.t('identification.destination.review')}>
            <Physical name="physical"
                      {...this.props.Physical}
                      dispatch={this.props.dispatch}
                      onUpdate={this.handleUpdate.bind(this, 'Physical')}
                      onError={this.handleError}
                      />
          </SectionView>
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
