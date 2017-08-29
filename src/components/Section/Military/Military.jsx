import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../../config'
import { SectionViews, SectionView } from '../SectionView'
import SectionElement from '../SectionElement'
import AuthenticatedView from '../../../views/AuthenticatedView'
import { hideDisciplinaryProcedures } from '../../../validators/militarydisciplinary'
import { hideSelectiveService } from '../../../validators/selectiveservice'
import { Show } from '../../Form'
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

  updateSelective (values) {
    this.handleUpdate('Selective', values)
  }

  updateHistory (values) {
    this.handleUpdate('History', values)
  }

  updateDisciplinary (values) {
    this.handleUpdate('Disciplinary', values)
  }

  updateForeign (values) {
    this.handleUpdate('Foreign', values)
  }

  render () {
    const showDisciplinary = !hideDisciplinaryProcedures(this.props.Application)
    const showSelectiveService = !hideSelectiveService(this.props.Application)
    return (
      <div>
        <SectionViews current={this.props.subsection} dispatch={this.props.dispatch}>
          <SectionView name="intro"
                       back="citizenship/review"
                       backLabel={i18n.t('citizenship.destination.review')}
                       next={showSelectiveService ? 'military/selective' : 'military/history'}
                       nextLabel={showSelectiveService ? i18n.t('military.destination.selective') : i18n.t('military.destination.history')}>
            <h2>{i18n.t('military.intro.title')}</h2>
            {i18n.m('military.intro.body')}
          </SectionView>

          <SectionView name="review"
                       title={i18n.t('review.title')}
                       para={i18n.m('review.para')}
                       showTop={true}
                       back="military/foreign"
                       backLabel={i18n.t('military.destination.foreign')}
                       next="foreign/intro"
                       nextLabel={i18n.t('foreign.destination.intro')}>
            <Show when={showSelectiveService}>
            <h2>{i18n.t('military.selective.heading.born')}</h2>
              <Selective name="selective"
                        {...this.props.Selective}
                        dispatch={this.props.dispatch}
                        onUpdate={this.updateSelective}
                        onError={this.handleError}
                        required={true}
                        scrollIntoView={false}
                        />
              <hr/>
            </Show>

            <h2>{i18n.t('military.history.heading.served')}</h2>
            <History name="history"
                     {...this.props.History}
                     defaultState={false}
                     dispatch={this.props.dispatch}
                     onUpdate={this.updateHistory}
                     onError={this.handleError}
                     required={true}
                     scrollIntoView={false}
                     />

            <Show when={showDisciplinary}>
              <hr/>
              <h2>{i18n.t('military.disciplinary.heading.title')}</h2>
              {i18n.m('military.disciplinary.para.info')}
              <Disciplinary name="disciplinary"
                            {...this.props.Disciplinary}
                            defaultState={false}
                            dispatch={this.props.dispatch}
                            onUpdate={this.updateDisciplinary}
                            onError={this.handleError}
                            required={true}
                            scrollIntoView={false}
                            />
            </Show>

            <hr/>
            <h2>{i18n.t('military.foreign.heading.title')}</h2>
            {i18n.m('military.foreign.para.served')}
            <Foreign name="foreign"
                     {...this.props.Foreign}
                     defaultState={false}
                     dispatch={this.props.dispatch}
                     onUpdate={this.updateForeign}
                     onError={this.handleError}
                     required={true}
                     scrollIntoView={false}
                     />
          </SectionView>

          <SectionView name="selective"
                       back="military/intro"
                       backLabel={i18n.t('military.destination.intro')}
                       next="military/history"
                       nextLabel={i18n.t('military.destination.history')}>
            <h2>{i18n.t('military.selective.heading.born')}</h2>
            <Selective name="selective"
                       {...this.props.Selective}
                       dispatch={this.props.dispatch}
                       onUpdate={this.updateSelective}
                       onError={this.handleError}
                       />
          </SectionView>

          <SectionView name="history"
                       back={showSelectiveService ? 'military/selective' : 'military/intro'}
                       backLabel={showSelectiveService ? i18n.t('military.destination.selective') : i18n.t('military.destination.intro')}
                       next={showDisciplinary ? 'military/disciplinary' : 'military/foreign'}
                       nextLabel={showDisciplinary ? i18n.t('military.destination.disciplinary') : i18n.t('military.destination.foreign')}>
            <h2>{i18n.t('military.history.heading.served')}</h2>
            <History name="history"
                     {...this.props.History}
                     dispatch={this.props.dispatch}
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
                          dispatch={this.props.dispatch}
                          onUpdate={this.updateDisciplinary}
                          onError={this.handleError}
                          />
          </SectionView>

          <SectionView name="foreign"
                       back={showDisciplinary ? 'military/disciplinary' : 'military/history'}
                       backLabel={showDisciplinary ? i18n.t('military.destination.disciplinary') : i18n.t('military.destination.history')}
                       next="military/review"
                       nextLabel={i18n.t('military.destination.review')}>
            <h2>{i18n.t('military.foreign.heading.title')}</h2>
            {i18n.m('military.foreign.para.served')}
            <Foreign name="foreign"
                     {...this.props.Foreign}
                     dispatch={this.props.dispatch}
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
  let app = state.application || {}
  let military = app.Military || {}
  let errors = app.Errors || {}
  let completed = app.Completed || {}
  return {
    Application: app || {},
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
  section: 'military',
  store: 'Military'
}

export default connect(mapStateToProps)(AuthenticatedView(Military))
