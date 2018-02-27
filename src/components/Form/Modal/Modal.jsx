import React from 'react'
import Svg from '../Svg'

export const applyFixedModal = (open = false) => {
  if (!window || !window.document || !window.document.body) {
    return
  }

  let klassBody = window.document.body.className

  if (open) {
    if (klassBody.indexOf('modal-open') === -1) {
      klassBody += ' modal-open'
    }
  } else {
    if (klassBody.indexOf('modal-open') !== -1) {
      klassBody = klassBody.replace('modal-open', '')
    }
  }

  window.document.body.className = klassBody.trim()
}

export default class Modal extends React.Component {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.doNothing = this.doNothing.bind(this)
    this.dismiss = this.dismiss.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      show: this.props.show,
      ...queue
    })
  }

  /**
   * Clicking on a non-clickable element withing the modal-content is deemed non-dismissive.
   *
   * However, we need to stop propagation of the click event so the modal itself does not
   * dismiss it in this use case.
   */
  doNothing (event) {
    event.stopPropagation()

    if (event.nativeElement) {
      event.nativeEvent.stopImmediatePropagation()
    }
  }

  /**
   * This allows the user to bypass the suggestions and add something else
   * we have never seen before.
   */
  dismiss () {
    if (this.props.closeable) {
      this.update({
        show: false
      })

      this.props.onDismiss()
    }
  }

  closer () {
    if (this.props.closeable) {
      return (
        <a role="button" className="modal-close" href="javascript:;;" title="Click to close" onClick={this.dismiss}>
          <Svg src="/img/close-icon.svg" />
        </a>
      )
    }

    return null
  }

  render () {
    applyFixedModal(this.props.show)

    if (!this.props.show) {
      return null
    }

    // Append on any classes passed down
    const klass = `modal-content ${this.props.className}`.trim()

    // When there is nothing special do the status quo
    return (
      <div className="modal" role="dialog" aria-hidden="false" onClick={this.dismiss}>
        <div className="modal-wrap">
          <div className={klass} onClick={this.doNothing}>
            {this.closer()}
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

Modal.defaultProps = {
  className: '',
  show: false,
  closeable: false,
  onUpdate: (queue) => {},
  onDismiss: () => {}
}
