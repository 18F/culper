import React from 'react'
import { push } from '../../middleware/history'
import { i18n } from '../../config'

export class SectionViews extends React.Component {

  handleTransition (routePath, event) {
    this.props.dispatch(push(`/form/${routePath}`))
  }

  render () {
    // Iterate through child <SectionView /> components and check their props
    const children = React.Children.map(this.props.children, (child) => {
      const currentSection = this.props.current || ''
      // If the current route name matches one of the section view child component names
      if (currentSection === child.props.name) {
        let buttons = (
            <div className="btn-wrap">
              <div className="btn-container">
                {
                  child.props.back &&
                    <div className="btn-cell btn-prev">
                    <button className="back" onClick={this.handleTransition.bind(this, child.props.back)}>
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
                  </div>
                }
                <div className="btn-spacer"></div>
                {
                      child.props.next &&
                    <div className="btn-cell btn-next">
                        <button className="next" onClick={this.handleTransition.bind(this, child.props.next)}>
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
                   </div>
                }
              </div>
            </div>
        )

        return (
          <div className="section-view">
            {
              child.props.title && <h2 className="title">{child.props.title}</h2>
            }
            {
              child.props.showTop === 'true' && <div className="top-btns">{buttons}</div>
            }
            <div className="view">
              {child}
            </div>
            <div>{buttons}</div>
          </div>
        )
      }
    })

    return (
      <div>{children}</div>
    )
  }
}

export function SectionView (props) {
  return (<div>{props.children}</div>)
}
