import React from 'react'
import { i18n } from '../../../config'
import Modal from '../Modal'

const ACTION_SPIN = 'spin'
const ACTION_SHRINK = 'shrink'
const ACTION_GROW = 'grow'

export const SpinnerAction = {
  Spin: ACTION_SPIN,
  Shrink: ACTION_SHRINK,
  Grow: ACTION_GROW
}

export default class Spinner extends React.Component {
  render() {
    // Append on any classes passed down
    const klass = `spinner ${this.props.className}`.trim()
    const klassIcon = `spinner-icon ${
      this.props.action === ACTION_GROW ? 'hidden' : this.props.action
    }`
    const klassCheck = `fa ${this.props.icon} ${
      this.props.action === ACTION_GROW ? 'grow' : 'hidden'
    }`

    // When there is nothing special do the status quo
    return (
      <Modal show={this.props.show} className={klass}>
        <div className={klassIcon}>{this.props.label}</div>
        <i className={klassCheck} aria-hidden="false" />
        <span className="spinner-label">{this.props.label}</span>
      </Modal>
    )
  }
}

Spinner.defaultProps = {
  className: '',
  show: false,
  action: ACTION_SPIN,
  label: i18n.t('spinner.label'),
  icon: 'fa-check-circle'
}
