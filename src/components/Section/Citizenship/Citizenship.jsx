import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router'
import { connect } from 'react-redux'
import { i18n } from 'config'
import { ErrorList } from 'components/ErrorList'
import SectionNavigation from 'components/Section/shared/SectionNavigation'
import { CITIZENSHIP } from 'constants/sections'
import * as formTypes from 'config/formTypes'
import Intro from './Intro'
import Status from './Status'
import Multiple from './Multiple'
import Passports from './Multiple/Passports'
import Review from './Review'

const Citizenship = ({ subsection, location, formType }) => {
  const subsectionLibrary = {
    intro: Intro,
    status: Status,
    multiple: Multiple,
    passports: Passports,
    review: Review,
  }

  const form = formTypes[formType]
  const section = form.find(s => (s.key === CITIZENSHIP))
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
  const auth = state.authentication || {}

  return {
    formType: auth.formType,
    ...section,
  }
}

Citizenship.propTypes = {
  subsection: PropTypes.string,
  location: PropTypes.object,
  formType: PropTypes.string.isRequired,
}

Citizenship.defaultProps = {
  subsection: 'intro',
  location: {},
}

export const CitizenshipSections = () => <Review />

export default connect(mapStateToProps)(Citizenship)
