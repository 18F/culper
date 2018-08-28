import React from 'react'
import { newGuid } from '../ValidationElement'
import Modal from '../Modal'

export default class Suggestions extends React.Component {
  constructor(props) {
    super(props)
    this.dismissSuggestions = this.dismissSuggestions.bind(this)
  }

  /**
   * Use a suggestion given.
   */
  useSuggestion(suggestion) {
    this.props.onSuggestion(suggestion)
  }

  /**
   * This allows the user to bypass the suggestions and add something else
   * we have never seen before.
   */
  dismissSuggestions(action = 'dismiss') {
    this.props.onDismiss(action)
  }

  /**
   * Return the possible suggestions or an empty value if there is nothing to present.
   */
  suggestions() {
    return this.props.suggestions.map(suggestion => {
      return (
        <div className="suggestion" key={newGuid()}>
          <div className="value">
            <h5>{this.props.suggestionLabel}</h5>
            {this.props.renderSuggestion(suggestion)}
          </div>
          <div className="action">
            <button
              className="suggestion-btn"
              onClick={this.useSuggestion.bind(this, suggestion)}>
              <span>{this.props.suggestionUseLabel}</span>
              <i className="fa fa-arrow-circle-right" />
            </button>
          </div>
        </div>
      )
    })
  }

  alternate() {
    if (this.props.suggestionDismissAlternate) {
      return (
        <a
          href="javascript:;;"
          className="right"
          onClick={this.dismissSuggestions.bind(this, 'alternate')}>
          <span>{this.props.suggestionDismissAlternate}</span>
          <i className="fa fa-arrow-circle-right" />
        </a>
      )
    }

    return null
  }

  render() {
    // Append on any classes passed down
    const klass = `${this.props.className}`.trim()

    // When there is nothing special do the status quo
    return (
      <Modal
        show={this.props.show}
        closeable={true}
        onDismiss={this.dismissSuggestions.bind(this, 'modal')}
        className="suggestions">
        <h3>{this.props.suggestionTitle}</h3>
        {this.props.suggestionParagraph}

        <div className={klass}>
          {this.suggestions()}
          <div className="dismiss">
            {this.props.suggestionDismissContent}
            <a
              href="javascript:;;"
              onClick={this.dismissSuggestions.bind(this, 'dismiss')}>
              <span>{this.props.suggestionDismissLabel}</span>
              <i className="fa fa-arrow-circle-right" />
            </a>
            {this.alternate()}
          </div>
        </div>
      </Modal>
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
  suggestions: [],
  className: '',
  show: false,
  renderSuggestion: suggestion => {},
  onSuggestion: suggestion => {},
  onDismiss: () => {}
}
