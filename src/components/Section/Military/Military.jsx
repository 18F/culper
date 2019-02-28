import React from 'react'
import { Route } from 'react-router'
import { connect } from 'react-redux'
import { i18n } from 'config'
import * as sections from 'constants/sections'
import { ErrorList } from 'components/ErrorList'
import SectionNavigation from 'components/Section/shared/SectionNavigation'
import { SectionViews, SectionView } from 'components/Section/SectionView'
import SectionElement from 'components/Section/SectionElement'
import { hideDisciplinaryProcedures } from 'validators/militarydisciplinary'
import { hideSelectiveService } from 'validators/selectiveservice'
import { Show, Field } from 'components/Form'
import Selective from 'components/Section/Military/Selective'
import History from 'components/Section/Military/History'
import Disciplinary from 'components/Section/Military/Disciplinary'
import Foreign from 'components/Section/Military/Foreign'
import Intro from 'components/Section/Military/Intro'
import Review from 'components/Section/Military/Review'

class Military extends React.Component {
  render() {
    const subsection = this.props.subsection || 'intro'

    const subsectionClasses = `view view-${subsection || 'unknown'}`

    const isReview = subsection === 'review'
    const title = isReview && i18n.t('review.title')
    const para = isReview && i18n.m('review.para')

    /** TODO - this should come from Redux store */
    const formType = 'SF86'

    return(
      <div className="section-view">
        {title && <h1 className="title">{title}</h1>}
        {para}

        <div className={subsectionClasses}>
          {isReview && (
            <div className="top-btns"><ErrorList /></div>
          )}

          <Route path="/form/military/intro" component={Intro} />
          <Route path="/form/military/selective" component={Selective} />
          <Route path="/form/military/history" component={History} />
          <Route path="/form/military/disciplinary" component={Disciplinary} />
          <Route path="/form/military/foreign" component={Foreign} />
          <Route path="/form/military/review" component={Review} />

          <SectionNavigation
            section={sections.MILITARY}
            subsection={subsection}
            formType={formType} />
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

  return {
    ...section,
    Application: app || {},
    Military: military,
    Errors: errors.military || [],
    Completed: completed.military || [],
    addressBooks: addressBooks
  }
}

Military.defaultProps = {
  section: 'military',
  subsection: 'intro',
  store: 'Military',
  scrollToBottom: SectionView.BottomButtonsSelector
}

export const MilitarySections = () => <Review />

export default connect(mapStateToProps)(Military)
