import React from 'react'
import PropTypes from 'prop-types'
import FileSaver from 'file-saver'

import i18n from 'util/i18n'

import { api } from 'services'

import {
  Show, Svg, RadioGroup, Radio,
} from 'components/Form'

import * as sections from 'constants/sections'
import IdentificationReview from 'components/Section/Identification/Review'
import HistoryReview from 'components/Section/History/Review'
import RelationshipsReview from 'components/Section/Relationships/Review'
import CitizenshipReview from 'components/Section/Citizenship/Review'
import MilitaryReview from 'components/Section/Military/Review'
import ForeignReview from 'components/Section/Foreign/Review'
import FinancialReview from 'components/Section/Financial/Review'
import SubstanceUseReview from 'components/Section/SubstanceUse/Review'
import LegalReview from 'components/Section/Legal/Review'
import PsychologicalReview from 'components/Section/Psychological/Review'

import connectPackageSection from '../PackageConnector'

const blobFromBase64 = (base64, contentType = '', size = 512) => {
  const binary = window.atob(base64)
  const buffer = []
  for (let offset = 0; offset < binary.length; offset += size) {
    const slice = binary.slice(offset, offset + size)
    const numbers = new Array(slice.length)

    for (let i = 0; i < slice.length; i += 1) {
      numbers[i] = slice.charCodeAt(i)
    }

    buffer.push(new Uint8Array(numbers))
  }

  return new window.Blob(buffer, { type: contentType })
}

class PackagePrint extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      printed: false,
      attachments: [],
    }

    this.supportsBlobs = false
    try {
      this.supportsBlobs = !!new window.Blob()
    } catch (e) {
      this.supportsBlobs = false
    }
  }

  componentDidMount() {
    const nav = document.getElementsByClassName('form-navigation')[0]
    if (nav && nav.addEventListener) {
      nav.addEventListener('click', this.captureNavigationClick)
    }

    const logout = document.getElementsByClassName('eapp-logout')[0]
    if (logout && logout.addEventListener) {
      logout.addEventListener('click', this.captureLogoutClick)
    }

    this.getStoredAttachments()
  }

  componentWillUnmount() {
    const nav = document.getElementsByClassName('form-navigation')[0]
    if (nav && nav.removeEventListener) {
      nav.removeEventListener('click', this.captureNavigationClick)
    }

    const logout = document.getElementsByClassName('eapp-logout')[0]
    if (logout && logout.removeEventListener) {
      logout.removeEventListener('click', this.captureLogoutClick)
    }
  }

  captureNavigationClick = (e) => {
    if (!window.alert(i18n.t('application.alert.navigation'))) {
      e.stopPropagation()
    }
  }

  captureLogoutClick = (e) => {
    if (!window.confirm(i18n.t('application.alert.logout'))) {
      e.stopPropagation()
    }
  }

  getStoredAttachments = () => {
    api.listAttachments()
      .then((response) => {
        this.setState({
          attachments: response.data || [],
        })
      })
  }

  download = (id) => {
    if (!this.supportsBlobs) {
      return
    }

    const { attachments } = this.state
    const attachment = attachments.find(a => a.id === id)

    api.getAttachment(id)
      .then((response) => {
        const blob = blobFromBase64(response.data, 'application/octet-stream')
        FileSaver.saveAs(blob, attachment.filename)
      })
  }

  handlePrint = () => {
    const interval = setInterval(() => {
      if (document.hasFocus()) {
        clearInterval(interval)
        this.setState({ printed: true })
      }
    }, 600)

    window.print()
  }

  render() {
    const { Settings, formSections } = this.props
    const { printed, attachments } = this.state

    const sectionComponents = {
      [`${sections.IDENTIFICATION}`]: IdentificationReview,
      [`${sections.HISTORY}`]: HistoryReview,
      [`${sections.RELATIONSHIPS}`]: RelationshipsReview,
      [`${sections.CITIZENSHIP}`]: CitizenshipReview,
      [`${sections.MILITARY}`]: MilitaryReview,
      [`${sections.FOREIGN}`]: ForeignReview,
      [`${sections.FINANCIAL}`]: FinancialReview,
      [`${sections.SUBSTANCE_USE}`]: SubstanceUseReview,
      [`${sections.LEGAL}`]: LegalReview,
      [`${sections.PSYCHOLOGICAL}`]: PsychologicalReview,
    }

    return (
      <div className="pre-print-view">
        <div className="screen-only">
          {i18n.m('application.print.title')}
          <button type="button" className="print-btn" onClick={this.handlePrint}>
            {i18n.t('application.print.button')}
          </button>

          <Show when={printed}>
            <div className="done">
              <span className="icon">
                <Svg src="/img/checkmark.svg" alt={i18n.t('review.completeSvg')} />
              </span>
              {i18n.m('application.print.done')}
            </div>
          </Show>

          <h4 className="hash">{i18n.t('application.hashCode.title')}</h4>
          <p className="hash">{Settings.hash}</p>
        </div>

        <div className="screen-only">
          <h4 className="attachments">{i18n.t('application.print.files.title')}</h4>
          <p className="attachments">{i18n.m('application.print.files.para')}</p>
          <table>
            <tbody>
              {attachments.map((attachment, i) => (
                <tr key={`attachment-${attachment.id}`}>
                  <td>
                    <Show when={this.supportsBlobs}>
                      <button
                        type="button"
                        aria-label={`Download ${attachment.filename}`}
                        onClick={this.download.bind(this, attachment.id)}
                      >
                        <strong>
                          {`${i + 1}. `}
                          {attachment.description && `${attachment.description} - `}
                        </strong>
                        {attachment.filename}
                      </button>
                    </Show>

                    <Show when={!this.supportsBlobs}>
                      <strong>
                        {`${i + 1}. `}
                        {attachment.description && `${attachment.description} - `}
                      </strong>
                      {attachment.filename}
                    </Show>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="print-view">
          <h4>{i18n.m('introduction.acceptance.heading')}</h4>
          {i18n.m('introduction.acceptance.title')}
          {i18n.m('introduction.acceptance.para')}

          <RadioGroup
            className="option-list branch"
            selectedValue="Yes"
          >
            <Radio
              label="Yes"
              value="Yes"
              className="yes"
              checked="true"
            />
            <Radio
              label="No"
              value="No"
              className="no"
            />
          </RadioGroup>

          {formSections.map((section) => {
            const SectionComponent = sectionComponents[section.key]

            return (
              <div className="section-print-container" key={`print-section-${section.key}`}>
                <h3 className="section-print-header">{section.label}</h3>
                <SectionComponent forPrint />
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

PackagePrint.propTypes = {
  Settings: PropTypes.object,
  formSections: PropTypes.array,
}

PackagePrint.defaultProps = {
  Settings: {},
  formSections: [],
}

export default connectPackageSection(PackagePrint)
