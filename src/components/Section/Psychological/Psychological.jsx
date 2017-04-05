import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../../config'
import AuthenticatedView from '../../../views/AuthenticatedView'
import { ValidationElement, IntroHeader } from '../../Form'
import { push } from '../../../middleware/history'
import { updateApplication, reportErrors, reportCompletion } from '../../../actions/ApplicationActions'
import { SectionViews, SectionView } from '../SectionView'
import Competence from './Competence/Competence'
import Consultation from './Consultation/Consultation'

class Psychological extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      subsection: props.subsection
    }

    this.onUpdate = this.onUpdate.bind(this)
    this.handleTour = this.handleTour.bind(this)
    this.handleReview = this.handleReview.bind(this)
    this.updateCompetence = this.updateCompetence.bind(this)
  }

  componentDidMount () {
    let current = this.launch(this.props.Psychological, this.props.subsection, 'intro')
    if (current !== '') {
      this.props.dispatch(push(`/form/psychological/${current}`))
    }
  }

  handleTour (event) {
    this.props.dispatch(push('/form/psychological/intro'))
  }

  handleReview (event) {
    this.props.dispatch(push('/form/psychological/review'))
  }

  onUpdate (field, values) {
    this.props.dispatch(updateApplication('Psychological', field, values))
  }

  updateCompetence (values) {
    this.onUpdate('Competence', values)
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
            <div className="legal intro review-screen">
              <div className="usa-grid-full">
                <IntroHeader Errors={this.props.Errors}
                  Completed={this.props.Completed}
                  tour={i18n.t('psychological.tour.para')}
                  review={i18n.t('psychological.review.para')}
                  onTour={this.handleTour}
                  onReview={this.handleReview}
                />
              </div>
            </div>
          </SectionView>

          <SectionView name="intro"
            back=""
            next="psychological/competence"
            nextLabel={ i18n.m('psychological.destination.consultation') }>
            <h2>{ i18n.t('psychological.heading.intro') }</h2>
            { i18n.m('psychological.intro.para1') }
            { i18n.m('psychological.intro.para1') }
            { i18n.m('psychological.intro.para2') }
            { i18n.m('psychological.intro.para3') }
            { i18n.m('psychological.intro.para4') }
          </SectionView>

          <SectionView name="competence"
            back="psychological/intro"
            backLabel={ i18n.t('psychological.destination.intro') }
            next="psychological/consultations"
            nextLabel={ i18n.t('psychological.destination.consultation') }>
            <Competence name="Competence"
              {...this.props.Competence}
              onUpdate={this.onUpdate.bind(this, 'Competence')} />
          </SectionView>

          <SectionView name="consultations"
            back="psychological/competence"
            backLabel={ i18n.t('psychological.destination.competence') }
            next=""
            nextLabel={ i18n.t('psychological.destination.tbd') }>
            <Consultation name="Consultations"
              {...this.props.Consultations}
              onUpdate={this.onUpdate.bind(this, 'Consultation')} />
          </SectionView>
        </SectionViews>
      </div>
    )
  }
}

function mapStateToProps (state) {
  let section = state.section || {}
  let app = state.application || {}
  let psychological = app.Psychological || {}
  let errors = app.Errors || {}
  let completed = app.Completed || {}
  return {
    Section: section,
    Psychological: psychological,
    Competence: psychological.Competence,
    Consultations: psychological.Consultation,
    Errors: errors.financial || [],
    Completed: completed.financial || []
  }
}

Psychological.defaultProps = {
  subsection: ''
}

export default connect(mapStateToProps)(AuthenticatedView(Psychological))
