import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router'
import { connect } from 'react-redux'
import classnames from 'classnames'

import { i18n } from 'config'

import { ErrorList } from 'components/ErrorList'
import SectionNavigation from 'components/Section/shared/SectionNavigation'

import Intro from 'components/Section/Financial/Intro'
import Bankruptcies from 'components/Section/Financial/Bankruptcy'
import Gambling from 'components/Section/Financial/Gambling'
import Taxes from 'components/Section/Financial/Taxes'
import Card from 'components/Section/Financial/Card'
import Credit from 'components/Section/Financial/Credit'
import Delinquent from 'components/Section/Financial/Delinquent'
import Nonpayment from 'components/Section/Financial/Nonpayment'
import Review from 'components/Section/Financial/Review'

const Financial = (props) => {
  const { subsection, location } = props

  const subsectionClasses = classnames(
    'view',
    `view-${subsection}`
  )

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

        <Route path="/form/financial/intro" component={Intro} />
        <Route path="/form/financial/bankruptcy" component={Bankruptcies} />
        <Route path="/form/financial/gambling" component={Gambling} />
        <Route path="/form/financial/taxes" component={Taxes} />
        <Route path="/form/financial/card" component={Card} />
        <Route path="/form/financial/credit" component={Credit} />
        <Route path="/form/financial/delinquent" component={Delinquent} />
        <Route path="/form/financial/nonpayment" component={Nonpayment} />
        <Route path="/form/financial/review" component={Review} />

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

Financial.propTypes = {
  subsection: PropTypes.string,
  location: PropTypes.object,
}

Financial.defaultProps = {
  subsection: 'intro',
  location: {},
}

export default connect(mapStateToProps)(Financial)

export const FinancialSections = () => <Review />
