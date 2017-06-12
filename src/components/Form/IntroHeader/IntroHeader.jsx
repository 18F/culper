import React from 'react'
import { i18n } from '../../../config'
import Svg from '../Svg'

export default class IntroHeader extends React.Component {
  tour () {
    return (
      <div className="review-tour">
        <h3>{i18n.t('intro.tour.title')}</h3>
        {this.props.tour}
        <button onClick={this.props.onTour}>{i18n.t('intro.tour.button')}</button>
      </div>
    )
  }

  review () {
    return (
      <div className="review-full">
        <h3>{i18n.t('intro.review.title')}</h3>
        {this.props.review}
        <button onClick={this.props.onReview}>{i18n.t('intro.review.button')}</button>
      </div>
    )
  }

  render () {
    if (this.props.errors()) {
      return (
        <div>
          <h1>{i18n.t('intro.errors')}</h1>
          <div className="review-column">
            <div>
              <Svg src="/img/review-errors-chunk.svg" />
            </div>
            {this.tour()}
          </div>
          <div className="review-column">
            <div>
              <Svg src="/img/review-error-all.svg" />
            </div>
            {this.review()}
          </div>
        </div>
      )
    }

    if (this.props.completed()) {
      return (
        <div>
          <div className="text-center">
            <Svg src="/img/checkmark.svg" className="checkmark" />
          </div>
          <h1>{i18n.t('intro.complete')}</h1>
          <div className="review-column">
            <div>
              <Svg src="/img/review-correct-chunk.svg" />
            </div>
            {this.tour()}
          </div>
          <div className="review-column">
            <div>
              <Svg src="/img/review-correct-all.svg" />
            </div>
            {this.review()}
          </div>
        </div>
      )
    }

    return (
      <div className="review-table">
        <h1>{i18n.t('intro.neutral')}</h1>
        <div className="review-column">
          <div>
            <Svg src="/img/review-errors-chunk.svg" />
          </div>
          {this.tour()}
        </div>
        <div className="review-column">
          <div>
            <Svg src="/img/review-error-all.svg" />
          </div>
          {this.review()}
        </div>
      </div>
    )
  }
}

IntroHeader.defaultProps = {
  errors: () => { return false },
  completed: () => { return false },
  tour: i18n.m('intro.tour.para'),
  review: i18n.m('intro.review.para'),
  onTour: () => {},
  onReview: () => {}
}
