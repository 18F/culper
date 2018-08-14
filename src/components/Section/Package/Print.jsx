import React from 'react'
import FileSaver from 'file-saver'
import { connect } from 'react-redux'
import { i18n, navigation } from '../../../config'
import { api } from '../../../services'
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

class Print extends React.Component {
  constructor(props) {
    super(props)
    this.sections = this.sections.bind(this)
    this.handlePrint = this.handlePrint.bind(this)
    this.state = {
      printed: false,
      attachments: []
    }

    this.supportsBlobs = false
    try {
      this.supportsBlobs = !!new window.Blob()
    } catch (e) {
      this.supportsBlobs = false
    }

    this.getStoredAttachments = this.getStoredAttachments.bind(this)
    this.displayAttachments = this.displayAttachments.bind(this)
  }

  download(id) {
    if (!this.supportsBlobs) {
      return
    }

    const attachment = this.state.attachments.find(x => x.id === id)
    api
      .getAttachment(id)
      .then(response => {
        const blob = blobFromBase64(response.data, 'application/octet-stream')
        FileSaver.saveAs(blob, attachment.filename)
      })
      .catch(() => {
        this.setState({
          errorMessage: i18n.t('application.attachments.upload.error.download')
        })
      })
  }

  getStoredAttachments() {
    api.listAttachments().then(response => {
      this.setState({ attachments: response.data || [], errorMessage: '' })
    })
  }

  displayAttachments(items) {
    return items.map((x, i) => {
      return (
        <tr key={`attachment-${x.id}`}>
          <td>
            <Show when={this.supportsBlobs}>
              <a
                href="javascript:;;"
                aria-label={`Download ${x.filename}`}
                onClick={this.download.bind(this, x.id)}>
                <strong>
                  {`${i + 1}. `}
                  {x.description ? `${x.description} - ` : ''}
                </strong>
                {x.filename}
              </a>
            </Show>
            <Show when={!this.supportsBlobs}>
              <strong>
                {`${i + 1}. `}
                {x.description ? `${x.description} - ` : ''}
              </strong>
              {x.filename}
            </Show>
          </td>
        </tr>
      )
    })
  }

  componentWillUnmount() {
    let nav = document.getElementsByClassName('form-navigation')[0]
    nav.removeEventListener('click', this.captureNavigationClick)
    let logout = document.getElementsByClassName('eapp-logout')[0]
    logout.removeEventListener('click', this.captureLogoutClick)
  }

  componentDidMount() {
    let nav = document.getElementsByClassName('form-navigation')[0]
    if (nav && nav.addEventListener) {
      nav.addEventListener('click', this.captureNavigationClick)
    }

    let logout = document.getElementsByClassName('eapp-logout')[0]
    if (logout && logout.addEventListener) {
      logout.addEventListener('click', this.captureLogoutClick)
    }
    this.getStoredAttachments()
  }

  captureNavigationClick(e) {
    if (!window.alert(i18n.t('application.alert.navigation'))) {
      e.stopPropagation()
    }
  }

  captureLogoutClick(e) {
    if (!window.confirm(i18n.t('application.alert.logout'))) {
      e.stopPropagation()
    }
  }

  sections() {
    return navigation.map((section, index, arr) => {
      let sectionComponent = null
      switch (section.url) {
        case 'identification':
          sectionComponent = (
            <IdentificationSections {...this.props.Identification} />
          )
          break
        case 'relationships':
          sectionComponent = (
            <RelationshipSections {...this.props.Relationships} />
          )
          break
        case 'history':
          sectionComponent = <HistorySections {...this.props.History} />
          break
        case 'citizenship':
          sectionComponent = <CitizenshipSections {...this.props.Citizenship} />
          break
        case 'military':
          sectionComponent = (
            <MilitarySections
              {...this.props.Military}
              application={this.props.Application}
            />
          )
          break
        case 'foreign':
          sectionComponent = <ForeignSections {...this.props.Foreign} />
          break
        case 'financial':
          sectionComponent = <FinancialSections {...this.props.Financial} />
          break
        case 'substance':
          sectionComponent = (
            <SubstanceUseSections {...this.props.SubstanceUse} />
          )
          break
        case 'legal':
          sectionComponent = <LegalSections {...this.props.Legal} />
          break
        case 'psychological':
          sectionComponent = (
            <PsychologicalSections {...this.props.Psychological} />
          )
          break
        default:
          return null
      }

      return (
        <div className="section-print-container" key={index}>
          <h3 className="section-print-header">{section.title}</h3>
          {sectionComponent}
        </div>
      )
    })
  }

  handlePrint() {
    let interval = setInterval(() => {
      if (document.hasFocus()) {
        clearInterval(interval)
        this.setState({ printed: true })
      }
    }, 600)
    window.print()
  }

  done() {
    return (
      <div className="done">
        <span className="icon">
          <Svg src="/img/checkmark.svg" alt={i18n.t('review.completeSvg')} />
        </span>
        {i18n.m('application.print.done')}
      </div>
    )
  }

  render() {
    return (
      <div className="pre-print-view">
        <div>
          {i18n.m('application.print.title')}
          <button className="print-btn" onClick={this.handlePrint}>
            {i18n.t('application.print.button')}
          </button>
          <Show when={this.state.printed}>{this.done()}</Show>
          <h4 className="hash">{i18n.t('application.hashCode.title')}</h4>
          <p className="hash">{this.props.Settings.hash}</p>
        </div>
        <div>
          <h4 className="attachments">
            {i18n.t('application.print.files.title')}
          </h4>
          <p className="attachments">
            {i18n.m('application.print.files.para')}
          </p>
          <table>
            <tbody>{this.displayAttachments(this.state.attachments)}</tbody>
          </table>
        </div>
        <div className="print-view">{this.sections()}</div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const app = state.application || {}
  const identification = app.Identification || {}
  const relationships = app.Relationships || {}
  const history = app.History || {}
  const historyResidence = history.Residence || {}
  const historyEmployment = history.Employment || { List: {} }
  const historyEducation = history.Education || {
    HasAttended: '',
    HasDegree10: '',
    List: {}
  }
  const citizenship = app.Citizenship || {}
  const military = app.Military || {}
  const foreign = app.Foreign || {}
  const financial = app.Financial || {}
  const substanceUse = app.Substance || {}
  const legal = app.Legal || {}
  const psychological = app.Psychological || {}
  const settings = app.Settings || { locked: false, hash: '' }

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
    Settings: settings,
    Errors: errors.releases || [],
    Completed: completed.releases || []
  }
}

Print.defaultProps = {
  section: 'print',
  subsection: 'intro',
  store: 'Print'
}

const blobFromBase64 = (base64, contentType = '', size = 512) => {
  const binary = window.atob(base64)
  const buffer = []
  for (let offset = 0; offset < binary.length; offset += size) {
    let slice = binary.slice(offset, offset + size)
    let numbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      numbers[i] = slice.charCodeAt(i)
    }
    buffer.push(new Uint8Array(numbers))
  }
  return new window.Blob(buffer, { type: contentType })
}

export default connect(mapStateToProps)(AuthenticatedView(Print))
