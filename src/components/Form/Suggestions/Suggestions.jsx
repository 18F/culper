import React from 'react'
import { newGuid } from '../ValidationElement'
import Svg from '../Svg'

export const applyFixedModal = (open) => {
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

export default class Suggestions extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      dismissSuggestions: props.dismissSuggestions
    }

    this.doNothing = this.doNothing.bind(this)
    this.dismissSuggestions = this.dismissSuggestions.bind(this)
  }

  componentWillReceiveProps (next) {
    if (next.show || next.suggestions.length) {
      applyFixedModal(true)
    }
  }

  /**
   * Use a suggestion given.
   */
  useSuggestion (suggestion) {
    applyFixedModal(false)
    this.props.onSuggestion(suggestion)
  }

  /**
   * This allows the user to bypass the suggestions and add something else
   * we have never seen before.
   */
  dismissSuggestions () {
    this.setState({ dismissSuggestions: true }, () => {
      applyFixedModal(false)
      this.props.onDismiss()
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
   * Return the possible suggestions or an empty value if there is nothing to present.
   *
   *  - Assign the property `withSuggestions` to turn this feature on
   */
  suggestions () {
    return this.props.suggestions.map(suggestion => {
      return (
        <div className="suggestion" key={newGuid()}>
          <div className="value">
            <h5>{this.props.suggestionLabel}</h5>
            {this.props.renderSuggestion(suggestion)}
          </div>
          <div className="action">
            <button className="suggestion-btn" onClick={this.useSuggestion.bind(this, suggestion)}>
              <span>{this.props.suggestionUseLabel}</span>
              <i className="fa fa-arrow-circle-right"></i>
            </button>
          </div>
        </div>
      )
    })
  }

  visible () {
    return this.props.show || (!this.props.dismissSuggestions && this.props.withSuggestions && this.props.suggestions.length > 0)
  }

  alternate () {
    if (this.props.suggestionDismissAlternate) {
      return (
        <a href="javascript:;;" className="right" onClick={this.dismissSuggestions}>
          <span>{this.props.suggestionDismissAlternate}</span>
          <i className="fa fa-arrow-circle-right"></i>
        </a>
      )
    }

    return null
  }

  render () {
    if (!this.visible()) {
      return this.props.children
    }

    // Append on any classes passed down
    const klass = `${this.props.className || ''}`.trim()

    // When there is nothing special do the status quo
    return (
      <div>
        {this.props.children}
        <div className="modal" onClick={this.dismissSuggestions}>
          <div className="modal-wrap">
            <div className="suggestions modal-content" onClick={this.doNothing}>
              <a href="javascript:;;" title="Click to close" onClick={this.dismissSuggestions}>
                <Svg src="/img/close-icon.svg" />
              </a>

              <h3>{this.props.suggestionTitle}</h3>
              {this.props.suggestionParagraph}
              <div className={klass}>
                {this.suggestions()}
                <div className="dismiss">
                  {this.props.suggestionDismissContent}
                  <a href="javascript:;;" onClick={this.dismissSuggestions}>
                    <span>{this.props.suggestionDismissLabel}</span>
                    <i className="fa fa-arrow-circle-right"></i>
                  </a>
                  {this.alternate()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Suggestions.defaultProps = {
  suggestionTitle: '',
  suggestionParagrah: '',
  suggestionLabel: '',
  suggestionDismissLabel: '',
  suggestionDismissAlternate: '',
  suggestionUseLabel: '',
  dismissSuggestions: false,
  withSuggestions: false,
  suggestions: [],
  className: '',
  show: false,
  renderSuggestion: () => {
    console.warn('*********************************Missing handler for renderSuggestion')
  },
  onSuggestion: () => {
    console.warn('Missing handler for onSuggestion')
  },
  onDismiss: () => {
    console.warn('Missing handler for onDismiss')
  }
}
