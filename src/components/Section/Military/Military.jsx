import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../../config'
import { SectionViews, SectionView } from '../SectionView'
import SectionElement from '../SectionElement'
import AuthenticatedView from '../../../views/AuthenticatedView'
import { IntroHeader } from '../../Form'
import Selective from './Selective'
import History from './History'
import Disciplinary from './Disciplinary'
import Foreign from './Foreign'

class Military extends SectionElement {
  constructor (props) {
    super(props)

    this.updateSelective = this.updateSelective.bind(this)
    this.updateHistory = this.updateHistory.bind(this)
    this.updateDisciplinary = this.updateDisciplinary.bind(this)
    this.updateForeign = this.updateForeign.bind(this)
  }

  // /**
  //  * Report errors and completion status
  //  */
  // onValidate (event, status, errorCodes) {
  //   if (!event) {
  //     return
  //   }

  //   if (!event.fake) {
  //     let errors = super.triageErrors(this.props.Section.section, [...this.props.Errors], errorCodes)
  //     this.props.dispatch(reportErrors(this.props.Section.section, '', errors))
  //   }

  //   let cstatus = 'neutral'
  //   if (this.hasStatus('selective', status, true)
  //       && this.hasStatus('history', status, true)
  //       && this.hasStatus('disciplinary', status, true)
  //       && this.hasStatus('foreign', status, true)) {
  //     cstatus = 'complete'
  //   } else if (this.hasStatus('selective', status, false)
  //              || this.hasStatus('history', status, false)
  //              || this.hasStatus('disciplinary', status, false)
  //              || this.hasStatus('foreign', status, false)) {
  //     cstatus = 'incomplete'
  //   }

  //   let completed = {
  //     ...this.props.Completed,
  //     ...status,
  //     status: cstatus
  //   }

  //   this.props.dispatch(reportCompletion(this.props.Section.section, this.props.Section.subsection, completed))
  // }

  updateSelective (values) {
    this.onUpdate('Selective', values)
  }

  updateHistory (values) {
    this.onUpdate('History', values)
  }

  updateDisciplinary (values) {
    this.onUpdate('Disciplinary', values)
  }

  updateForeign (values) {
    this.onUpdate('Foreign', values)
  }

  // /**
  //  * Helper to test whether a subsection is complete
  //  */
  // hasStatus (property, status, val) {
  //   return (this.props.Completed[property] && this.props.Completed[property].status === val)
  //     || (status && status[property] && status[property].status === val)
  // }

  render () {
    return (
      <div>
        <SectionViews current={this.props.subsection} dispatch={this.props.dispatch}>
          <SectionView name="">
            <div className="military intro review-screen">
              <div className="usa-grid-full">
                <IntroHeader Errors={this.props.Errors}
                             Completed={this.props.Completed}
                             tour={i18n.t('military.tour.para')}
                             review={i18n.t('military.review.para')}
                             onTour={this.handleTour}
                             onReview={this.handleReview}
                             />
              </div>
            </div>
          </SectionView>

          <SectionView name="review"
                       title="Let&rsquo;s make sure everything looks right"
                       showTop="true"
                       back="military/foreign"
                       backLabel={i18n.t('military.destination.foreign')}
                       next="history"
                       nextLabel={i18n.t('history.destination.residence')}>
            <h2>{i18n.t('military.selective.heading.born')}</h2>
            <Selective name="selective"
                       {...this.props.Selective}
                       onUpdate={this.updateSelective}
                       onError={this.handleError}
                       />
            <h2>{i18n.t('military.history.heading.served')}</h2>
            <History name="history"
                     {...this.props.History}
                     onUpdate={this.updateHistory}
                     onError={this.handleError}
                     />
            <h2>{i18n.t('military.disciplinary.heading.title')}</h2>
            {i18n.m('military.disciplinary.para.info')}
            <Disciplinary name="disciplinary"
                          {...this.props.Disciplinary}
                          onUpdate={this.updateDisciplinary}
                          onError={this.handleError}
                          />
            <h2>{i18n.t('military.foreign.heading.title')}</h2>
            {i18n.m('military.foreign.para.served')}
            <Foreign name="foreign"
                     {...this.props.Foreign}
                     onUpdate={this.updateForeign}
                     onError={this.handleError}
                     />
          </SectionView>

          <SectionView name="selective"
                       back="financial/bankruptcy"
                       backLabel={i18n.t('financial.destination.bankruptcy')}
                       next="military/history"
                       nextLabel={i18n.t('military.destination.history')}>
            <h2>{i18n.t('military.selective.heading.born')}</h2>
            <Selective name="selective"
                       {...this.props.Selective}
                       onUpdate={this.updateSelective}
                       onError={this.handleError}
                       />
          </SectionView>

          <SectionView name="history"
                       back="military/selective"
                       backLabel={i18n.t('military.destination.selective')}
                       next="military/disciplinary"
                       nextLabel={i18n.t('military.destination.disciplinary')}>
            <h2>{i18n.t('military.history.heading.served')}</h2>
            <History name="history"
                     {...this.props.History}
                     onUpdate={this.updateHistory}
                     onError={this.handleError}
                     />
          </SectionView>

          <SectionView name="disciplinary"
                       back="military/history"
                       backLabel={i18n.t('military.destination.history')}
                       next="military/foreign"
                       nextLabel={i18n.t('military.destination.foreign')}>
            <h2>{i18n.t('military.disciplinary.heading.title')}</h2>
            {i18n.m('military.disciplinary.para.info')}
            <Disciplinary name="disciplinary"
                          {...this.props.Disciplinary}
                          onUpdate={this.updateDisciplinary}
                          onError={this.handleError}
                          />
          </SectionView>

          <SectionView name="foreign"
                       back="military/disciplinary"
                       backLabel={i18n.t('military.destination.disciplinary')}
                       next="military/review"
                       nextLabel={i18n.t('military.destination.review')}>
            <h2>{i18n.t('military.foreign.heading.title')}</h2>
            {i18n.m('military.foreign.para.served')}
            <Foreign name="foreign"
                     {...this.props.Foreign}
                     onUpdate={this.updateForeign}
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
  let military = app.Military || {}
  let errors = app.Errors || {}
  let completed = app.Completed || {}
  return {
    Section: section,
    Military: military,
    Selective: military.Selective || {},
    History: military.History || {},
    Disciplinary: military.Disciplinary || {},
    Foreign: military.Foreign || {},
    Errors: errors.military || [],
    Completed: completed.military || []
  }
}

Military.defaultProps = {
  section: '',
  subsection: '',
  defaultView: 'selective',
  store: 'Military'
}

export default connect(mapStateToProps)(AuthenticatedView(Military))
