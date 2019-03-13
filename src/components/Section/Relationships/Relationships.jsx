import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Route } from 'react-router'
import { connect } from 'react-redux'

import i18n from 'util/i18n'

import { ErrorList } from 'components/ErrorList'
import SectionNavigation from 'components/Section/shared/SectionNavigation'
import Intro from './Intro'
import ConnectedMarital from './RelationshipStatus/Marital'
import ConnectedCohabitants from './RelationshipStatus/Cohabitants'
import People from './People'
import Relatives from './Relatives'
import Review from './Review'

const Relationships = (props) => {
  const { subsection, location } = props

  const subsectionClasses = classnames('view', `view-${subsection}`)

  const isReview = subsection === 'review'
  const title = isReview && i18n.t('review.title')
  const para = isReview && i18n.m('review.para')

  return (
    <div>
      <div className="section-view">
        {title && <h1 className="title">{title}</h1>}
        {para}

        <div className={subsectionClasses}>
          {isReview && (
            <div className="top-btns"><ErrorList /></div>
          )}

          <Route path="/form/relationships/intro" component={Intro} />
          <Route path="/form/relationships/status/marital" component={ConnectedMarital} />
          <Route path="/form/relationships/status/cohabitant" component={ConnectedCohabitants} />
          <Route path="/form/relationships/people" component={People} />
          <Route path="/form/relationships/relatives" component={Relatives} />
          <Route path="/form/relationships/review" component={Review} />

          <SectionNavigation currentPath={location.pathname} />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const { section } = state

  return {
    ...section,
  }
}

/* eslint react/forbid-prop-types: 0 */
Relationships.propTypes = {
  subsection: PropTypes.string,
  location: PropTypes.object,
}

Relationships.defaultProps = {
  subsection: 'intro',
  location: {},
}

export const RelationshipSections = () => <Review forPrint />

export default connect(mapStateToProps)(Relationships)
