import React from 'react'
import PropTypes from 'prop-types'
import { newGuid } from '../ValidationElement'
import Modal from '../Modal'

export default class Suggestions extends React.Component {
  /**
   * Use a suggestion given.
   */
  useSuggestion = (suggestion) => {
    const { onSuggestion } = this.props
    onSuggestion(suggestion)
  }

  /**
   * This allows the user to bypass the suggestions and add something else
   * we have never seen before.
   */
  dismissSuggestions = (action = 'dismiss') => {
    const { onDismiss } = this.props
    onDismiss(action)
  }

  /**
   * Return the possible suggestions or an empty value if there is nothing to present.
   */
  suggestions = () => {
    const {
      suggestions, suggestionLabel, renderSuggestion, suggestionUseLabel,
    } = this.props
    return suggestions.map(suggestion => (
      <div className="suggestion" key={newGuid()}>
        <div className="value">
          <h5>{suggestionLabel}</h5>
          {renderSuggestion(suggestion)}
        </div>
        <div className="action">
          <button
            type="button"
            className="suggestion-btn"
            onClick={this.useSuggestion}
          >
            <span>{suggestionUseLabel}</span>
            <i className="fa fa-arrow-circle-right" />
          </button>
        </div>
      </div>
    ))
  }

  alternate = () => {
    const { suggestionDismissAlternate } = this.props
    if (suggestionDismissAlternate) {
      return (
        <a
          href="javascript:;;;"
          className="right"
          onClick={() => this.dismissSuggestions('alternate')}
        >
          <span>{suggestionDismissAlternate}</span>
          <i className="fa fa-arrow-circle-right" />
        </a>
      )
    }

    return null
  }

  render() {
    const {
      className, show, suggestionTitle, suggestionParagraph, suggestionDismissContent, suggestionDismissLabel,
    } = this.props

    return (
      <Modal
        show={show}
        closeable={true}
        onDismiss={() => this.dismissSuggestions('modal')}
        className="suggestions"
      >
        <h3>{suggestionTitle}</h3>
        {suggestionParagraph}

        <div className={className}>
          {this.suggestions()}
          <div className="dismiss">
            {suggestionDismissContent}
            <a
              href="javascript:;;;"
              onClick={() => this.dismissSuggestions('dismiss')}
            >
              <span>{suggestionDismissLabel}</span>
              <i className="fa fa-arrow-circle-right" />
            </a>
            {this.alternate()}
          </div>
        </div>
      </Modal>
    )
  }
}

Suggestions.propTypes = {
  suggestions: PropTypes.array,
  suggestionTitle: PropTypes.string,
  suggestionParagraph: PropTypes.string,
  suggestionLabel: PropTypes.string,
  suggestionDismissLabel: PropTypes.string,
  suggestionDismissContent: PropTypes.string,
  suggestionDismissAlternate: PropTypes.string,
  suggestionUseLabel: PropTypes.string,
  className: PropTypes.string,
  show: PropTypes.bool,
  renderSuggestion: PropTypes.func,
  onSuggestion: PropTypes.func,
  onDismiss: PropTypes.func,
}

Suggestions.defaultProps = {
  suggestions: [],
  suggestionTitle: '',
  suggestionParagraph: '',
  suggestionLabel: '',
  suggestionDismissLabel: '',
  suggestionDismissContent: '',
  suggestionDismissAlternate: '',
  suggestionUseLabel: '',
  className: '',
  show: false,
  renderSuggestion: () => {},
  onSuggestion: () => {},
  onDismiss: () => {},
}
