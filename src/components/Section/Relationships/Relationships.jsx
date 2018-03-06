import React from 'react'
import { connect } from 'react-redux'
import { updateApplication } from '../../../actions/ApplicationActions'
import { i18n } from '../../../config'
import { SectionViews, SectionView } from '../SectionView'
import SectionElement from '../SectionElement'
import SectionComments from '../SectionComments'
import AuthenticatedView from '../../../views/AuthenticatedView'
import { Field } from '../../Form'
import Relatives from './Relatives'
import Marital from './RelationshipStatus/Marital'
import Cohabitants from './RelationshipStatus/Cohabitants'
import People from './People'

class Relationships extends SectionElement {
  constructor (props) {
    super(props)
    this.updateMarital = this.updateMarital.bind(this)
    this.updatePeople = this.updatePeople.bind(this)
    this.updateRelatives = this.updateRelatives.bind(this)
    this.updateMarital = this.updateMarital.bind(this)
    this.updateCohabitants = this.updateCohabitants.bind(this)
    this.updateSpouse = this.updateSpouse.bind(this)
  }

  updateMarital (values) {
    this.handleUpdate('Marital', values)
  }

  updatePeople (values) {
    this.handleUpdate('People', values)
  }

  updateRelatives (values) {
    this.handleUpdate('Relatives', values)
  }

  updateCohabitants (values) {
    this.handleUpdate('Cohabitants', values)
  }

  /**
   * Listens for updates when a spouses name is updated. This is to notify
   * other parts of the app that this information has changed
   */
  updateSpouse (values) {
    this.props.dispatch(updateApplication('Relationships', 'ClearSameSpouseConfirmed', true))
  }

