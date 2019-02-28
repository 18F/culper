/* eslint jsx-a11y/anchor-is-valid: 0 */
/* eslint jsx-a11y/anchor-has-content: 0 */
/* eslint no-script-url: 0 */

import React from 'react'
import classnames from 'classnames'

import { i18n } from 'config'

import ValidationElement, { newGuid } from 'components/Form/ValidationElement'
import Svg from 'components/Form/Svg'
import Textarea from 'components/Form/Textarea'

const renderMessage = (id, messageString, titleString) => {
  const noteId = `${id}.note`
  let note = i18n.m(noteId)
  if (
    Object.prototype.toString.call(note) === '[object String]'
    && note.indexOf(noteId) > -1
  ) {
    note = ''
  } else {
    note = <em>{note}</em>
  }

  const messageId = `${id}.message`
  let message = messageString || i18n.m(messageId)
  if (
    Object.prototype.toString.call(message) === '[object String]'
    && message.indexOf(messageId) > -1
  ) {
    message = ''
  } else {
    message = <span>{message}</span>
  }

  const title = titleString || i18n.t(`${id}.title`)

  return (
    <div key={newGuid()} data-i18n={id}>
      <h5 className="usa-alert-heading">{title}</h5>
      {message}
      {note}
    </div>
  )
}

// XXX All references to `comments` in this component refer to help text / info boxes

export default class Field extends ValidationElement {
  constructor(props) {
    super(props)

    this.state = {
      uuid: `field-${super.guid()}`,
      errors: props.errors,
      helpActive: props.helpActive,
      commentsActive: props.commentsActive,
      commentsValue: (props.commentsValue || {}).value || '',
    }

    this.errorMessagesRef = null
    this.helpMessageRef = null

    this.toggleHelp = this.toggleHelp.bind(this)
    this.toggleComments = this.toggleComments.bind(this)
    this.handleError = this.handleError.bind(this)
    this.children = this.children.bind(this)
    this.errors = props.errors || []
  }

  /**
   * Handle the click event for the rendering of messages.
   */
  toggleHelp() {
    const { helpActive } = this.state
    const newHelpActive = !helpActive

    this.setState({ helpActive: newHelpActive }, () => {
      this.scrollIntoView(this.helpMessageRef)
    })
  }

