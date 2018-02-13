import React from 'react'
import { connect } from 'react-redux'
import { i18n, navigation } from '../../../config'
import { SectionViews, SectionView } from '../SectionView'
import SectionElement from '../SectionElement'
import { Show, Svg } from '../../Form'

import { IdentificationSections } from '../Identification'
import { RelationshipSections } from '../Relationships'
import { HistorySections } from '../History'
import { FinancialSections } from '../Financial'
import { CitizenshipSections } from '../Citizenship'
import { MilitarySections } from '../Military'
import { ForeignSections } from '../Foreign'
import { SubstanceUseSections } from '../SubstanceUse'
import { LegalSections } from '../Legal'
import { PsychologicalSections } from '../Psychological'
import AuthenticatedView from '../../../views/AuthenticatedView'

class Print extends SectionElement {
  constructor (props) {
    super(props)
    this.sections = this.sections.bind(this)
    this.handlePrint = this.handlePrint.bind(this)
    this.state = {
      printed: false
    }
  }

  componentWillUnmount () {
    let nav = document.getElementsByClassName('form-navigation')[0]
    nav.removeEventListener('click', this.captureNavigationClick)
    let logout = document.getElementsByClassName('eapp-logout')[0]
    logout.removeEventListener('click', this.captureLogoutClick)
  }

  componentDidMount () {
    let nav = document.getElementsByClassName('form-navigation')[0]
    if (nav && nav.addEventListener) {
      nav.addEventListener('click', this.captureNavigationClick)
    }

    let logout = document.getElementsByClassName('eapp-logout')[0]
    if (logout && logout.addEventListener) {
      logout.addEventListener('click', this.captureLogoutClick)
    }
  }

  captureNavigationClick (e) {
    if (!window.alert(i18n.t('application.alert.navigation'))) {
      e.stopPropagation()
    }
  }

  captureLogoutClick (e) {
    if (!window.confirm(i18n.t('application.alert.logout'))) {
      e.stopPropagation()
    }
  }

  sections () {
    return navigation.map((section, index, arr) => {
      let sectionComponent = null
      switch (section.url) {
        case 'identification':
          sectionComponent = (
            <IdentificationSections
              {...this.props.Identification}
              dispatch={this.props.dispatch}
              onError={this.handleError}
            />
          )
          break
        case 'relationships':
          sectionComponent = (
            <RelationshipSections
              {...this.props.Relationships}
              dispatch={this.props.dispatch}
              onError={this.handleError}
            />
          )
          break
        case 'history':
          sectionComponent = (
            <HistorySections
              {...this.props.History}
              dispatch={this.props.dispatch}
              onError={this.handleError}
            />
          )
          break
        case 'citizenship':
          sectionComponent = (
            <CitizenshipSections
              {...this.props.Citizenship}
              dispatch={this.props.dispatch}
              onError={this.handleError}
            />
          )
          break
        case 'military':
          sectionComponent = (
            <MilitarySections
              {...this.props.Military}
              application={this.props.Application}
              dispatch={this.props.dispatch}
              onError={this.handleError}
            />
          )
          break
        case 'foreign':
          sectionComponent = (
            <ForeignSections
              {...this.props.Foreign}
              dispatch={this.props.dispatch}
              onError={this.handleError}
            />
          )
          break
        case 'financial':
          sectionComponent = (
            <FinancialSections
              {...this.props.Financial}
              dispatch={this.props.dispatch}
              onError={this.handleError}
            />
          )
          break
        case 'substance':
          sectionComponent = (
            <SubstanceUseSections
              {...this.props.SubstanceUse}
              dispatch={this.props.dispatch}
              onError={this.handleError}
            />
          )
          break
        case 'legal':
          sectionComponent = (
            <LegalSections
              {...this.props.Legal}
              dispatch={this.props.dispatch}
              onError={this.handleError}
            />
          )
          break
        case 'psychological':
          sectionComponent = (
            <PsychologicalSections
              {...this.props.Psychological}
              dispatch={this.props.dispatch}
              onError={this.handleError}
            />
          )
          break
        default:
          return null
      }

      return (
        <div className="section-print-container">
          <h3 className="section-print-header">{section.title}</h3>
          { sectionComponent }
        </div>
      )
    })
  }

  handlePrint () {
    let interval = setInterval(() => {
      if (document.hasFocus()) {
        clearInterval(interval)
        this.setState({ printed: true })
      }
    }, 600)
    window.print()
  }

  done () {
    return (
      <div className="text-center done">
        <span className="icon">
          <Svg src="/img/checkmark.svg" />
        </span>
        { i18n.m('application.print.done') }
      </div>
    )
  }

  render () {
    return (
      <div className="pre-print-view">
        <div className="text-center">
          { i18n.m('application.print.title') }
          <button className="print-btn" onClick={this.handlePrint}>
            { i18n.t('application.print.button') }
          </button>
          <Show when={this.state.printed}>
            { this.done() }
          </Show>
        </div>
        <div className="print-view">
          { this.sections() }
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const app = state.application || {}
  const identification = app.Identification || {}
  const relationships = app.Relationships || {}
  const history = app.History || {}
  const historyResidence = history.Residence || {}
  const historyEmployment = history.Employment || { List: {} }
  const historyEducation = history.Education || { HasAttended: '', HasDegree10: '', List: {} }
  const citizenship = app.Citizenship || {}
  const military = app.Military || {}
  const foreign = app.Foreign || {}
  const financial = app.Financial || {}
  const substanceUse = app.SubstanceUse || {}
  const legal = app.Legal || {}
  const psychological = app.Psychological || {}

  let errors = app.Errors || {}
  let completed = app.Completed || {}
  return {
    Application: app || {},
    Identification: identification,
    Relationships: relationships,
    History: {
      ...history,
      Residence: historyResidence,
      Employment: historyEmployment,
      Education: historyEducation
    },
    Citizenship: citizenship,
    Military: military,
    Foreign: foreign,
    Financial: financial,
    SubstanceUse: substanceUse,
    Legal: legal,
    Psychological: psychological,
    Errors: errors.releases || [],
    Completed: completed.releases || []
  }
}

Print.defaultProps = {
  section: 'print',
  subsection: 'intro',
  store: 'Print'
}

export default connect(mapStateToProps)(AuthenticatedView(Print))