  render () {
    return (
      <div>
        <SectionViews current={this.props.subsection} dispatch={this.props.dispatch} update={this.props.update}>
          <SectionView name="intro"
                       back="identification/review"
                       backLabel={i18n.t('identification.destination.review')}
                       next="relationships/status/marital"
                       nextLabel={i18n.t('relationships.destination.marital')}>
            <Field title={i18n.t('relationships.intro.title')}
                   titleSize="h2"
                   optional={true}
                   className="no-margin-bottom">
              {i18n.m('relationships.intro.body')}
            </Field>
          </SectionView>

          <SectionView name="status/marital"
                       back="relationships/intro"
                       backLabel={i18n.t('relationships.destination.intro')}
                       next="relationships/status/cohabitant"
                       nextLabel={i18n.t('relationships.destination.cohabitant')}>
            <Marital name="marital"
                     {...this.props.Marital}
                     addressBooks={this.props.AddressBooks}
                     dispatch={this.props.dispatch}
                     onUpdate={this.updateMarital}
                     onError={this.handleError}
                     onSpouseUpdate={this.updateSpouse}
                     currentAddress={this.props.CurrentAddress}
                     scrollToBottom={this.props.scrollToBottom}
                     />
          </SectionView>

          <SectionView name="status/cohabitant"
                       back="relationships/status/marital"
                       backLabel={i18n.t('relationships.destination.marital')}
                       next="relationships/people"
                       nextLabel={i18n.t('relationships.destination.people')}>
            <Cohabitants name="cohabitants"
                         {...this.props.Cohabitants}
                         spouse={this.props.Spouse}
                         dispatch={this.props.dispatch}
                         onUpdate={this.updateCohabitants}
                         onError={this.handleError}
                         scrollToBottom={this.props.scrollToBottom}
                         />
          </SectionView>

          <SectionView name="people"
                       back="relationships/status/cohabitant"
                       backLabel={i18n.t('relationships.destination.cohabitant')}
                       next="relationships/relatives"
                       nextLabel={i18n.t('relationships.destination.relatives')}>
            <People name="people"
                    {...this.props.People}
                    addressBooks={this.props.AddressBooks}
                    dispatch={this.props.dispatch}
                    onUpdate={this.updatePeople}
                    onError={this.handleError}
                    scrollToBottom={this.props.scrollToBottom}
                    />
          </SectionView>

          <SectionView name="relatives"
                       back="relationships/people"
                       backLabel={i18n.t('relationships.destination.people')}
                       next="relationships/review"
                       nextLabel={i18n.t('relationships.destination.review')}>
            <Relatives name="relatives"
                       {...this.props.Relatives}
                       addressBooks={this.props.AddressBooks}
                       dispatch={this.props.dispatch}
                       onUpdate={this.updateRelatives}
                       onError={this.handleError}
                       scrollToBottom={this.props.scrollToBottom}
                       />
          </SectionView>

          <SectionView name="review"
                       title={i18n.t('review.title')}
                       para={i18n.m('review.para')}
                       showTop={true}
                       back="relationships/relatives"
                       backLabel={i18n.t('relationships.destination.relatives')}
                       next="history/intro"
                       nextLabel={i18n.t('history.destination.intro')}>
            <Marital name="marital"
                     {...this.props.Marital}
                     section="relationships"
                     subsection="status/marital"
                     defaultState={false}
                     addressBooks={this.props.AddressBooks}
                     dispatch={this.props.dispatch}
                     onUpdate={this.updateMarital}
                     onError={this.handleError}
                     onSpouseUpdate={this.updateSpouse}
                     currentAddress={this.props.CurrentAddress}
                     required={true}
                     scrollIntoView={false}
                     />

            <hr className="section-divider"/>
            <Cohabitants name="cohabitants"
                         {...this.props.Cohabitants}
                         section="relationships"
                         subsection="status/cohabitant"
                         defaultState={false}
                         spouse={this.props.Spouse}
                         dispatch={this.props.dispatch}
                         onUpdate={this.updateCohabitants}
                         onError={this.handleError}
                         required={true}
                         scrollIntoView={false}
                         />

            <hr className="section-divider"/>
            <People name="people"
                    {...this.props.People}
                    section="relationships"
                    subsection="people"
                    defaultState={false}
                    addressBooks={this.props.AddressBooks}
                    dispatch={this.props.dispatch}
                    onUpdate={this.updatePeople}
                    onError={this.handleError}
                    required={true}
                    scrollIntoView={false}
                    />

            <hr className="section-divider"/>
            <Relatives name="relatives"
                       {...this.props.Relatives}
                       section="relationships"
                       subsection="relatives"
                       defaultState={false}
                       addressBooks={this.props.AddressBooks}
                       dispatch={this.props.dispatch}
                       onUpdate={this.updateRelatives}
                       onError={this.handleError}
                       required={true}
                       scrollIntoView={false}
                       />

            <hr className="section-divider" />
            <SectionComments name="comments"
                             {...this.props.Comments}
                             title={i18n.t('relationships.review.comments')}
                             dispatch={this.props.dispatch}
                             onUpdate={this.handleUpdate.bind(this, 'Comments')}
                             onError={this.handleError}
                             required={false}
                             scrollIntoView={false}
                             />
          </SectionView>
        </SectionViews>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const app = state.application || {}
  const relationships = app.Relationships || {}
  const errors = app.Errors || {}
  const completed = app.Completed || {}
  const history = app.History || {}
  const addressBooks = app.AddressBooks || {}

  return {
    Relationships: relationships,
    Relatives: relationships.Relatives || {},
    Marital: relationships.Marital || {},
    Spouse: extractSpouse(relationships.Marital),
    Cohabitants: relationships.Cohabitants || {},
    CurrentAddress: history.CurrentAddress,
    People: relationships.People || {},
    Comments: relationships.Comments || {},
    Errors: errors.relationships || [],
    Completed: completed.relationships || [],
    AddressBooks: addressBooks
  }
}

Relationships.defaultProps = {
  section: 'relationships',
  store: 'Relationships',
  scrollToBottom: SectionView.BottomButtonsSelector
}

const extractSpouse = (marital) => {
  if (!marital || !marital.CivilUnion || !marital.CivilUnion.Name) {
    return null
  }
  return marital.CivilUnion.Name
}

export class RelationshipSections extends React.Component {
  render () {
    return (
      <div>
        <Marital name="marital"
                 {...this.props.Marital}
                 defaultState={false}
                 addressBooks={this.props.AddressBooks}
                 dispatch={this.props.dispatch}
                 onError={this.props.onError}
                 currentAddress={this.props.CurrentAddress}
                 required={true}
                 scrollIntoView={false}
                 />

        <hr className="section-divider"/>
        <Cohabitants name="cohabitants"
                     {...this.props.Cohabitants}
                     defaultState={false}
                     spouse={this.props.Spouse}
                     dispatch={this.props.dispatch}
                     onError={this.props.onError}
                     required={true}
                     scrollIntoView={false}
                     />

        <People name="people"
                {...this.props.People}
                defaultState={false}
                addressBooks={this.props.AddressBooks}
                dispatch={this.props.dispatch}
                onError={this.handleError}
                required={true}
                scrollIntoView={false}
                />

        <hr className="section-divider"/>
        <Relatives name="relatives"
                   {...this.props.Relatives}
                   defaultState={false}
                   addressBooks={this.props.AddressBooks}
                   dispatch={this.props.dispatch}
                   onError={this.handleError}
                   required={true}
                   scrollIntoView={false}
                   />

        <hr className="section-divider" />
        <SectionComments name="comments"
                         {...this.props.Comments}
                         title={i18n.t('relationships.review.comments')}
                         dispatch={this.props.dispatch}
                         onError={this.handleError}
                         required={false}
                         scrollIntoView={false}
                         />
      </div>
    )
  }
}

export default connect(mapStateToProps)(AuthenticatedView(Relationships))
