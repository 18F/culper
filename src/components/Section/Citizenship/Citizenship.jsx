import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../../config'
import SectionElement from '../SectionElement'
import { SectionViews, SectionView } from '../SectionView'
import AuthenticatedView from '../../../views/AuthenticatedView'
import { hideSelectiveService } from '../../../validators/selectiveservice'
import { IntroHeader } from '../../Form'
import Status from './Status'
import Multiple from './Multiple'

class Citizenship extends SectionElement {
  render () {
    const showSelectiveService = !hideSelectiveService(this.props.Application)
    return (
      <div>
        <SectionViews current={this.props.subsection} dispatch={this.props.dispatch}>
          <SectionView name="">
            <div className="intro review-screen">
              <div className="usa-grid-full">
                <IntroHeader errors={() => { return this.props.Errors.some(x => x.valid === false) }}
                             completed={() => { return this.props.Completed.length === 2 && this.props.Completed.every(x => x.valid === true) }}
                             onTour={this.handleTour}
                             onReview={this.handleReview}
                             />
              </div>
            </div>
          </SectionView>

          <SectionView name="review"
                       title={i18n.t('review.title')}
                       para={i18n.m('review.para')}
                       showTop="true"
                       back="citizenship/multiple"
                       backLabel={i18n.t('citizenship.destination.multiple')}
                       next="military"
                       nextLabel={showSelectiveService ? i18n.t('military.destination.selective') : i18n.t('military.destination.history')}>
            <h2>{i18n.t('citizenship.status.heading.title')}</h2>
            <Status name="status"
                    {...this.props.Status}
                    defaultState={false}
                    dispatch={this.props.dispatch}
                    onUpdate={this.handleUpdate.bind(this, 'Status')}
                    onError={this.handleError}
                    />

            <hr/>
            <h2>{i18n.t('citizenship.multiple.heading.title')}</h2>
            <Multiple name="multiple"
                      {...this.props.Multiple}
                      defaultState={false}
                      dispatch={this.props.dispatch}
                      onUpdate={this.handleUpdate.bind(this, 'Multiple')}
                      onError={this.handleError}
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
                    dispatch={this.props.dispatch}
                    onUpdate={this.handleUpdate.bind(this, 'Status')}
                    onError={this.handleError}
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
                      dispatch={this.props.dispatch}
                      onUpdate={this.handleUpdate.bind(this, 'Multiple')}
                      onError={this.handleError}
                      />
          </SectionView>
        </SectionViews>
      </div>
    )
  }
}

function mapStateToProps (state) {
  let app = state.application || {}
  let citizenship = app.Citizenship || {}
  let errors = app.Errors || {}
  let completed = app.Completed || {}
  return {
    Application: app,
    Citizenship: citizenship,
    Status: citizenship.Status || {},
    Multiple: citizenship.Multiple || {},
    Errors: errors.citizenship || [],
    Completed: completed.citizenship || []
  }
}

Citizenship.defaultProps = {
  section: 'citizenship',
  defaultView: (props) => { return 'status' },
  store: 'Citizenship'
}

export default connect(mapStateToProps)(AuthenticatedView(Citizenship))
