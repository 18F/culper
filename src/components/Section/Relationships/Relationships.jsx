import React from 'react'
import { connect } from 'react-redux'
import { updateApplication } from '../../../actions/ApplicationActions'
import { i18n } from '../../../config'
import { SectionViews, SectionView } from '../SectionView'
import SectionElement from '../SectionElement'
import AuthenticatedView from '../../../views/AuthenticatedView'
import { RelationshipsValidator } from '../../../validators'
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
        <SectionViews current={this.props.subsection} dispatch={this.props.dispatch}>
          <SectionView name="intro"
                       back="history/review"
                       backLabel={i18n.t('history.destination.review')}
                       next="relationships/status/marital"
                       nextLabel={i18n.t('relationships.destination.marital')}>
            <h2>{i18n.t('relationships.intro.title')}</h2>
            {i18n.m('relationships.intro.body')}
          </SectionView>

          <SectionView name="status/marital"
                       back="relationships/intro"
                       backLabel={i18n.t('relationships.destination.intro')}
                       next="relationships/status/cohabitant"
                       nextLabel={i18n.t('relationships.destination.cohabitant')}>
            <Marital name="marital"
                     {...this.props.Marital}
                     dispatch={this.props.dispatch}
                     onUpdate={this.updateMarital}
                     onError={this.handleError}
                     onSpouseUpdate={this.updateSpouse}
                     currentAddress={this.props.CurrentAddress}
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
                         />
          </SectionView>

          <SectionView name="people"
                       back="relationships/status/cohabitant"
                       backLabel={i18n.t('relationships.destination.cohabitant')}
                       next="relationships/relatives"
                       nextLabel={i18n.t('relationships.destination.relatives')}>
            <People name="people"
                    {...this.props.People}
                    dispatch={this.props.dispatch}
                    onUpdate={this.updatePeople}
                    onError={this.handleError}
                    />
          </SectionView>

          <SectionView name="relatives"
                       back="relationships/people"
                       backLabel={i18n.t('relationships.destination.people')}
                       next="relationships/review"
                       nextLabel={i18n.t('relationships.destination.review')}>
            <Relatives name="relatives"
                       {...this.props.Relatives}
                       dispatch={this.props.dispatch}
                       onUpdate={this.updateRelatives}
                       onError={this.handleError}
                       />
          </SectionView>

          <SectionView name="review"
                       title={i18n.t('review.title')}
                       para={i18n.m('review.para')}
                       showTop={true}
                       back="relationships/relatives"
                       backLabel={i18n.t('relationships.destination.relatives')}
                       next="citizenship/status"
                       nextLabel={i18n.t('citizenship.destination.status')}>
            <Marital name="marital"
                     {...this.props.Marital}
                     defaultState={false}
                     dispatch={this.props.dispatch}
                     onUpdate={this.updateMarital}
                     onError={this.handleError}
                     onSpouseUpdate={this.updateSpouse}
                     currentAddress={this.props.CurrentAddress}
                     required={true}
                     scrollIntoView={false}
                     />

            <hr/>
            <Cohabitants name="cohabitants"
                         {...this.props.Cohabitants}
                         defaultState={false}
                         spouse={this.props.Spouse}
                         dispatch={this.props.dispatch}
                         onUpdate={this.updateCohabitants}
                         onError={this.handleError}
                         required={true}
                         scrollIntoView={false}
                         />

            <hr/>
            <People name="people"
                    {...this.props.People}
                    defaultState={false}
                    dispatch={this.props.dispatch}
                    onUpdate={this.updatePeople}
                    onError={this.handleError}
                    required={true}
                    scrollIntoView={false}
                    />

            <hr/>
            <Relatives name="relatives"
                       {...this.props.Relatives}
                       defaultState={false}
                       dispatch={this.props.dispatch}
                       onUpdate={this.updateRelatives}
                       onError={this.handleError}
                       required={true}
                       scrollIntoView={false}
                       />
          </SectionView>
        </SectionViews>
      </div>
    )
  }
}

function mapStateToProps (state) {
  let app = state.application || {}
  let relationships = app.Relationships || {}
  let errors = app.Errors || {}
  let completed = app.Completed || {}
  let history = app.History || {}
  return {
    Relationships: relationships,
    Relatives: relationships.Relatives || {},
    Marital: relationships.Marital || {},
    Spouse: extractSpouse(relationships.Marital),
    Cohabitants: relationships.Cohabitants || {},
    CurrentAddress: history.CurrentAddress,
    People: relationships.People || {},
    Errors: errors.relationships || [],
    Completed: completed.relationships || []
  }
}

Relationships.defaultProps = {
  section: 'relationships',
  store: 'Relationships'
}

const extractSpouse = (marital) => {
  if (!marital || !marital.CivilUnion || !marital.CivilUnion.Name) {
    return null
  }
  return marital.CivilUnion.Name
}

export default connect(mapStateToProps)(AuthenticatedView(Relationships))
