import React from 'react'
import { Route } from 'react-router'
import { connect } from 'react-redux'
import SectionElement from '@components/Section/SectionElement'
import SectionNavigation from '@components/Section/shared/SectionNavigation'

import * as sections from '@constants/sections'

import Intro from './Intro'
import Status from './Status'
import Multiple from './Multiple'
import Passports from './Multiple/Passports'
import Review from './Review'

class Citizenship extends SectionElement {
  render() {
    const subsection = this.props.subsection || 'intro'

    const subsectionClasses = `view view-${subsection || 'unknown'}`

    const isReview = subsection === 'review'
    const title = isReview && i18n.t('review.title')
    const para = isReview && i18n.m('review.para')

    /** TODO - this should come from Redux store */
    const formType = 'SF86'

    return (
      <div className="section-view">
        {title && <h1 className="title">{title}</h1>}
        {para}

        <div className={subsectionClasses}>
          {isReview && (
            <div className="top-btns"><ErrorList /></div>
          )}

          <Route path="/form/citizenship/intro" component={Intro} />
          <Route path="/form/citizenship/status" component={Status} />
          <Route path="/form/citizenship/multiple" component={Multiple} />
          <Route path="/form/citizenship/passports" component={Passports} />
          <Route path="/form/citizenship/review" component={Review} />

          <SectionNavigation
            section={sections.CITIZENSHIP}
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
    Completed: completed.citizenship || []
  }
}

Citizenship.defaultProps = {
  subsection: 'intro'
}

export const CitizenshipSections = () => <Review />

export default connect(mapStateToProps)(Citizenship)
