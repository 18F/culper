import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../../config'
import AuthenticatedView from '../../../views/AuthenticatedView'
import ValidationElement from '../../Form/ValidationElement'
import IntroHeader from '../../Form/IntroHeader'
import { push } from '../../../middleware/history'
import { updateApplication, reportErrors, reportCompletion } from '../../../actions/ApplicationActions'
import { SectionViews, SectionView } from '../SectionView'
import Gambling from './Gambling'
import Bankruptcy from './Bankruptcy'

class Financial extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      subsection: props.subsection
    }

    this.handleTour = this.handleTour.bind(this)
    this.handleReview = this.handleReview.bind(this)
  }

  componentDidMount () {
    let current = this.launch(this.props.Financial, this.props.subsection, 'gambling')
    if (current !== '') {
      this.props.dispatch(push(`/form/financial/${current}`))
    }
  }

  handleTour (event) {
    this.props.dispatch(push('/form/financial/gambling'))
  }

  handleReview (event) {
    this.props.dispatch(push('/form/financial/review'))
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
    if (this.hasStatus('gambling', status, true)
        && this.hasStatus('bankruptcy', status, true)) {
      cstatus = 'complete'
    } else if (this.hasStatus('gambling', status, false)
               || this.hasStatus('bankruptcy', status, false)) {
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
    this.props.dispatch(updateApplication('Financial', field, values))
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
      <div className="financial intro review-screen">
        <div className="usa-grid-full">
          <IntroHeader Errors={this.props.Errors} Completed={this.props.Completed} />
        </div>
        <div className="review-column">
          <h3>{i18n.t('financial.tour.title')}</h3>
          <p>{i18n.t('financial.tour.para')}</p>
          <button onClick={this.handleTour}>{i18n.t('financial.tour.button')}</button>
        </div>
        <div className="review-column">
          <h3>{i18n.t('financial.review.title')}</h3>
          <p>{i18n.t('financial.review.para')}</p>
          <button onClick={this.handleReview}>{i18n.t('financial.review.button')}</button>
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
                       back="financial/bankruptcy"
                       backLabel={i18n.t('financial.destination.bankruptcy')}
                       next="military"
                       nextLabel={i18n.t('military.destination.selective')}>
            <h2>{i18n.t('financial.gambling.title')}</h2>
            <Gambling name="gambling"
                      {...this.props.Gambling}
                      onUpdate={this.onUpdate.bind(this, 'Gambling')}
                      onValidate={this.onValidate.bind(this)}
                      />

            <h2>{i18n.t('financial.bankruptcy.title')}</h2>
            <Bankruptcy name="bankruptcy"
                        {...this.props.Bankruptcy}
                        onUpdate={this.onUpdate.bind(this, 'Bankruptcy')}
                        onValidate={this.onValidate.bind(this)}
                        />
          </SectionView>

          <SectionView name="gambling"
                       back="identification"
                       backLabel={i18n.t('identification.destination.physical')}
                       next="financial/bankruptcy"
                       nextLabel={i18n.t('financial.destination.bankruptcy')}>
            <h2>{i18n.t('financial.gambling.title')}</h2>
            <Gambling name="gambling"
                      {...this.props.Gambling}
                      onUpdate={this.onUpdate.bind(this, 'Gambling')}
                      onValidate={this.onValidate.bind(this)}
                      />
          </SectionView>

          <SectionView name="bankruptcy"
                       back="financial/gambling"
                       backLabel={i18n.t('financial.destination.gambling')}
                       next="financial/review"
                       nextLabel={i18n.t('financial.destination.review')}>
            <h2>{i18n.t('financial.bankruptcy.title')}</h2>
            <Bankruptcy name="bankruptcy"
                        {...this.props.Bankruptcy}
                        onUpdate={this.onUpdate.bind(this, 'Bankruptcy')}
                        onValidate={this.onValidate.bind(this)}
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
  let financial = app.Financial || {}
  let errors = app.Errors || {}
  let completed = app.Completed || {}
  return {
    Section: section,
    Financial: financial,
    Gambling: financial.Gambling || {},
    Bankruptcy: financial.Bankruptcy || {},
    Errors: errors.financial || [],
    Completed: completed.financial || []
  }
}

Financial.defaultProps = {
  subsection: ''
}

export default connect(mapStateToProps)(AuthenticatedView(Financial))
