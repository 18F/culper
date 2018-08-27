import React from 'react'
import { i18n } from '../../../config'
import ValidationElement, { newGuid } from '../ValidationElement'
import Svg from '../Svg'
import Textarea from '../Textarea'

const message = id => {
  const noteId = `${id}.note`
  let note = i18n.m(noteId)
  if (
    Object.prototype.toString.call(note) === '[object String]' &&
    note.indexOf(noteId) > -1
  ) {
    note = ''
  } else {
    note = <em>{note}</em>
  }

  const messageId = `${id}.message`
  let message = i18n.m(messageId)
  if (
    Object.prototype.toString.call(message) === '[object String]' &&
    message.indexOf(messageId) > -1
  ) {
    message = ''
  } else {
    message = <span>{message}</span>
  }

  return (
    <div key={newGuid()} data-i18n={id}>
      <h5>{i18n.t(`${id}.title`)}</h5>
      {message}
      {note}
    </div>
  )
}

export default class Field extends ValidationElement {
  constructor(props) {
    super(props)

    this.state = {
      uuid: `field-${super.guid()}`,
      errors: props.errors,
      helpActive: props.helpActive,
      commentsActive: props.commentsActive,
      commentsValue: (props.commentsValue || {}).value || ''
    }

    this.toggleHelp = this.toggleHelp.bind(this)
    this.toggleComments = this.toggleComments.bind(this)
    this.handleError = this.handleError.bind(this)
    this.children = this.children.bind(this)
    this.errors = props.errors || []
  }

  /**
   * Handle the click event for the rendering of messages.
   */
  toggleHelp(event) {
    this.setState({ helpActive: !this.state.helpActive }, () => {
      this.scrollIntoView(this.refs.helpMessage)
    })
  }

