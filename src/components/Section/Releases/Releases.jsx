import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../../config'
import { SectionViews, SectionView } from '../SectionView'
import SectionElement from '../SectionElement'
import AuthenticatedView from '../../../views/AuthenticatedView'
import AdditionalComments from './AdditionalComments'
import ReleaseOfGeneralAndMedical from './ReleaseOfGeneralAndMedical'
import Credit from './Credit'

class Releases extends SectionElement {
  constructor (props) {
    super(props)

    this.updateAdditionalComments = this.updateAdditionalComments.bind(this)
    this.updateReleaseOfGeneralAndMedical = this.updateReleaseOfGeneralAndMedical.bind(this)
    this.updateMedical = this.updateMedical.bind(this)
    this.updateCredit = this.updateCredit.bind(this)
  }

  updateAdditionalComments (values) {
    this.handleUpdate('AdditionalComments', values)
  }

  updateMedical (values) {
    this.handleUpdate('Medical', values)
  }

  updateCredit (values) {
    this.handleUpdate('Credit', values)
  }

  updateReleaseOfGeneralAndMedical (values) {
    this.handleUpdate('General', values.General)
    this.handleUpdate('Medical', values.Medical)
  }

  render () {
    return (
      <div>
        <SectionViews current={this.props.subsection} dispatch={this.props.dispatch}>
          <SectionView name="comments"
                       back=""
                       backLabel=""
                       next="releases/general"
                       nextLabel={ i18n.t('releases.destination.generalMedical') }>
            <AdditionalComments name="additionalcomments"
                                {...this.props.AdditionalComments}
                                dispatch={this.props.dispatch}
                                onUpdate={this.updateAdditionalComments}
                                onError={this.handleError}
                                />
          </SectionView>

          <SectionView name="general"
                       back="releases/comments"
                       backLabel={ i18n.t('releases.destination.comments') }
                       next="releases/credit"
                       nextLabel={ i18n.t('releases.destination.credit') }>
            <ReleaseOfGeneralAndMedical name="general"
                                        General={this.props.General}
                                        Medical={this.props.Medical}
                                        Application={this.props.Application}
                                        Identification={this.props.Identification}
                                        History={this.props.History}
                                        dispatch={this.props.dispatch}
                                        onUpdate={this.updateReleaseOfGeneralAndMedical}
                                        onError={this.handleError}
                                        />
          </SectionView>

          <SectionView name="credit"
                       back="releases/general"
                       backLabel={ i18n.t('releases.destination.generalMedical') }
                       next=""
                       nextLabel="">
            <Credit name="credit"
                    {...this.props.Credit}
                    dispatch={this.props.dispatch}
                    onUpdate={this.updateCredit}
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
  let releases = app.Releases || {}
  let errors = app.Errors || {}
  let completed = app.Completed || {}
  return {
    Application: app || {},
    Releases: releases,
    General: releases.General || {},
    Medical: releases.Medical || {},
    Credit: releases.Credit || {},
    AdditionalComments: releases.AdditionalComments || {},
    Identification: app.Identification || {},
    History: app.History || {},
    Errors: errors.releases || [],
    Completed: completed.releases || []
  }
}

Releases.defaultProps = {
  section: 'releases',
  defaultView: (props) => { return 'additionalcomments' },
  store: 'Releases'
}

export default connect(mapStateToProps)(AuthenticatedView(Releases))
