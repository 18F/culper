import React from 'react'
import PropTypes from 'prop-types'
import {
  updateApplication,
  reportErrors
} from '../../actions/ApplicationActions'
import { i18n } from '../../config'
import { createSectionViews, createReviewGroups } from './generators'
import SectionComments from './SectionComments'
import { SectionView } from './SectionView'

export default class SectionElement extends React.Component {
  constructor(props) {
    super(props)

    this.handleError = this.handleError.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  handleError(value, arr) {
    const action = reportErrors(this.props.section, this.props.subsection, arr)
    this.props.dispatch(action)
    return arr
  }

  handleUpdate(field, values) {
    // const id = `${this.props.section}/${this.props.subsection}`.replace(/\//g, '.')
    // this.props.dispatch(updateApplication(this.props.store, field, schema(id, values, false)))
    this.props.dispatch(updateApplication(this.props.store, field, values))
  }

  getSubsectionProps(subsection) {
    return {
      ...this.props[subsection.store],
      dispatch: this.props.dispatch,
      onUpdate: this.handleUpdate.bind(this, subsection.store),
      onError: this.handleError
    }
  }

  // meant to be overridden
  getReviewGroupProps(subsection) {
    return this.getSubsectionProps(subsection)
  }

  createReviewGroups(navigation) {
    return createReviewGroups(navigation, subsection => {
      return this.getReviewGroupProps(subsection)
    })
  }

  createReviewSubsection(navigation, nextSection) {
    const section = navigation.url
    const numSubsections = navigation.subsections.length - 1
    const prevSubsection = navigation.subsections[numSubsections - 1].url
    const reviewComponents = this.createReviewGroups(navigation)

    return (
      <SectionView
        name="review"
        title={i18n.t('review.title')}
        para={i18n.m('review.para')}
        showTop={true}
        back={`${section}/${prevSubsection}`}
        backLabel={i18n.t(`${section}.destination.${prevSubsection}`)}
        next={`${nextSection}/intro`}
        nextLabel={i18n.t(`${nextSection}.destination.intro`)}>
        {reviewComponents}
        <SectionComments
          name="comments"
          {...this.props.Comments}
          section={section}
          subsection="name"
          title={i18n.t(`${section}.review.comments`)}
          dispatch={this.props.dispatch}
          onUpdate={this.handleUpdate.bind(this, 'Comments')}
          onError={this.handleError}
          required={false}
          scrollIntoView={false}
        />
      </SectionView>
    )
  }

  createSectionViews(navigation) {
    return createSectionViews(navigation, subsection => {
      return this.getSubsectionProps(subsection)
    })
  }
}

SectionElement.propTypes = {
  dispatch: PropTypes.func,
  section: PropTypes.string.isRequired,
  store: PropTypes.string.isRequired,
  // required if you want anything to be displayed
  subsection: PropTypes.string
}
