import React from 'react'
import { Help } from '../Help'
import { newGuid } from '../ValidationElement'

export default class Suggestions extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      dismissSuggestions: props.dismissSuggestions
    }

    this.dismissSuggestions = this.dismissSuggestions.bind(this)
  }

  /**
   * Use a suggestion given.
   */
  useSuggestion (suggestion) {
    this.props.onSuggestion(suggestion)
  }

  /**
   * This allows the user to bypass the suggestions and add something else
   * we have never seen before.
   */
  dismissSuggestions () {
    this.setState({ dismissSuggestions: true }, () => {
      this.props.onDismiss()
    })
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
        <div className="modal">
          <div className="suggestions-wrap">
            <div className="suggestions modal-content">
              <h3>{this.props.suggestionTitle}</h3>
              {this.props.suggestionParagraph}
              <div className={klass}>
                <Help>
                  {this.suggestions()}
                  <div className="dismiss">
                    {this.props.suggestionDismissContent}
                    <a href="javascript:;;" onClick={this.dismissSuggestions}>
                      <span>{this.props.suggestionDismissLabel}</span>
                      <i className="fa fa-arrow-circle-right"></i>
                    </a>
                  </div>
                </Help>
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
