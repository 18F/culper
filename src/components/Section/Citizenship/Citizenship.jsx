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

class Citizenship extends React.Component {
  constructor(props) {
    super(props)

    this.form = formTypes[props.formType]
    this.section = this.form.find(section => (section.key === CITIZENSHIP))

    // Each key in subsectionLibrary corresponds to the subsection
    // name in the config file.
    this.subsectionLibrary = {
      intro: Intro,
      status: Status,
      multiple: Multiple,
      passports: Passports,
      review: Review,
    }
  }

  getCitizenshipSubsections = () => (
    this.section.subsections.map(subsection => (
      <Route
        key={subsection.key}
        path={`/form${subsection.path}`}
        component={this.subsectionLibrary[subsection.name]}
      />
    ))
  )

  render() {
    const { subsection, formType } = this.props
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
  const { section } = state
  const auth = state.authentication || {}

  return {
    formType: auth.formType,
    ...section,
  }
}

Citizenship.propTypes = {
  subsection: PropTypes.string,
  formType: PropTypes.string.isRequired,
}

Citizenship.defaultProps = {
  subsection: 'intro',
}

export const CitizenshipSections = () => <Review />

export default connect(mapStateToProps)(Citizenship)
