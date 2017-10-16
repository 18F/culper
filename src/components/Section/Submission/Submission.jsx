import React from 'react'
import { connect } from 'react-redux'
import { i18n, navigation } from '../../../config'
import { hideHippa } from '../../../validators/releases'
import { SectionViews, SectionView } from '../SectionView'
import SectionElement from '../SectionElement'
import AuthenticatedView from '../../../views/AuthenticatedView'
import ValidForm from './ValidForm'
import InvalidForm from './InvalidForm'
import SubmissionStatus from './SubmissionStatus'
import SubmissionComplete from './SubmissionComplete'
import { Show } from '../../Form'

class Submission extends SectionElement {
  constructor (props) {
    super(props)
    this.updateSubmission = this.updateSubmission.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.state = {
      submitted: false
    }
  }

  updateSubmission (values) {
    this.handleUpdate('Releases', values)
  }

  onSubmit () {
    this.setState({
      submitted: true
    }, () => {
      window.scrollTo(0, 0)
    })
  }

  render () {
    const releases = (this.props.Submission || {}).Releases
    const s = statusForAllSections(this.props.Application)
    const valid = true || hasIncompleteSections(s)
    return (
      <SectionViews current={this.props.subsection} dispatch={this.props.dispatch}>
        <SectionView name="">
          <Show when={!this.state.submitted}>
            <SubmissionStatus valid={valid}>
              <Show when={valid}>
                <ValidForm
                  onUpdate={this.updateSubmission}
                  hideHippa={hideHippa(this.props.Application)}
                  {...releases}
                  onSubmit={this.onSubmit}
                />
              </Show>
              <Show when={!valid}>
                <InvalidForm sections={s} />
              </Show>
            </SubmissionStatus>
          </Show>
          <Show when={this.state.submitted}>
            <SubmissionComplete />
          </Show>
        </SectionView>
      </SectionViews>
    )
  }
}

export const hasIncompleteSections = (sections) => {
  for (let section of sections) {
    const topLevel = section.subsections
    if (!topLevel.every(s => { s.complete === true })) {
      return false
    }
  }
  return true
}

export const statusForAllSections = (application) => {
  let possibleSections = possibleSectionsToComplete()
  const completedTopLevelSections = application.Completed

  for (let possibleSection of possibleSections) {
    const completedSections = completedTopLevelSections[possibleSection.url]
    if (!completedSections) {
      return possibleSections
    }

    let possibleSubsections = possibleSection.subsections
    for (let possibleSubsection of possibleSubsections) {
      for (let completedSection of completedSections) {
        if (possibleSubsection.url === completedSection.code) {
          console.debug(`Completion Status for ${possibleSubsection.url} is ${completedSection.valid}`)
          possibleSubsection.complete = completedSection.valid
        }
      }
    }
  }
  return possibleSections
}

export const possibleSectionsToComplete = () => {
  let sections = [...navigation]
  let paths = []
  for (let section of sections) {
    if (section.exclude || section.hidden) {
      continue
    }
    paths.push({
      title: section.title,
      url: section.url,
      subsections: flattenSectionsComplete(section)
    })
  }
  return paths
}

export const flattenSectionsComplete = (section, base) => {
  if (!section.subsections || !section.subsections.length) {
    return [
      {
        url: section.url,
        name: section.name,
        complete: false
      }
    ]
  }
  let paths = []
  for (let subsection of section.subsections) {
    if (subsection.exclude || subsection.hidden) {
      continue
    }

    let url = `${section.url}`
    let sPaths = flattenSectionsComplete(subsection).map(i => {
      return {
        url: `${url}/${i.url}`,
        name: i.name,
        complete: false
      }
    })
    paths = paths.concat(sPaths)
  }

  return paths
}

function mapStateToProps (state) {
  const app = state.application || {}
  const releases = app.Releases || {}
  const identification = app.Identification || {}
  const relationships = app.Relationships || {}
  const history = app.History || {}
  const historyResidence = history.Residence || []
  const historyEmployment = history.Employment || { List: [], ListBranch: '' }
  const historyEducation = history.Education || { HasAttended: '', HasDegree10: '', List: [] }
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
    Releases: releases,
    Submission: app.Submission || {
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
    Errors: errors.releases || [],
    Completed: completed.releases || []
  }
}

Submission.defaultProps = {
  section: 'submission',
  store: 'Submission'
}

export default connect(mapStateToProps)(AuthenticatedView(Submission))
