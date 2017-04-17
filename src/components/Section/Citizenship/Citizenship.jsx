import React from 'react'
import { connect } from 'react-redux'
import { push } from '../../../middleware/history'
import { i18n } from '../../../config'
import AuthenticatedView from '../../../views/AuthenticatedView'
import { updateApplication, reportErrors, reportCompletion } from '../../../actions/ApplicationActions'
import { ValidationElement, IntroHeader } from '../../Form'
import { SectionViews, SectionView } from '../SectionView'
import Status from './Status'
import Multiple from './Multiple'

class Citizenship extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      subsection: props.subsection
    }

    this.handleTour = this.handleTour.bind(this)
    this.handleReview = this.handleReview.bind(this)
  }

  componentDidMount () {
    let current = this.launch(this.props.Citizenship, this.props.subsection, 'status')
    if (current !== '') {
      this.props.dispatch(push(`/form/citizenship/${current}`))
    }
  }

  handleTour (event) {
    this.props.dispatch(push('/form/citizenship/status'))
  }

  handleReview (event) {
    this.props.dispatch(push('/form/citizenship/review'))
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
    if (this.hasStatus('status', status, true) &&
        this.hasStatus('multiple', status, true)) {
      cstatus = 'complete'
    } else if (this.hasStatus('status', status, false) ||
               this.hasStatus('multiple', status, false)) {
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
    this.props.dispatch(updateApplication('Citizenship', field, values))
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

  render () {
    return (
      <div>
        <SectionViews current={this.props.subsection} dispatch={this.props.dispatch}>
          <SectionView name="">
            <div className="intro review-screen">
              <div className="usa-grid-full">
                <IntroHeader Errors={this.props.Errors}
                            Completed={this.props.Completed}
                            tour={i18n.t('citizenship.tour.para')}
                            review={i18n.t('citizenship.review.para')}
                            onTour={this.handleTour}
                            onReview={this.handleReview}
                            />
              </div>
            </div>
          </SectionView>

          <SectionView name="review"
                       title="Let&rsquo;s make sure everything looks right"
                       showTop="true"
                       back="citizenship/multiple"
                       backLabel={i18n.t('citizenship.destination.multiple')}
                       next="military"
                       nextLabel={i18n.t('military.destination.selective')}>
            <h2>{i18n.t('citizenship.status.heading.title')}</h2>
            <Status name="status"
                    {...this.props.Status}
                    onUpdate={this.onUpdate.bind(this, 'Status')}
                    onValidate={this.onValidate.bind(this)}
                    />
            <h2>{i18n.t('citizenship.multiple.heading.title')}</h2>
            <Multiple name="multiple"
                      {...this.props.Multiple}
                      onUpdate={this.onUpdate.bind(this, 'Multiple')}
                      onValidate={this.onValidate.bind(this)}
                      />
          </SectionView>

          <SectionView name="status"
                       back="relationships/relatives"
                       backLabel={i18n.t('relationships.destination.relatives')}
                       next="citizenship/multiple"
                       nextLabel={i18n.t('citizenship.destination.multiple')}>
            <h2>{i18n.t('citizenship.status.heading.title')}</h2>
            <Status name="status"
                    {...this.props.Status}
                    onUpdate={this.onUpdate.bind(this, 'Status')}
                    onValidate={this.onValidate.bind(this)}
                    />
          </SectionView>

          <SectionView name="multiple"
                       back="citizenship/status"
                       backLabel={i18n.t('citizenship.destination.status')}
                       next="citizenship/review"
                       nextLabel={i18n.t('citizenship.destination.review')}>
            <h2>{i18n.t('citizenship.multiple.heading.title')}</h2>
            <Multiple name="multiple"
                      {...this.props.Multiple}
                      onUpdate={this.onUpdate.bind(this, 'Multiple')}
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
  let citizenship = app.Citizenship || {}
  let errors = app.Errors || {}
  let completed = app.Completed || {}
  return {
    Section: section,
    Citizenship: citizenship,
    Status: citizenship.Status || {},
    Multiple: citizenship.Multiple || {},
    Errors: errors.citizenship || [],
    Completed: completed.citizenship || []
  }
}

Citizenship.defaultProps = {
  subsection: ''
}

export default connect(mapStateToProps)(AuthenticatedView(Citizenship))
