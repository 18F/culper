import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../../config'
import SectionElement from '../SectionElement'
import { SectionViews, SectionView } from '../SectionView'
import AuthenticatedView from '../../../views/AuthenticatedView'
import { hideSelectiveService } from '../../../validators/selectiveservice'
import Status from './Status'
import Multiple from './Multiple'
import Passports from './Multiple/Passports'

class Citizenship extends SectionElement {
  render () {
    const showSelectiveService = !hideSelectiveService(this.props.Application)
    return (
      <div>
        <SectionViews current={this.props.subsection} dispatch={this.props.dispatch}>
          <SectionView name="intro"
                       back="relationships/review"
                       backLabel={i18n.t('relationships.destination.review')}
                       next="citizenship/status"
                       nextLabel={i18n.t('citizenship.destination.status')}>
            <h2>{i18n.t('citizenship.intro.title')}</h2>
            {i18n.m('citizenship.intro.body')}
          </SectionView>

          <SectionView name="review"
                       title={i18n.t('review.title')}
                       para={i18n.m('review.para')}
                       showTop={true}
                       back="citizenship/passports"
                       backLabel={i18n.t('citizenship.destination.passports')}
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

            <hr/>
            <h2>{i18n.t('citizenship.multiple.heading.passport.title')}</h2>
            <Passports name="passports"
                      {...this.props.Passports}
                      dispatch={this.props.dispatch}
                      onUpdate={this.handleUpdate.bind(this, 'Passports')}
                      onError={this.handleError}
                      />
          </SectionView>

          <SectionView name="status"
                       back="citizenship/intro"
                       backLabel={i18n.t('citizenship.destination.intro')}
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
                       next="citizenship/passports"
                       nextLabel={i18n.t('citizenship.destination.passports')}>
            <h2>{i18n.t('citizenship.multiple.heading.title')}</h2>
            <Multiple name="multiple"
                      {...this.props.Multiple}
                      dispatch={this.props.dispatch}
                      onUpdate={this.handleUpdate.bind(this, 'Multiple')}
                      onError={this.handleError}
                      />
          </SectionView>
          <SectionView name="passports"
                       back="citizenship/multiple"
                       backLabel={i18n.t('citizenship.destination.multiple')}
                       next="citizenship/review"
                       nextLabel={i18n.t('citizenship.destination.review')}>
            <h2>{i18n.t('citizenship.multiple.heading.passport.title')}</h2>
            <Passports name="passports"
                      {...this.props.Passports}
                      dispatch={this.props.dispatch}
                      onUpdate={this.handleUpdate.bind(this, 'Passports')}
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
    Passports: citizenship.Passports || {},
    Errors: errors.citizenship || [],
    Completed: completed.citizenship || []
  }
}

Citizenship.defaultProps = {
  section: 'citizenship',
  store: 'Citizenship'
}

export default connect(mapStateToProps)(AuthenticatedView(Citizenship))
