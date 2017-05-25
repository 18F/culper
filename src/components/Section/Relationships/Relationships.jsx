import React from 'react'
import { connect } from 'react-redux'
import { updateApplication } from '../../../actions/ApplicationActions'
import { i18n } from '../../../config'
import { SectionViews, SectionView } from '../SectionView'
import SectionElement from '../SectionElement'
import AuthenticatedView from '../../../views/AuthenticatedView'
import { RelationshipsValidator } from '../../../validators'
import { IntroHeader } from '../../Form'
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

  // componentWillReceiveProps (props) {
  //   if (props.subsection === 'status') {
  //     this.props.dispatch(push(`/form/relationships/status/marital`))
  //   }
  // }

  // /**
  //  * Report errors and completion status
  //  */
  // handleValidation (event, status, errorCodes) {
  //   if (!event) {
  //     return
  //   }

  //   if (!event.fake) {
  //     let errors = super.triageErrors(this.props.Section.section, [...this.props.Errors], errorCodes)
  //     this.props.dispatch(reportErrors(this.props.Section.section, '', errors))
  //   }
  //   const cstatus = new RelationshipsValidator(null, this.props).completionStatus(status)
  //   let completed = {
  //     ...this.props.Completed,
  //     ...status,
  //     status: cstatus
  //   }

  //   this.props.dispatch(reportCompletion(this.props.Section.section, this.props.Section.subsection, completed))
  // }

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
          <SectionView name="">
            <div className="relationships intro review-screen">
              <div className="usa-grid-full">
                <IntroHeader Errors={this.props.Errors}
                             Completed={this.props.Completed}
                             tour={i18n.t('relationships.tour.para')}
                             review={i18n.t('relationships.review.para')}
                             onTour={this.handleTour}
                             onReview={this.handleReview}
                             />
              </div>
            </div>
          </SectionView>
          <SectionView name="status"
                       back="financial/bankruptcy"
                       backLabel={i18n.t('financial.destination.bankruptcy')}
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
          <SectionView name="status/marital"
                       back="history/federal"
                       backLabel={i18n.t('history.destination.federal')}
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
                       title="Let&rsquo;s make sure everything looks right"
                       showTop="true"
                       back="relationships/relatives"
                       backLabel={i18n.t('relationships.destination.relatives')}
                       next="citizenship/status"
                       nextLabel={i18n.t('citizenship.destination.status')}>
            <Marital name="marital"
                     {...this.props.Marital}
                     dispatch={this.props.dispatch}
                     onUpdate={this.updateMarital}
                     onError={this.handleError}
                     onSpouseUpdate={this.updateSpouse}
                     currentAddress={this.props.CurrentAddress}
                     />
            <Cohabitants name="cohabitants"
                         {...this.props.Cohabitants}
                         spouse={this.props.Spouse}
                         dispatch={this.props.dispatch}
                         onUpdate={this.updateCohabitants}
                         onError={this.handleError}
                         />
            <People name="people"
                    {...this.props.People}
                    dispatch={this.props.dispatch}
                    onUpdate={this.updatePeople}
                    onError={this.handleError}
                    />
            <Relatives name="relatives"
                       {...this.props.Relatives}
                       dispatch={this.props.dispatch}
                       onUpdate={this.updateRelatives}
                       onError={this.handleError}
                       />
          </SectionView>
        </SectionViews>
      </div>
    )
  }
}

function mapStateToProps (state) {
  let section = state.section || {}
  let app = state.application || {}
  let relationships = app.Relationships || {}
  let errors = app.Errors || {}
  let completed = app.Completed || {}
  let history = app.History || {}
  return {
    Section: section,
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
  defaultView: 'marital',
  store: 'Relationships'
}

const extractSpouse = (marital) => {
  if (!marital || !marital.CivilUnion || !marital.CivilUnion.Name) {
    return null
  }
  return marital.CivilUnion.Name
}

export default connect(mapStateToProps)(AuthenticatedView(Relationships))
