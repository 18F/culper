import React from 'react'
import { i18n } from '../../../../config'
import { Show } from '../../../Form'

/**
 * Renders a formatted gap row
 */
export class Gap extends React.Component {
  render () {
    let title = ''
    let btnText = ''
    let para = ''

    switch (this.props.type) {
      case 'Employment':
        title = 'Employment gap'
        btnText = 'Add an employer'
        para = 'There is a gap in your employment. The entire 10 year period must be covered with no gaps.'
        break
      case 'Residence':
        title = 'Residence gap'
        btnText = 'Add an address'
        para = 'There is a gap in your residence history. The entire 10 year period must be covered with no gaps'
        break
    }

    const dates = this.props.dates || {}
    if (!dates.from || !dates.to) {
      return null
    }

    const from = dates.from || {}
    const to = dates.to || {}

    return (
      <div className="item">
        <div className="summary">
          <Show when={this.props.first === true}>
            <div className="caption gutters">
                <div className="title">
                  <h4>{i18n.t('collection.summary')}</h4>
                  <hr />
                </div>
            </div>
          </Show>
          <div className="gap row gutters">
            <div className="help">
              <div className="message eapp-error-message">
                <i className="fa fa-exclamation"></i>
                <span className="dates">{`${from.getMonth() + 1}/${from.getFullYear()}-${to.getMonth() + 1}/${to.getFullYear()}`}</span>
                <h4>{title}</h4>
                <p>{para}</p>
                <button className="usa-button-outline" onClick={this.props.onClick}>
                  <span>{btnText}</span>
                  <i className="fa fa-plus-circle"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="divider gutters">
            <hr />
          </div>
        </div>
      </div>
    )
  }
}
