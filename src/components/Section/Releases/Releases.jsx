import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../../config'
import { SectionViews, SectionView } from '../SectionView'
import SectionElement from '../SectionElement'
import AuthenticatedView from '../../../views/AuthenticatedView'
import { IntroHeader } from '../../Form'
import General from './General'
import Medical from './Medical'
import Credit from './Credit'

class Releases extends SectionElement {
  constructor (props) {
    super(props)

    this.updateGeneral = this.updateGeneral.bind(this)
    this.updateMedical = this.updateMedical.bind(this)
    this.updateCredit = this.updateCredit.bind(this)
  }

  updateGeneral (values) {
    this.handleUpdate('General', values)
  }

  updateMedical (values) {
    this.handleUpdate('Medical', values)
  }

  updateCredit (values) {
    this.handleUpdate('Credit', values)
  }

  render () {
    return (
      <div>
        <SectionViews current={this.props.subsection} dispatch={this.props.dispatch}>
          <SectionView name=""
            back=""
            backLabel=""
            next=""
            nextLabel="">
            <General name="general"
              {...this.props.General}
              identification={this.props.Identification}
              dispatch={this.props.dispatch}
              onUpdate={this.updateGeneral}
              onError={this.handleError}
            />
          </SectionView>

          <SectionView name="medical"
            back=""
            backLabel=""
            next=""
            nextLabel="">
            <Medical name="medical"
              {...this.props.General}
              identification={this.props.Identification}
              dispatch={this.props.dispatch}
              onUpdate={this.updateMedical}
              onError={this.handleError}
            />
          </SectionView>

          <SectionView name="credit"
            back=""
            backLabel=""
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
    General: releases.General || {},
    Credit: releases.Credit || {},
    Identification: app.Identification || {},
    Errors: errors.releases || [],
    Completed: completed.releases || []
  }
}

Releases.defaultProps = {
  section: 'releases',
  defaultView: (props = {}) => {
    return 'general'
  },
  store: 'Releases'
}

export default connect(mapStateToProps)(AuthenticatedView(Releases))
