import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { i18n } from 'config'
import { MILITARY } from 'constants/sections'
import * as formTypes from 'config/formTypes'
import { ErrorList } from 'components/ErrorList'
import SectionNavigation from 'components/Section/shared/SectionNavigation'
import Selective from 'components/Section/Military/Selective'
import History from 'components/Section/Military/History'
import Disciplinary from 'components/Section/Military/Disciplinary'
import Foreign from 'components/Section/Military/Foreign'
import Intro from 'components/Section/Military/Intro'
import Review from 'components/Section/Military/Review'

const Military = ({ subsection, location, formType }) => {
  const subsectionLibrary = {
    intro: Intro,
    selective: Selective,
    history: History,
    disciplinary: Disciplinary,
    foreign: Foreign,
    review: Review,
  }

  const form = formTypes[formType]
  const section = form.find(s => (s.key === MILITARY))
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

        {section.subsections.map(sub => (
          <Route
            key={sub.key}
            path={`/form/${section.path}/${sub.path}`}
            component={subsectionLibrary[sub.name]}
          />
        ))}

        <SectionNavigation currentPath={location.pathname} />
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  const { section } = state
  const app = state.application || {}
  const military = app.Military || {}
  const errors = app.Errors || {}
  const completed = app.Completed || {}
  const addressBooks = app.AddressBooks || {}
  const settings = app.Settings || {}

  return {
    ...section,
    Application: app || {},
    Military: military,
    Errors: errors.military || [],
    Completed: completed.military || [],
    addressBooks,
    formType: settings.formType,
  }
}

Military.defaultProps = {
  subsection: 'intro',
  location: {},
}

Military.propTypes = {
  subsection: PropTypes.string,
  location: PropTypes.object,
  formType: PropTypes.string.isRequired,
}

export const MilitarySections = () => <Review />

export default connect(mapStateToProps)(Military)
