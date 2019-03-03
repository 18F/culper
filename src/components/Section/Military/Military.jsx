import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router'
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

class Military extends React.Component {
  constructor(props) {
    super(props)

    this.form = formTypes[props.formType]
    this.section = this.form.find(section => (section.key === MILITARY))

    // Each key in subsectionLibrary corresponds to the subsection
    // name in the config file.
    this.subsectionLibrary = {
      intro: Intro,
      selective: Selective,
      history: History,
      disciplinary: Disciplinary,
      foreign: Foreign,
      review: Review,
    }
  }

  getMilitarySubsections = () => (
    this.section.subsections.map(subsection => (
      <Route
        key={subsection.key}
        path={`/form/${this.section.path}/${subsection.path}`}
        component={this.subsectionLibrary[subsection.name]}
      />
    ))
  )

  render() {
    const { subsection, location, formType } = this.props
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

          {this.getMilitarySubsections()}

          <SectionNavigation
            currentPath={location.pathname}
            formType={formType}
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { section } = state
  const app = state.application || {}
  const military = app.Military || {}
  const errors = app.Errors || {}
  const completed = app.Completed || {}
  const addressBooks = app.AddressBooks || {}
  const auth = state.authentication || {}

  return {
    ...section,
    Application: app || {},
    Military: military,
    Errors: errors.military || [],
    Completed: completed.military || [],
    addressBooks,
    auth: auth.formType,
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
