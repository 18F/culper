import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../../config'
import AuthenticatedView from '../../../views/AuthenticatedView'
import { ValidationElement, IntroHeader } from '../../Form'
import { push } from '../../../middleware/history'
import { updateApplication, reportErrors, reportCompletion } from '../../../actions/ApplicationActions'
import { SectionViews, SectionView } from '../SectionView'
import Police from './Police'
import Offenses from './Police/Offenses'
import OtherOffenses from './Police/OtherOffenses'
import DomesticViolenceList from './Police/DomesticViolenceList'

class Legal extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      subsection: props.subsection
    }

    this.handleTour = this.handleTour.bind(this)
    this.handleReview = this.handleReview.bind(this)
    this.onValidate = this.onValidate.bind(this)
    this.onUpdate = this.onUpdate.bind(this)
    this.updatePolice = this.updatePolice.bind(this)
    this.updatePoliceOffenses = this.updatePoliceOffenses.bind(this)
    this.updatePoliceOtherOffenses = this.updatePoliceOtherOffenses.bind(this)
    this.updatePoliceDomesticViolence = this.updatePoliceDomesticViolence.bind(this)
  }

  componentDidMount () {
    let current = this.launch(this.props.Legal, this.props.subsection, 'police')
    if (current !== '') {
      this.props.dispatch(push(`/form/legal/${current}`))
    }
  }

  handleTour (event) {
    this.props.dispatch(push('/form/legal/police'))
  }

  handleReview (event) {
    this.props.dispatch(push('/form/legal/review'))
  }

  /**
   * Report errors and completion status
   */
  onValidate (event, status, errorCodes) {
    if (!event) {
      return
    }

    if (!event.fake) {
      let errors = super.triageErrors(this.props.Section.section, [...this.props.Errors], errorCodes)
      this.props.dispatch(reportErrors(this.props.Section.section, '', errors))
    }

    let cstatus = 'neutral'
    if (this.hasStatus('police', status, true)) {
      cstatus = 'complete'
    } else if (this.hasStatus('police', status, false)) {
      cstatus = 'incomplete'
    }

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
    this.props.dispatch(updateApplication('Legal', field, values))
  }

  updatePolice (values) {
    this.onUpdate('Police', values)
  }

  updatePoliceOffenses (values) {
    this.onUpdate('PoliceOffenses', values)
  }

  updatePoliceOtherOffenses (values) {
    this.onUpdate('PoliceOtherOffenses', values)
  }

  updatePoliceDomesticViolence (values) {
    this.onUpdate('PoliceDomesticViolence', values)
  }

  /**
   * Helper to test whether a subsection is complete
   */
  hasStatus (property, status, val) {
    return (this.props.Completed[property] && this.props.Completed[property].status === val)
      || (status && status[property] && status[property].status === val)
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

  /**
   * Intro to the section when information is present
   */
  intro () {
    return (
      <div className="legal intro review-screen">
        <div className="usa-grid-full">
          <IntroHeader Errors={this.props.Errors}
                       Completed={this.props.Completed}
                       tour={i18n.t('legal.tour.para')}
                       review={i18n.t('legal.review.para')}
                       onTour={this.handleTour}
                       onReview={this.handleReview}
                       />
        </div>
      </div>
    )
  }

  render () {
    return (
      <div>
        <SectionViews current={this.props.subsection} dispatch={this.props.dispatch}>
          <SectionView name="">
            {this.intro()}
          </SectionView>

          <SectionView name="review"
            title="Let&rsquo;s make sure everything looks right"
            showTop="true"
            back="legal/police"
            backLabel={i18n.t('legal.destination.police')}>
            <h2>{i18n.t('legal.police.heading.title')}</h2>
            {i18n.m('legal.police.para.intro1')}
            {i18n.m('legal.police.para.intro2')}
            {i18n.m('legal.police.para.intro3')}
            <Police name="police"
              {...this.props.Police}
              onUpdate={this.updatePolice}
              onValidate={this.onValidate}
            />
          </SectionView>

          <SectionView name="police"
            back="foreign/passport"
            backLabel={i18n.t('foreign.destination.passport')}
            next="legal/review"
            nextLabel={i18n.t('legal.destination.review')}>
            <h2>{i18n.t('legal.police.heading.title')}</h2>
            {i18n.m('legal.police.para.intro1')}
            {i18n.m('legal.police.para.intro2')}
            {i18n.m('legal.police.para.intro3')}
          </SectionView>

          <SectionView name="police/offenses"
            back="foreign/passport"
            backLabel={i18n.t('foreign.destination.passport')}
            next="legal/review"
            nextLabel={i18n.t('legal.destination.review')}>
            <Offenses name="policeOffenses"
              {...this.props.PoliceOffenses}
              onUpdate={this.updatePoliceOffenses}
              onValidate={this.onValidate}
            />
          </SectionView>

          <SectionView name="police/additionaloffenses"
            back="foreign/passport"
            backLabel={i18n.t('foreign.destination.passport')}
            next="legal/review"
            nextLabel={i18n.t('legal.destination.review')}>
            <OtherOffenses name="otherOffenses"
              {...this.props.PoliceOtherOffenses}
              onUpdate={this.updatePoliceOtherOffenses}
              onValidate={this.onValidate}
            />
          </SectionView>

          <SectionView name="police/domesticviolence"
            back="foreign/passport"
            backLabel={i18n.t('foreign.destination.passport')}
            next="legal/review"
            nextLabel={i18n.t('legal.destination.review')}>
            <DomesticViolenceList name="domesticViolence"
              {...this.props.PoliceDomesticViolence}
              onUpdate={this.updatePoliceDomesticViolence}
              onValidate={this.onValidate}
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
  let legal = app.Legal || {}
  let errors = app.Errors || {}
  let completed = app.Completed || {}
  return {
    Section: section,
    Legal: legal,
    Police: legal.Police || {},
    PoliceOffenses: legal.PoliceOffenses || {},
    PoliceOtherOffenses: legal.PoliceOtherOffenses || {},
    PoliceDomesticViolence: legal.PoliceDomesticViolence || {},
    Errors: errors.legal || [],
    Completed: completed.legal || []
  }
}

Legal.defaultProps = {
  subsection: ''
}

export default connect(mapStateToProps)(AuthenticatedView(Legal))
