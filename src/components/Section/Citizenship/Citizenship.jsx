import React from 'react'
import { Route } from 'react-router'
import { connect } from 'react-redux'
import { i18n } from '@config'
import { ErrorList } from '@components/ErrorList'
import SectionNavigation from '@components/Section/shared/SectionNavigation'
import { CITIZENSHIP } from '@constants/sections'
import * as formTypes from '@config/formTypes'
import Intro from './Intro'
import Status from './Status'
import Multiple from './Multiple'
import Passports from './Multiple/Passports'
import Review from './Review'

class Citizenship extends React.Component {
  constructor(props) {
    super(props)

    this.form = formTypes[props.formType]

    // Each key in subsectionLibrary correspondes to the subsection
    // name in the config file.
    this.subsectionLibrary = {
      intro: Intro,
      status: Status,
      multiple: Multiple,
      passports: Passports,
      review: Review
    }
  }
  getCitizenshipSubsections = () => {
    const section = this.form.find(section => (section.key === CITIZENSHIP))

    return section.subsections.map(subsection => (
      <Route
        key={subsection.key}
        path={`/form${subsection.path}`}
        component={this.subsectionLibrary[subsection.name]}
      />
    ))
  }

  render() {
    const { subsection = 'intro', formType } = this.props
    const subsectionClasses = `view view-${subsection || 'unknown'}`
    const isReview = subsection === 'review'
    const title = isReview && i18n.t('review.title')
    const para = isReview && i18n.m('review.para')

    return (
      <div className="section-view">
        {title && <h1 className="title">{title}</h1>}
        {para}

        <div className={subsectionClasses}>
          {isReview && (
            <div className="top-btns"><ErrorList /></div>
          )}

          {this.getCitizenshipSubsections()}

          <SectionNavigation
            section={CITIZENSHIP}
            subsection={subsection}
            formType={formType}
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const app = state.application || {}
  const auth = state.authentication || {}
  const citizenship = app.Citizenship || {}
  const errors = app.Errors || {}
  const completed = app.Completed || {}

  return {
    Application: app,
    Citizenship: citizenship,
    Status: citizenship.Status || {},
    Multiple: citizenship.Multiple || {},
    Passports: citizenship.Passports || {},
    Errors: errors.citizenship || [],
    Completed: completed.citizenship || [],
    formType: auth.formType
  }
}

Citizenship.defaultProps = {
  subsection: 'intro'
}

export const CitizenshipSections = () => <Review />

export default connect(mapStateToProps)(Citizenship)
