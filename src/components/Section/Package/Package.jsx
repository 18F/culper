import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { i18n, navigationWalker } from '../../../config'
import { hideHippa } from '../../../validators/releases'
import { SectionViews, SectionView } from '../SectionView'
import SectionElement from '../SectionElement'
import AuthenticatedView from '../../../views/AuthenticatedView'
import ValidForm from './ValidForm'
import InvalidForm from './InvalidForm'
import SubmissionStatus from './SubmissionStatus'
import Print from './Print'
import Attachments from './Attachments'
import { updateApplication } from '../../../actions/ApplicationActions'
import axios from 'axios'
import { api } from '../../../services'
import schema from '../../../schema'
import { Show } from '../../Form'

class Package extends SectionElement {
  constructor(props) {
    super(props)

    this.updateAttachments = this.updateAttachments.bind(this)
    this.updateSubmission = this.updateSubmission.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onTransitionEnd = this.onTransitionEnd.bind(this)
    this.errorCheck = this.errorCheck.bind(this)
    // TODO: Remove after testing
    this.goToReleases = this.goToReleases.bind(this)
    this.state = {
      submitting: false,
      submissionError: false
    }
  }

  updateAttachments(values) {
    this.handleUpdate('Attachments', values)
  }

  updateSubmission(values) {
    this.handleUpdate('Releases', values)
  }

  onSubmit(success, error) {
    const releases = (this.props.Submission || {}).Releases || {}
    let data = { ...releases }
    const payload = schema(`package.submit`, data, false)
    this.setState({ submitting: true })

    axios
      .all([api.save(payload)])
      .then(() => {
        return api.submit()
      })
      .then(() => {
        return api.status()
      })
      .then(response => {
        const statusData = (response || {}).data || {}
        this.props.dispatch(
          updateApplication('Settings', 'locked', statusData.Locked || false)
        )
        this.props.dispatch(
          updateApplication('Settings', 'hash', statusData.Hash || false)
        )
        this.props.update({ section: 'package', subsection: 'print' })
        this.handleUpdate('Releases', releases)
      })
      .catch(() => {
        console.warn('Failed to form package')
        this.setState({
          submitting: false,
          submissionError: true
        })
        this.handleUpdate('Releases', data)
      })
  }

  /**
   * When the progress bar transition ends, redirect to page containing
   * releases or errors based on whether the form is valid
   */
  onTransitionEnd() {
    const tally = this.errorCheck()
    for (const sectionName in tally) {
      const mark = tally[sectionName]
      if (mark.errors > 0) {
        // We do not call `this.props.update` here because there is no hard
        // route to `package/errors`. By only pushing the new location we keep
        // the navigation element marking `/review` as active but allow us to
        // display a different internal route.
        this.props.history.push('/form/package/errors')
        return
      }
    }

    this.props.update({ section: 'package', subsection: 'submit' })
    return
  }

  /**
   * TODO: Remove after testing. Hook to get to releases form
   */
  goToReleases() {
    this.props.update({ section: 'package', subsection: 'submit' })
  }

  errorCheck() {
    let tally = {}

    navigationWalker((path, child) => {
      if (path.length && path[0].store && child.store && child.validator) {
        if (
          child.excluded ||
          child.hidden ||
          (child.hiddenFunc && child.hiddenFunc(this.props.Application))
        ) {
          return
        }

        const sectionName = path[0].url
        const data =
          (this.props.Application[path[0].store] || {})[child.store] || {}

        let subsectionName = child.url
        if (path.length > 1) {
          for (let i = path.length - 1; i > 0; i--) {
            subsectionName = `${path[i].url}/${subsectionName}`
          }
        }

        let valid = null
        try {
          valid = new child.validator(data, data).isValid()
        } catch (e) {
          valid = null
        }

        if (!tally[sectionName]) {
          tally[sectionName] = {}
        }

        tally[sectionName].section = path[0]
        if (valid === false) {
          tally[sectionName].errors =
            (tally[sectionName].errors || 0) + (valid === false ? 1 : 0)
          tally[sectionName].subsections = [
            ...(tally[sectionName].subsections || []),
            child
          ]
        }
      }
    })

    return tally
  }

  render() {
    const tally = this.errorCheck()
    const releases = (this.props.Submission || {}).Releases || {}
    return (
      <SectionViews
        current={this.props.subsection}
        dispatch={this.props.dispatch}
        update={this.props.update}>
        <SectionView
          name="attachments"
          back="psychological/review"
          backLabel={i18n.t('psychological.destination.review')}
          next="package/review"
          nextLabel={i18n.t('application.destination.submit')}>
          <Attachments
            {...this.props.Submission.Attachments}
            onUpdate={this.updateAttachments}
          />
        </SectionView>
        <SectionView name="review">
          <SubmissionStatus
            transition={true}
            onTransitionEnd={this.onTransitionEnd}
          />
        </SectionView>
        <SectionView name="valid">
          <SubmissionStatus
            transition={true}
            onTransitionEnd={this.goToReleases}
          />
        </SectionView>
        <SectionView name="errors">
          <SubmissionStatus valid={false} transition={false}>
            <InvalidForm tally={tally} dispatch={this.props.dispatch} />
          </SubmissionStatus>
        </SectionView>
        <SectionView name="submit">
          <SubmissionStatus valid={true} transition={false}>
            <ValidForm
              {...releases}
              dispatch={this.props.dispatch}
              onUpdate={this.updateSubmission}
              hideHippa={hideHippa(this.props.Application)}
              submitting={this.state.submitting}
              LegalName={this.props.LegalName}
              onSubmit={this.onSubmit}
              Identification={this.props.Identification}
              History={this.props.History}
            />
          </SubmissionStatus>
          <Show when={this.state.submissionError}>
            <div className="field">
              <div className="table">
                <div className="messages">
                  <div className="usa-alert usa-alert-error" role="alert">
                    <div className="usa-alert-body">
                      {i18n.m('error.submission.message')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Show>
        </SectionView>
        <SectionView name="print">
          <Print {...releases} />
        </SectionView>
      </SectionViews>
    )
  }
}

/**
 * Checks if all sections are complete
 */
export const allSectionsValid = sections => {
  for (let section of sections) {
    const topLevel = section.subsections
    if (
      !topLevel.every(s => {
        return s.complete === true
      })
    ) {
      return false
    }
  }
  return true
}

function mapStateToProps(state) {
  const app = state.application || {}
  const identification = app.Identification || {}
  const relationships = app.Relationships || {}
  const history = app.History || {}
  const historyResidence = history.Residence || {}
  const historyEmployment = history.Employment || { List: {} }
  const historyEducation = history.Education || {
    HasAttended: {},
    HasDegree10: {},
    List: {}
  }
  const citizenship = app.Citizenship || {}
  const military = app.Military || {}
  const foreign = app.Foreign || {}
  const financial = app.Financial || {}
  const substanceUse = app.SubstanceUse || {}
  const legal = app.Legal || {}

  let errors = app.Errors || {}
  let completed = app.Completed || {}
  return {
    Application: app,
    Submission: app.Submission || {
      Releases: {
        AdditionalComments: {
          Signature: {}
        },
        General: {
          Signature: {}
        },
        Medical: {
          Signature: {}
        },
        Credit: {
          Signature: {}
        }
      }
    },
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
    LegalName: identification.ApplicantName || {},
    Errors: errors.releases || [],
    Completed: completed.releases || []
  }
}

Package.defaultProps = {
  section: 'package',
  store: 'Submission'
}

export default withRouter(connect(mapStateToProps)(AuthenticatedView(Package)))
