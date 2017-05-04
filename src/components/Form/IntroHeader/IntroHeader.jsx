import React from 'react'
import { i18n } from '../../../config'
import Svg from '../Svg'

export default class IntroHeader extends React.Component {
  tour () {
    return (
      <div className="review-tour">
        <h3>{i18n.t('intro.tour.title')}</h3>
        <p>{this.props.tour}</p>
        <button onClick={this.props.onTour}>{i18n.t('intro.tour.button')}</button>
      </div>
    )
  }

  review () {
    return (
      <div className="review-full">
        <h3>{i18n.t('intro.review.title')}</h3>
        <p>{this.props.review}</p>
        <button onClick={this.props.onReview}>{i18n.t('intro.review.button')}</button>
      </div>
    )
  }

  render () {
    if (this.props.Errors && this.props.Errors.length > 0) {
      return (
        <div>
          <h1>{i18n.t('intro.errors')}</h1>
          <div className="review-column">
            <div className="text-center">
              <Svg src="img/review-errors-chunk.svg" />
            </div>
            {this.tour()}
          </div>
          <div className="review-column">
            <div className="text-center">
              <Svg src="img/review-error-all.svg" />
            </div>
            {this.review()}
          </div>
        </div>
      )
    }

    if (this.props.Completed.status === 'complete') {
      return (
        <div>
          <div className="text-center"><i className="fa fa-check-circle"></i></div>
          <h1>{i18n.t('intro.complete')}</h1>
          <div className="review-column">
            <div className="text-center">
              <Svg src="img/review-correct-chunk.svg" />
            </div>
            {this.tour()}
          </div>
          <div className="review-column">
            <div className="text-center">
              <Svg src="img/review-correct-all.svg" />
            </div>
            {this.review()}
          </div>
        </div>
      )
    }

    return (
      <div>
        <h1>{i18n.t('intro.neutral')}</h1>
        <div className="review-column">
          {this.tour()}
        </div>
        <div className="review-column">
          {this.review()}
        </div>
      </div>
    )
  }
}

IntroHeader.defaultProps = {
  Errors: [],
  Completed: {},
  tour: '',
  review: '',
  onTour: () => {},
  onReview: () => {}
}
