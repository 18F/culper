import React from 'react'
import { connect } from 'react-redux'
import { updateApplication } from '../../actions/ApplicationActions'
import { i18n } from '../../config'
import { api } from '../../services'
import AuthenticatedView from '../../views/AuthenticatedView'
import { Show } from '../Form'

class SavedIndicator extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      interval: props.interval || 1000,
      elapsed: props.elapsed || 0,
      hover: false,
      animate: false
    }

    this.save = this.save.bind(this)
    this.tick = this.tick.bind(this)
    this.reset = this.reset.bind(this)
    this.mouseEnter = this.mouseEnter.bind(this)
    this.mouseLeave = this.mouseLeave.bind(this)
  }

  componentWillReceiveProps (next) {
    this.setState({elapsed: 0})
  }

  componentDidMount () {
    this.timer = window.setInterval(this.tick, this.state.interval)
  }

  componentWillUnmount () {
    window.clearInterval(this.timer)
  }

  save () {
    const application = this.props.app
    const section = this.props.section.section
    const subsection = this.props.section.subsection
    const pending = bits(section, subsection, application)

    if (pending) {
      this.setState({elapsed: 0, animate: true}, () => {
        api
          .save(pending)
          .then(r => {
            this.reset()
            this.setState({animate: false})
          })
          .catch(() => {
            console.warn(`Failed to save data for the ${section} section and ${subsection} subsection`)
            this.setState({animate: false})
          })
      })
    }
  }

  reset (event) {
    this.props.dispatch(updateApplication('Settings', 'saved', new Date()))
  }

  mouseEnter (event) {
    this.setState({hover: true})
  }

  mouseLeave (event) {
    this.setState({hover: false})
  }

  tick () {
    const currentTick = new Date().getTime()
    let s = currentTick
    if (this.props && this.props.saved) {
      s = this.props.saved.getTime()
    }

    this.setState({elapsed: currentTick - s})
  }

  calculateTime () {
    // If there has been no time elapsed...
    if (!this.state.elapsed) {
      return i18n.t('saved.now')
    }

    // Get the time in seconds
    let timespan = this.state.elapsed / 1000

    // Determine the unit of measurement and then adjust the timespan
    // rounding the value
    let unit = ''
    if (timespan / (24 * 60 * 60) >= 1) {
      timespan /= 24 * 60 * 60
      timespan = Math.round(timespan)
      unit = timespan > 1 ? i18n.t('saved.days') : i18n.t('saved.day')
    } else if (timespan / (60 * 60) >= 1) {
      timespan /= 60 * 60
      timespan = Math.round(timespan)
      unit = timespan > 1 ? i18n.t('saved.hours') : i18n.t('saved.hour')
    } else if (timespan / 60 >= 1) {
      timespan /= 60
      timespan = Math.round(timespan)
      unit = timespan > 1 ? i18n.t('saved.minutes') : i18n.t('saved.minute')
    } else {
      timespan = Math.round(timespan)
      if (timespan < 1) {
        return i18n.t('saved.now')
      }
      unit = timespan === 1 ? i18n.t('saved.second') : i18n.t('saved.seconds')
    }

    return `${timespan} ${unit} ${i18n.t('saved.ago')}`
  }

  render () {
    const klass = `saved-indicator ${this.state.animate ? 'active' : ''}`.trim()
    const klassCircle = `spinner-icon ${this.state.animate ? 'spin' : ''}`.trim()
    const klassIcon = `fa fa-floppy-o ${this.state.animate ? 'invert' : ''}`.trim()
    return (
    <button className={klass}
            onClick={this.save}
            onMouseEnter={this.mouseEnter}
            onMouseLeave={this.mouseLeave}>

      <div className="spinner">
        <div className={klassCircle}></div>
        <i className={klassIcon} aria-hidden="true"></i>
      </div>

      <span className="spinner-label">
        <Show when={this.state.animate}>
          <strong className="one-line">{i18n.t('saved.saving')}</strong>
        </Show>
        <Show when={!this.state.animate && this.state.hover}>
          <strong className="one-line">{i18n.t('saved.action')}</strong>
        </Show>
        <Show when={!this.state.animate && !this.state.hover}>
          <strong>{i18n.t('saved.saved')}</strong>
          <span className="time">{this.calculateTime()}</span>
        </Show>
      </span>
    </button>
    )
  }
}

