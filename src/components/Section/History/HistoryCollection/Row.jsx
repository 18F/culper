import React from 'react'
import { i18n } from '../../../../config'
import { Svg, Show } from '../../../Form'

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
        <Show when={this.props.first === true}>
          <div className="summary caption">
              <div className="title">
                <h4>{i18n.t('collection.summary')}</h4>
                <hr />
              </div>
          </div>
        </Show>
        <div className={`summary ${klassOpen} ${klassLast}`.trim()}>
          <a href="javascript:;;" className="toggle" onClick={this.toggle.bind(this)}>
            <div className="brief">
              { this.props.header }
            </div>
            <div className="expander">
              <i className={`fa fa-chevron-${this.state.show === true ? 'up' : 'down'} fa-2`} aria-hidden="true"></i>
            </div>
          </a>
          <div className="divider">
            <hr />
          </div>
        </div>
        <div className={`details gutters ${this.state.show === true ? '' : 'hidden'}`.trim()}>
          <div className="byline top">
            <a href="javascript:;;" className="remove" onClick={this.remove.bind(this)}>
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

/**
 * Renders a formatted gap row
 */
export const Gap = (props) => {
  let title = ''
  let btnText = ''
  let para = ''

  switch (props.type) {
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

  return (
    <div className="item">
      <Show when={props.first === true}>
        <div className="summary caption">
          <div className="title">
            <h4>{i18n.t('collection.summary')}</h4>
            <hr />
          </div>
        </div>
      </Show>
      <div className="summary pre">
        <div className="help">
          <div className="message eapp-error-message">
            <i className="fa fa-exclamation"></i>
            <span className="dates">{`${props.dates.from.getMonth()}/${props.dates.from.getFullYear()}-${props.dates.to.getMonth()}/${props.dates.to.getFullYear()}`}</span>
            <h4>{title}</h4>
            <p>{para}</p>
            <button className="usa-button-outline">
              <span>{btnText}</span>
              <i className="fa fa-plus-circle"></i>
            </button>
          </div>
        </div>
        <div className="divider">
          <hr />
        </div>
      </div>
    </div>
  )
}