  /**
   * Toggle the comment visibility.
   */
  toggleComments() {
    const future = !this.visibleComments()
    const value = future ? this.state.commentsValue : ''
    this.setState({ commentsActive: future, commentsValue: value }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          name: this.props.commentsName,
          value: value
        })
      }
    })
  }

  /**
   * Determines if the comments should be visible.
   */
  visibleComments() {
    return (
      this.props.comments &&
      (this.state.commentsValue ||
        this.state.commentsActive ||
        this.props.commentsActive)
    )
  }

  handleError(value, arr = []) {
    let errors = [...this.errors]
    if (arr.length === 0) {
      if (errors.length && errors.some(err => err.valid === false)) {
        this.scrollIntoView(this.refs.errorMessages)
      }
      return arr
    }

    for (const e of arr) {
      const idx = errors.findIndex(x => x.uid === e.uid && x.code === e.code)
      if (idx !== -1) {
        errors[idx] = { ...e }
      } else {
        errors.push({ ...e })
      }
    }

    // Store in instance variable to update immediately as opposed to storing in state
    // which is an asynchronous operation. This prevents the issue where one call
    // overrides the errors of another call if both are executed almost at the time same.
    this.errors = [...errors]
    this.setState({ errors: errors }, () => {
      if (errors.length && errors.some(err => err.valid === false)) {
        this.scrollIntoView(this.refs.errorMessages)
      }
    })

    return arr
  }

  /**
   * Render the title as needed
   */
  title(required = false) {
    if (this.props.title) {
      const klassTitle = `title ${this.props.titleSize}`.trim()
      const optional =
        !required && this.props.optionalText ? (
          <span className="optional">{this.props.optionalText}</span>
        ) : null

      // Apply the semantic element for accessibility
      switch (this.props.titleSize) {
        case 'h1':
          return (
            <h1 className={klassTitle}>
              {this.props.title}
              {optional}
            </h1>
          )
        case 'h2':
          return (
            <h2 className={klassTitle}>
              {this.props.title}
              {optional}
            </h2>
          )
        case 'h3':
          return (
            <h3 className={klassTitle}>
              {this.props.title}
              {optional}
            </h3>
          )
        case 'h4':
          return (
            <h4 className={klassTitle}>
              {this.props.title}
              {optional}
            </h4>
          )
        case 'h5':
          return (
            <h5 className={klassTitle}>
              {this.props.title}
              {optional}
            </h5>
          )
        case 'h6':
          return (
            <h6 className={klassTitle}>
              {this.props.title}
              {optional}
            </h6>
          )
        case 'label':
          return (
            <label className={klassTitle}>
              {this.props.title}
              {optional}
            </label>
          )
        default:
          return (
            <span className={klassTitle}>
              {this.props.title}
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
          href="javascript:;;"
          onClick={this.toggleComments}
          className="comments-button remove">
          <span>{i18n.t(this.props.commentsRemove)}</span>
          <i className="fa fa-times-circle" />
        </a>
      )
    }

    return (
      <a
        href="javascript:;;"
        onClick={this.toggleComments}
        className="comments-button add">
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
        onUpdate={this.props.onUpdate}
        onValidate={this.props.onValidate}
      />
    )
  }

  /**
   * Render the help icon if needed.
   */
  icon() {
    if (!this.props.help) {
      return null
    }

    const klass = `toggle ${this.props.titleSize} ${
      this.state.helpActive ? 'active' : ''
    } ${
      this.props.adjustFor ? `adjust-for-${this.props.adjustFor}` : ''
    }`.trim()
    const title = `Show help ${this.props.title ? 'for' : ''} ${this.props
      .title || ''}`.trim()

    return (
      <a
        href="javascript:;"
        title={title}
        aria-label={title}
        className={klass}
        onClick={this.toggleHelp}>
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
        <div className="message help">
          <i className="fa fa-question" aria-hidden="true" />
          {message(this.props.help)}
          <a
            href="javascript:;;"
            className="close"
            onClick={this.toggleHelp}
            title={i18n.t('help.close')}>
            {i18n.t('help.close')}
          </a>
        </div>
      )
    }

    return null
  }

  /**
   * Render the error messages allowing for Markdown syntax.
   */
  errorMessages() {
    let el = []
    let stateErrors = this.props.filterErrors(this.errors || [])
    let errors = stateErrors.filter(
      err =>
        err.valid === false &&
        err.code.indexOf('required') === -1 &&
        err.code.indexOf('country.notfound') === -1
    )
    const required = stateErrors
      .filter(err => err.code.indexOf('required') > -1 && err.valid === false)
      .sort((e1, e2) => {
        return e1.code.split('.').length - e2.code.split('.').length
      })

    if (required.length) {
      errors = errors.concat(required[0])
    }

    if (errors.length) {
      const markup = errors.map(err => {
        return message(`error.${err.code}`)
      })

      el.push(
        <div
          className="message error"
          key={super.guid()}
          role="alert"
          aria-live="polite">
          <i className="fa fa-exclamation" aria-hidden="true" />
          {markup}
        </div>
      )
    }

    return el
  }

  /**
   * Iterate through the children and bind methods to them.
   */
  children(el) {
    return React.Children.map(el, child => {
      if (!child || !child.props) {
        return child
      }

      let props = child.props || {}
      let extendedProps = { ...props }
      let injected = false

      if (React.isValidElement(child)) {
        // Inject ourselves in to the validation callback
        if (props.onError) {
          injected = true
          extendedProps.onError = (value, arr) => {
            return this.handleError(value, props.onError(value, arr))
          }
        }
      }

      if (props.children && !injected) {
        const typeOfChildren = Object.prototype.toString.call(props.children)
        if (
          props.children &&
          ['[object Object]', '[object Array]'].includes(typeOfChildren)
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

    const active =
      this.state.helpActive || this.errors.some(x => x.valid === false)

    if (active && this.props.scrollIntoView && notInView) {
      window.scrollBy({
        top: helpBottom - winHeight,
        left: 0,
        behavior: 'smooth'
      })
    }
  }

  render() {
    const required = !this.props.optional
    const klass = `field ${required ? 'required' : ''} ${
      this.visibleComments() ? 'with-comments' : ''
    } ${this.props.className || ''}`.trim()
    const klassComponent = `component ${
      this.props.shrink ? 'shrink' : ''
    }`.trim()

    return (
      <div
        className={klass}
        data-uuid={this.state.uuid}
        ref="field"
        aria-label={this.props.title}>
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
            ref="helpMessage"
            aria-live="polite">
            {this.helpMessage()}
          </span>
        </div>
        <div className="table">
          <span className="content">
            <span className={klassComponent}>
              {this.children(this.props.children)}
              {this.comments()}
              {this.commentsButton()}
            </span>
          </span>
        </div>
        <div className="table expand">
          <span
            className="messages error-messages"
            ref="errorMessages"
            role="alert"
            aria-live="polite">
            {this.errorMessages()}
          </span>
        </div>
      </div>
    )
  }
}

Field.defaultProps = {
  title: '',
  titleSize: 'h3',
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
  optional: false,
  optionalText: '',
  validate: true,
  shrink: false,
  scrollIntoView: true,
  filterErrors: errors => {
    return errors
  }
}
