import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../../config'
import AuthenticatedView from '../../../views/AuthenticatedView'
import { ValidationElement, IntroHeader } from '../../Form'
import { push } from '../../../middleware/history'
import { updateApplication, reportErrors, reportCompletion } from '../../../actions/ApplicationActions'
import { SectionViews, SectionView } from '../SectionView'
import Relatives from './Relatives'
import Marital from './RelationshipStatus/Marital'
import Cohabitants from './RelationshipStatus/Cohabitants'
import People from './People'
import { RelationshipsValidator } from '../../../validators'

class Relationships extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      subsection: props.subsection
    }

    this.handleTour = this.handleTour.bind(this)
    this.handleReview = this.handleReview.bind(this)
    this.onUpdate = this.onUpdate.bind(this)
    this.updateMarital = this.updateMarital.bind(this)
    this.updatePeople = this.updatePeople.bind(this)
    this.updateRelatives = this.updateRelatives.bind(this)
    this.updateMarital = this.updateMarital.bind(this)
    this.updateCohabitants = this.updateCohabitants.bind(this)
    this.updateSpouse = this.updateSpouse.bind(this)
  }

  componentWillReceiveProps (props) {
    if (props.subsection === 'status') {
      this.props.dispatch(push(`/form/relationships/status/marital`))
    }
  }

  componentDidMount () {
    let current = this.launch(this.props.Relationships, this.props.subsection, 'status/marital')
    if (current !== '') {
      this.props.dispatch(push(`/form/relationships/${current}`))
    }
  }

  handleTour (event) {
    this.props.dispatch(push('/form/relationships/status/marital'))
  }

  handleReview (event) {
    this.props.dispatch(push('/form/relationships/review'))
  }

  /**
   * Report errors and completion status
   */
  handleValidation (event, status, errorCodes) {
    if (!event) {
      return
    }

    if (!event.fake) {
      let errors = super.triageErrors(this.props.Section.section, [...this.props.Errors], errorCodes)
      this.props.dispatch(reportErrors(this.props.Section.section, '', errors))
    }
    const cstatus = new RelationshipsValidator(null, this.props).completionStatus(status)
    let completed = {
      ...this.props.Completed,
      ...status,
      status: cstatus
    }

    this.props.dispatch(reportCompletion(this.props.Section.section, this.props.Section.subsection, completed))
  }

  /**
   * Update storage values for a subsection
   */
  onUpdate (field, values) {
    this.props.dispatch(updateApplication('Relationships', field, values))
  }

  updateMarital (values) {
    this.onUpdate('Marital', values)
  }

  updatePeople (values) {
    this.onUpdate('People', values)
  }

  updateRelatives (values) {
    this.onUpdate('Relatives', values)
  }

  updateCohabitants (values) {
    this.onUpdate('Cohabitants', values)
  }

  /**
   * Listens for updates when a spouses name is updated. This is to notify
   * other parts of the app that this information has changed
   */
  updateSpouse (values) {
    this.props.dispatch(updateApplication('Relationships', 'ClearSameSpouseConfirmed', true))
  }

  /**
   * Determine the desired behaviour when visiting the
   * root of a route
   */
  launch (storage, subsection, defaultView) {
    subsection = subsection || ''
    if (subsection === '') {
      let keys = Object.keys(storage)
      if (keys.length === 0 && storage.constructor === Object) {
        return defaultView
      }
    }

    return subsection
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
              onUpdate={this.updateMarital}
              onValidate={this.handleValidation}
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
              onUpdate={this.updateMarital}
              onValidate={this.handleValidation}
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
              onUpdate={this.updateCohabitants}
              onValidate={this.handleValidation}
            />
          </SectionView>
          <SectionView name="people"
            back="relationships/status/cohabitant"
            backLabel={i18n.t('relationships.destination.cohabitant')}
            next="relationships/relatives"
            nextLabel={i18n.t('relationships.destination.relatives')}>
            <People name="people"
              {...this.props.People}
              onUpdate={this.updatePeople}
              onValidate={this.handleValidation}
            />
          </SectionView>
          <SectionView name="relatives"
            back="relationships/people"
            backLabel={i18n.t('relationships.destination.people')}
            next="relationships/review"
            nextLabel={i18n.t('relationships.destination.review')}>
            <Relatives name="relatives"
              {...this.props.Relatives}
              onUpdate={this.updateRelatives}
              onValidate={this.handleValidation}
            />
          </SectionView>
          <SectionView name="review"
            title="Let&rsquo;s make sure everything looks right"
            showTop="true"
            back="relationships/relatives"
            backLabel={i18n.t('relationships.destination.relatives')}
            next="military/selective"
            next={i18n.t('military.destination.selective')}>
            <Marital name="marital"
              {...this.props.Marital}
              onUpdate={this.updateMarital}
              onValidate={this.handleValidation}
              onSpouseUpdate={this.updateSpouse}
              currentAddress={this.props.CurrentAddress}
            />
            <Cohabitants name="cohabitants"
              {...this.props.Cohabitants}
              spouse={this.props.Spouse}
              onUpdate={this.updateCohabitants}
              onValidate={this.handleValidation}
            />
            <People name="people"
              {...this.props.People}
              onUpdate={this.updatePeople}
              onValidate={this.handleValidation}
            />
            <Relatives name="relatives"
              {...this.props.Relatives}
              onUpdate={this.updateRelatives}
              onValidate={this.handleValidation}
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
  subsection: ''
}

const extractSpouse = (marital) => {
  if (!marital || !marital.CivilUnion || !marital.CivilUnion.Name) {
    return null
  }
  return marital.CivilUnion.Name
}

export default connect(mapStateToProps)(AuthenticatedView(Relationships))