const bits = (section, subsection, application = {}) => {
  if (!section || !subsection || !application) {
    return null
  }

  switch (`${section}/${subsection}`) {
    case 'identification/name':
      return application.Identification.ApplicantName
    case 'identification/contacts':
      return application.Identification.Contacts
    case 'identification/othernames':
      return application.Identification.OtherNames
    case 'identification/birthdate':
      return application.Identification.ApplicantBirthDate
    case 'identification/birthplace':
      return application.Identification.ApplicantBirthPlace
    case 'identification/ssn':
      return application.Identification.ApplicantSSN
    case 'identification/physical':
      return application.Identification.Physical
    case 'financial/bankruptcy':
      return application.Financial.Bankruptcy
    case 'financial/gambling':
      return application.Financial.Gambling
    case 'financial/taxes':
      return application.Financial.Taxes
    case 'financial/card':
      return application.Financial.Card
    case 'financial/credit':
      return application.Financial.Credit
    case 'financial/delinquent':
      return application.Financial.Delinquent
    case 'financial/nonpayment':
      return application.Financial.Nonpayment
    case 'history/residence':
      return application.History.Residence
    case 'history/employment':
      return application.History.Employment
    case 'history/education':
      return application.History.Education
    case 'history/federal':
      return application.History.Federal
    case 'relationships/status/marital':
      return application.Relationships.Marital
    case 'relationships/status/cohabitant':
      return application.Relationships.Cohabitants
    case 'relationships/people':
      return application.Relationships.People
    case 'relationships/relatives':
      return application.Relationships.Relatives
    case 'citizenships/status':
      return application.Citizenships.Status
    case 'citizenships/multiple':
      return application.Citizenships.Multiple
    case 'citizenships/passports':
      return application.Citizenships.Passports
    case 'military/selective':
      return application.Military.Selective
    case 'military/history':
      return application.Military.History
    case 'military/disciplinary':
      return application.Military.Disciplinary
    case 'military/foreign':
      return application.Military.Foreign
    case 'foreign/passport':
      return application.Foreign.Passport
    case 'foreign/contacts':
      return application.Foreign.Contacts
    case 'foreign/activities/direct':
      return application.Foreign.DirectActivity
    case 'foreign/activities/indirect':
      return application.Foreign.IndirectActivity
    case 'foreign/activities/realestate':
      return application.Foreign.RealEstateActivity
    case 'foreign/activities/benefits':
      return application.Foreign.BenefitActivity
    case 'foreign/activities/support':
      return application.Foreign.Support
    case 'foreign/business/advice':
      return application.Foreign.Advice
    case 'foreign/business/family':
      return application.Foreign.Family
    case 'foreign/business/employment':
      return application.Foreign.Employment
    case 'foreign/business/ventures':
      return application.Foreign.Ventures
    case 'foreign/business/conferences':
      return application.Foreign.Conferences
    case 'foreign/business/contact':
      return application.Foreign.Contact
    case 'foreign/business/sponsorships':
      return application.Foreign.Sponsorship
    case 'foreign/business/political':
      return application.Foreign.Political
    case 'foreign/business/voting':
      return application.Foreign.Voting
    case 'foreign/travel':
      return application.Foreign.Travel
    case 'substance/drugs/usage':
      return application.SubstanceUse.DrugUses
    case 'substance/drugs/purchase':
      return application.SubstanceUse.DrugInvolvements
    case 'substance/drugs/clearance':
      return application.SubstanceUse.DrugClearanceUses
    case 'substance/drugs/publicsafety':
      return application.SubstanceUse.DrugPublicSafetyUses
    case 'substance/drugs/misuse':
      return application.SubstanceUse.PrescriptionUses
    case 'substance/drugs/ordered':
      return application.SubstanceUse.OrderedTreatments
    case 'substance/drugs/voluntary':
      return application.SubstanceUse.VoluntaryTreatments
    case 'substance/alcohol/negative':
      return application.SubstanceUse.NegativeImpacts
    case 'substance/alcohol/ordered':
      return application.SubstanceUse.OrderedCounselings
    case 'substance/alcohol/voluntary':
      return application.SubstanceUse.VoluntaryCounselings
    case 'substance/alcohol/additional':
      return application.SubstanceUse.ReceivedCounselings
    case 'legal/police/offenses':
      return application.Legal.PoliceOffenses
    case 'legal/police/additionaloffenses':
      return application.Legal.PoliceOtherOffenses
    case 'legal/police/domesticviolence':
      return application.Legal.PoliceDomesticViolence
    case 'legal/investigations/history':
      return application.Legal.History
    case 'legal/investigations/revoked':
      return application.Legal.Revoked
    case 'legal/investigations/debarred':
      return application.Legal.Debarred
    case 'legal/court':
      return application.Legal.NonCriminalCourtActions
    case 'legal/technology/unauthorized':
      return application.Legal.Unauthorized
    case 'legal/technology/manipulating':
      return application.Legal.Manipulating
    case 'legal/technology/unlawful':
      return application.Legal.Unlawful
    case 'legal/associations/terrorist-organization':
      return application.Legal.TerroristOrganization
    case 'legal/associations/engaged-in-terrorism':
      return application.Legal.EngagedInTerrorism
    case 'legal/associations/advocating':
      return application.Legal.Advocating
    case 'legal/associations/membership-overthrow':
      return application.Legal.MembershipOverthrow
    case 'legal/associations/membership-violence-or-force':
      return application.Legal.MembershipViolence
    case 'legal/associations/activities-to-overthrow':
      return application.Legal.ActivitiesToOverthrow
    case 'legal/associations/terrorism-association':
      return application.Legal.TerrorismAssociation
    case 'psycholigical/competence':
      return application.Psychological.Competence
    case 'psycholigical/consultation':
      return application.Psychological.Consultations
    case 'psycholigical/hospitalizations':
      return application.Psychological.Hospitalizations
    case 'psycholigical/diagnoses':
      return application.Psychological.Diagnoses
    case 'psycholigical/conditions':
      return application.Psychological.ExistingConditions
  }

  return null
}

function mapStateToProps (state) {
  const section = state.section || {}
  const app = state.application || {}
  const settings = app.Settings || {}
  return {
    section: section,
    app: app,
    saved: settings.saved || new Date()
  }
}

export default connect(mapStateToProps)(AuthenticatedView(SavedIndicator))
