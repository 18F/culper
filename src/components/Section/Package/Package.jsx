import React from 'react'
import { connect } from 'react-redux'
import { navigation, navigationWalker } from '../../../config'
import { hideHippa } from '../../../validators/releases'
import { SectionViews, SectionView } from '../SectionView'
import SectionElement from '../SectionElement'
import AuthenticatedView from '../../../views/AuthenticatedView'
import ValidForm from './ValidForm'
import InvalidForm from './InvalidForm'
import SubmissionStatus from './SubmissionStatus'
import Print from './Print'
import { push } from '../../../middleware/history'
import { api } from '../../../services'
import schema from '../../../schema'

class Package extends SectionElement {
  constructor (props) {
    super(props)

    this.updateSubmission = this.updateSubmission.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onTransitionEnd = this.onTransitionEnd.bind(this)
    this.errorCheck = this.errorCheck.bind(this)
    // TODO: Remove after testing
    this.goToReleases = this.goToReleases.bind(this)
  }

  updateSubmission (values) {
    this.handleUpdate('Releases', values)
  }

  onSubmit (success, error) {
    const releases = (this.props.Submission || {}).Releases || {}
    const data = { ...releases, Locked: true }
    const payload = schema(`package.submit`, data, false)

    api
      .save(payload)
      .submit()
      .then(r => {
        this.handleUpdate('Releases', {
          ...releases,
          Locked: true
        })
        this.props.dispatch(push('/form/package/print'))
      })
      .catch(() => {
        console.warn('Failed to form package')
        this.handleUpdate('Releases', {
          ...releases,
          Locked: false
        })
      })
  }

  /**
   * When the progress bar transition ends, redirect to page containing
   * releases or errors based on whether the form is valid
   */
  onTransitionEnd () {
    const tally = this.errorCheck()
    for (const sectionName in tally) {
      const mark = tally[sectionName]
      if (mark.errors > 0) {
        this.props.dispatch(push('/form/package/errors'))
        return
      }
    }

    this.props.dispatch(push('/form/package/submit'))
    return
  }

  /**
   * TODO: Remove after testing. Hook to get to releases form
   */
  goToReleases () {
    this.props.dispatch(push('/form/package/submit'))
  }

  errorCheck () {
    let tally = {}

    navigationWalker((path, child) => {
      if (path.length && path[0].store && child.store && child.validator) {
        if (child.excluded || child.hidden || (child.hiddenFunc && child.hiddenFunc(this.props.Application))) {
          return
        }

        const sectionName = path[0].url
        const data = (this.props.Application[path[0].store] || {})[child.store] || {}

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
          tally[sectionName].errors = (tally[sectionName].errors || 0) + (valid === false ? 1 : 0)
          tally[sectionName].subsections = [...(tally[sectionName].subsections || []), child]
        }
      }
    })

    return tally
  }

  render () {
    const tally = this.errorCheck()
    const releases = (this.props.Submission || {}).Releases || {}
    return (
      <SectionViews current={this.props.subsection} dispatch={this.props.dispatch} update={this.props.update}>
        <SectionView name="review">
          <SubmissionStatus transition={true} onTransitionEnd={this.onTransitionEnd}/>
        </SectionView>
        <SectionView name="valid">
          <SubmissionStatus transition={true} onTransitionEnd={this.goToReleases}/>
        </SectionView>
        <SectionView name="errors">
          <SubmissionStatus valid={false} transition={false}>
            <InvalidForm tally={tally} />
          </SubmissionStatus>
        </SectionView>
        <SectionView name="submit">
          <SubmissionStatus valid={true} transition={false}>
            <ValidForm {...releases}
                       onUpdate={this.updateSubmission}
                       hideHippa={hideHippa(this.props.Application)}
                       LegalName={this.props.LegalName}
                       onSubmit={this.onSubmit}
                       Identification={this.props.Identification}
                       History={this.props.History}
                       />
          </SubmissionStatus>
        </SectionView>
        <SectionView name="print">
          <Print />
        </SectionView>
      </SectionViews>
    )
  }
}

/**
 * Checks if all sections are complete
 */
export const allSectionsValid = (sections) => {
  for (let section of sections) {
    const topLevel = section.subsections
    if (!topLevel.every(s => { return s.complete === true })) {
      return false
    }
  }
  return true
}

function mapStateToProps (state) {
  const app = state.application || {}
  const identification = app.Identification || {}
  const relationships = app.Relationships || {}
  const history = app.History || {}
  const historyResidence = history.Residence || {}
  const historyEmployment = history.Employment || { List: {} }
  const historyEducation = history.Education || { HasAttended: {}, HasDegree10: {}, List: {} }
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

export default connect(mapStateToProps)(AuthenticatedView(Package))
