import React from 'react'
import { ErrorList } from '../ErrorList'

export class SectionViews extends React.Component {
  handleTransition (routePath, event) {
    const parts = (routePath || '').split('/')
    this.props.update({ section: parts.shift(), subsection: parts.join('/') || 'intro'})
  }

  render () {
    // Iterate through child <SectionView /> components and check their props
    const children = React.Children.map(this.props.children, (child) => {
      const currentSection = this.props.current || ''
      // If the current route name matches one of the section view child component names
      if (currentSection === child.props.name) {
        let previousButton = <div className="btn-cell"></div>
        if (child.props.back) {
          const backtalk = `Go to previous section ${child.props.backLabel}`
          previousButton = (
            <button className="btn-cell back" title={backtalk} aria-label={backtalk} onClick={this.handleTransition.bind(this, child.props.back)}>
              <div className="actions back">
                <div className="icon">
                  <i className="fa fa-arrow-circle-left" aria-hidden="true"></i>
                </div>
                <div className="text">
                  <div className="direction">Back</div>
                  <div className="label">{child.props.backLabel}</div>
                </div>
              </div>
            </button>
          )
        }

        let nextButton = <div className="btn-cell"></div>
        if (child.props.next) {
          const nexttalk = `Go to next section ${child.props.nextLabel}`
          nextButton = (
            <button className="btn-cell next" title={nexttalk} aria-label={nexttalk} onClick={this.handleTransition.bind(this, child.props.next)}>
              <div className="actions next">
                <div className="text">
                  <div className="direction">Next</div>
                  <div className="label">{child.props.nextLabel}</div>
                </div>
                <div className="icon">
                  <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
                </div>
              </div>
            </button>
          )
        }

        let buttons = child.props.back || child.props.next
            ? (
              <div className="btn-wrap">
                <div className="btn-container">
                  {previousButton}
                  <div className="btn-spacer"></div>
                  {nextButton}
                </div>
              </div>
            )
            : null

        let title = null
        if (child.props.title) {
          title = (<h2 className="title">{child.props.title}</h2>)
        }

        let topButtons = null
        if (child.props.showTop && buttons) {
          topButtons = <div className="top-btns"><ErrorList /></div>
        }

        let bottomButtons = null
        if (buttons) {
          bottomButtons = (<div className="bottom-btns">{buttons}</div>)
        }

        return (
          <div className="section-view">
            {title}
            {child.props.para}
            <div className={`view view-${child.props.name || 'unknown'}`}>
              {topButtons}
              {child}
              {bottomButtons}
            </div>
          </div>
        )
      }
    })

    return (
      <div>{children}</div>
    )
  }
}

SectionViews.defaultProps = {
  update: (props) => { console.warn(`Failed to navigate to section: ${props.section} and subsection: ${props.subsection}.`) }
}

export function SectionView (props) {
  return (<div>{props.children}</div>)
}

SectionView.BottomButtonsSelector = '.bottom-btns'
