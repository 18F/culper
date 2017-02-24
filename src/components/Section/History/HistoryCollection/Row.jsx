import React from 'react'
import { i18n } from '../../../../config'
import { Show } from '../../../Form'

/**
 * Row represents a row of summary information as well as the form elemens when they are
 * expanded
 */
export class Row extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      show: this.props.show
    }

    this.toggle = this.toggle.bind(this)
    this.remove = this.remove.bind(this)
  }

  toggle () {
    this.setState({
      show: !this.state.show
    })
  }

  /**
   * Triggers onRemove callback passing the index of the row item
   */
  remove () {
    if (this.props.onRemove) {
      this.props.onRemove(this.props.index)
    }
  }

  render () {
    const klassOpen = this.state.show === true ? 'open' : 'closed'
    const klassLast = this.props.last === true ? 'last' : ''

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
          <div className={`row gutters ${klassOpen} ${klassLast}`.trim()}>
            <a href="javascript:;;" className="toggle" onClick={this.toggle}>
              <div className="brief">
                { this.props.header }
              </div>
              <div className="expander">
                <i className={`fa fa-chevron-${this.state.show === true ? 'up' : 'down'} fa-2`} aria-hidden="true"></i>
              </div>
            </a>
            <Show when={this.props.hasErrors === true && this.props.errorMessage}>
              <div className="incomplete gutters">{this.props.errorMessage}</div>
            </Show>
          </div>
          <div className={`divider gutters ${klassOpen} ${klassLast}`.trim()}>
            <hr />
          </div>
        </div>
        <div className={`details gutters ${this.state.show === true ? '' : 'hidden'}`.trim()}>
          <div className="byline top">
            <a href="javascript:;;" className="remove" onClick={this.remove}>
              <span>{i18n.t('collection.remove')}</span>
              <i className="fa fa-times-circle" aria-hidden="true"></i>
            </a>
          </div>
          { this.state.show && this.props.children }
        </div>
      </div>
    )
  }
}

Row.defaultProps = {
  show: false
}