  /**
   * Toggle the comment visibility.
   */
  toggleComments() {
    const { commentsValue } = this.state

    const future = !this.visibleComments()
    const value = future ? commentsValue : ''

    this.setState({
      commentsActive: future,
      commentsValue: value,
    }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          name: this.props.commentsName,
          value,
        })
      }
    })
  }

  /**
   * Determines if the comments should be visible.
   */
  visibleComments() {
    return (
      this.props.comments
      && (this.state.commentsValue
        || this.state.commentsActive
        || this.props.commentsActive)
    )
  }

  handleError(value, arr = []) {
    const errors = [...this.errors]

    if (arr.length === 0) {
      if (errors.length && errors.some(err => err.valid === false)) {
        this.scrollIntoView(this.errorMessagesRef)
      }
      return arr
    }

    arr.forEach((e) => {
      const idx = errors.findIndex(x => x.uid === e.uid && x.code === e.code)
      if (idx !== -1) {
        errors[idx] = { ...e }
      } else {
        errors.push({ ...e })
      }
    })

    // Store in instance variable to update immediately as opposed to storing in state
    // which is an asynchronous operation. This prevents the issue where one call
    // overrides the errors of another call if both are executed almost at the time same.
    this.errors = [...errors]
    this.setState({ errors }, () => {
      if (errors.length && errors.some(err => err.valid === false)) {
        this.scrollIntoView(this.errorMessagesRef)
      }
    })

    return arr
  }

  /**
   * Render the title as needed
   */
  title(required = false) {
    const { title, titleSize, optionalText } = this.props

    if (title) {
      const titleClasses = classnames('title', titleSize)

      const optional = !required && optionalText
        ? (<span className="optional">{optionalText}</span>)
        : null

      // Apply the semantic element for accessibility
      switch (titleSize) {
        case 'h1':
          return (
            <h1 className={titleClasses}>
              {title}
              {optional}
            </h1>
          )
        case 'h2':
          return (
            <h2 className={titleClasses}>
              {title}
              {optional}
            </h2>
          )
        case 'h3':
          return (
            <h3 className={titleClasses}>
              {title}
              {optional}
            </h3>
          )
        case 'h4':
          return (
            <h4 className={titleClasses}>
              {title}
              {optional}
            </h4>
          )
        case 'h5':
          return (
            <h5 className={titleClasses}>
              {title}
              {optional}
            </h5>
          )
        case 'h6':
          return (
            <h6 className={titleClasses}>
              {title}
              {optional}
            </h6>
          )
        case 'label':
          /* eslint jsx-a11y/label-has-associated-control: 0 */
          /* eslint jsx-a11y/label-has-for: 0 */
          return (
            <label className={titleClasses}>
              {title}
              {optional}
            </label>
          )
          /* eslint jsx-a11y/label-has-associated-control: 1 */
          /* eslint jsx-a11y/label-has-for: 1 */
        default:
          return (
            <span className={titleClasses}>
              {title}
              {optional}
            </span>
          )
      }
    }

    return null
  }

  /**
   * Render the comments toggle link if needed.
   */
  commentsButton() {
    if (!this.props.comments) {
      return null
    }

    if (this.visibleComments()) {
      return (
        <a
          href="javascript:;;;"
          onClick={this.toggleComments}
          className="comments-button remove"
        >
          <span>{i18n.t(this.props.commentsRemove)}</span>
          <i className="fa fa-times-circle" />
        </a>
      )
    }

    return (
      <a
        href="javascript:;;;"
        onClick={this.toggleComments}
        className="comments-button add"
      >
        <span>{i18n.t(this.props.commentsAdd)}</span>
        <i className="fa fa-plus-circle" />
      </a>
    )
  }

  /**
   * Render the comments if necessary.
   */
  comments() {
    if (!this.props.comments || !this.visibleComments()) {
      return null
    }

    return (
      <Textarea
        name={this.props.commentsName}
        value={this.state.commentsValue}
        className="comments"
        onError={this.props.onError}
        onUpdate={this.props.onUpdate}
        onValidate={this.props.onValidate}
        required={this.props.commentsRequired}
      />
    )
  }

  /**
   * Render the help icon if needed.
   */
  icon() {
    const {
      help, title, titleSize, adjustFor,
    } = this.props
    const { helpActive } = this.state

    if (!help) {
      return null
    }

    const iconClasses = classnames(
      'toggle',
      titleSize,
      {
        active: helpActive,
        [`adjust-for-${adjustFor}`]: !!adjustFor,
      },
    )

    const titleString = `Show help${title && ' for '}${title || ''}`.trim()

    return (
      <a
        href="javascript:;;;"
        title={titleString}
        aria-label={titleString}
        className={iconClasses}
        onClick={this.toggleHelp}
      >
        <Svg src="/img/info.svg" />
      </a>
    )
  }

  /**
   * Render the help messages allowing for Markdown syntax.
   */

  helpMessage() {
    if (this.state.helpActive && this.props.help) {
      return (
        <div className="usa-alert usa-alert-info" role="alert">
          <div className="usa-alert-body">
            {renderMessage(this.props.help, this.props.helpMessage, this.props.helpTitle)}
            <a href="javascript:;;;" className="close" onClick={this.toggleHelp} title={i18n.t('help.close')}>
              {i18n.t('help.close')}
            </a>
          </div>
        </div>
      )
    }

    return null
  }

  /**
   * Render the error messages allowing for Markdown syntax.
   */
  errorMessages() {
    const el = []
    const stateErrors = this.props.filterErrors(this.errors || [])
    let errors = stateErrors.filter(err => (
      err.valid === false
      && err.code.indexOf('required') === -1
      && err.code.indexOf('country.notfound') === -1
    ))

    const required = stateErrors
      .filter(err => err.code.indexOf('required') > -1 && err.valid === false)
      .sort((e1, e2) => e1.code.split('.').length - e2.code.split('.').length)

    if (required.length) {
      errors = errors.concat(required[0])
    }

    if (errors.length) {
      const markup = errors.map(err => renderMessage(`error.${err.code}`))

      el.push(
        <div className="message error usa-alert usa-alert-error" key={super.guid()} role="alert" aria-live="polite">
          <div className="usa-alert-body">
            {markup}
          </div>
        </div>,
      )
    }

    return el
  }

  /**
   * Iterate through the children and bind methods to them.
   */
  children(el) {
    return React.Children.map(el, (child) => {
      if (!child || !child.props) {
        return child
      }

      const props = child.props || {}
      const extendedProps = { ...props }
      let injected = false

      if (React.isValidElement(child)) {
        // Inject ourselves in to the validation callback
        if (props.onError) {
          injected = true
          extendedProps.onError = (value, arr) => this.handleError(value, props.onError(value, arr))
        }
      }

      if (props.children && !injected) {
        const typeOfChildren = Object.prototype.toString.call(props.children)
        if (props.children
          && ['[object Object]', '[object Array]'].includes(typeOfChildren)
        ) {
          extendedProps.children = this.children(props.children)
        }
      }

      return React.cloneElement(child, extendedProps)
    })
  }

  /**
   * Checks if the children and help message are within the current viewport. If not, scrolls the
   * help message into view so that users can see the message without having to manually scroll.
   */
  scrollIntoView(ref) {
    if (!ref) {
      return
    }

    // Grab the bottom position for the help container
    const helpBottom = ref.getBoundingClientRect().bottom

    // Grab the current window height
    const winHeight = window.innerHeight

    // Flag if help container bottom is within current viewport
    const notInView = winHeight < helpBottom

    const active = this.state.helpActive || this.errors.some(x => x.valid === false)

    if (active && this.props.scrollIntoView && notInView) {
      window.scrollBy({
        top: helpBottom - winHeight,
        left: 0,
        behavior: 'smooth',
      })
    }
  }

  render() {
    const { optional, className, shrink } = this.props

    const required = !optional

    const classes = classnames(
      'field',
      {
        required,
        'with-comments': this.visibleComments(),
      },
      className,
    )

    const componentClasses = classnames(
      'component',
      {
        shrink,
      },
    )

    /* eslint jsx-a11y/anchor-has-content: 0 */
    /* eslint jsx-a11y/anchor-is-valid: 0 */
    return (
      <div
        className={classes}
        data-uuid={this.state.uuid}
        ref={(el) => { this.field = el }}
        aria-label={this.props.title}
      >
        <a
          id={this.state.uuid}
          name={this.state.uuid}
          className="anchor"
          aria-hidden="true"
        />
        {this.title(required)}
        <span className="icon">{this.icon()}</span>
        <div className="table expand">
          <span
            className="messages help-messages"
            ref={(el) => { this.helpMessageRef = el }}
            aria-live="polite"
          >

            {this.helpMessage()}
          </span>
        </div>
        <div className="table expand">
          <span
            className="messages error-messages"
            ref={(el) => { this.errorMessagesRef = el }}
            role="alert"
            aria-live="polite"
          >
            {this.errorMessages()}
          </span>
        </div>
        <div className="table">
          <span className="content">
            <span className={componentClasses}>
              {this.children(this.props.children)}
              {this.comments()}
              {this.commentsButton()}
            </span>
          </span>
        </div>
      </div>
    )
  }
}

Field.defaultProps = {
  title: '',
  titleSize: 'h4',
  className: '',
  errors: [],
  errorPrefix: '',
  help: '',
  helpActive: false,
  adjustFor: '',
  comments: false,
  commentsName: 'Comments',
  commentsValue: {},
  commentsActive: false,
  commentsAdd: 'comments.add',
  commentsRemove: 'comments.remove',
  commentsRequired: false,
  optional: false,
  optionalText: '',
  validate: true,
  shrink: false,
  scrollIntoView: true,
  filterErrors: errors => errors,
}
