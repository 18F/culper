import React from 'react'
import { i18n } from '../../../config'
import ValidationElement from '../ValidationElement'
import Svg from '../Svg'
import Textarea from '../Textarea'

export default class Field extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      errors: props.errors,
      helpActive: props.helpActive,
      commentsActive: props.commentsActive,
      commentsValue: (props.commentsValue || {}).value || ''
    }

    this.toggleHelp = this.toggleHelp.bind(this)
    this.toggleComments = this.toggleComments.bind(this)
    this.handleError = this.handleError.bind(this)
    this.children = this.children.bind(this)

    this.errors = []
  }

  /**
   * Handle the click event for the rendering of messages.
   */
  toggleHelp (event) {
    this.setState({ helpActive: !this.state.helpActive }, () => {
      this.scrollIntoView()
    })
  }

  /**
   * Toggle the comment visibility.
   */
  toggleComments () {
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
  visibleComments () {
    return this.props.comments && (this.state.commentsValue || this.state.commentsActive || this.props.commentsActive)
  }

  handleError (value, arr = []) {
    let errors = [...this.errors]
    if (arr.length === 0) {
      if (errors.length && errors.some(err => err.valid === false)) {
        this.scrollIntoView()
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

    // Explain this...
    this.errors = [...errors]
    this.setState({ errors: errors }, () => {
      if (errors.length && errors.some(err => err.valid === false)) {
        this.scrollIntoView()
      }
    })

    return arr
  }

  /**
   * Render the title as needed
   */
  title () {
    if (this.props.title) {
      const klassTitle = `title ${this.props.titleSize}`.trim()
      return <span className={klassTitle}>{this.props.title}</span>
    }

    return null
  }

  /**
   * Render the comments toggle link if needed.
   */
  commentsButton () {
    if (!this.props.comments) {
      return null
    }

    if (this.visibleComments()) {
      return (
        <a href="javascript:;;" onClick={this.toggleComments} className="comments-button remove">
          <span>{i18n.t(this.props.commentsRemove)}</span>
          <i className="fa fa-times-circle"></i>
        </a>
      )
    }

    return (
      <a href="javascript:;;" onClick={this.toggleComments} className="comments-button add">
        <span>{i18n.t(this.props.commentsAdd)}</span>
        <i className="fa fa-plus-circle"></i>
      </a>
    )
  }

  /**
   * Render the comments if necessary.
   */
  comments () {
    if (!this.props.comments || !this.visibleComments()) {
      return null
    }

    return (
      <Textarea name={this.props.commentsName}
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
  icon () {
    if (!this.props.help) {
      return null
    }

    const klass = `toggle ${this.state.helpActive ? 'active' : ''} ${this.props.adjustFor ? `adjust-for-${this.props.adjustFor}` : ''}`.trim()

    return (
      <a href="javascript:;"
         tabIndex="-1"
         title="Show help"
         className={klass}
         onClick={this.toggleHelp}>
        <Svg src="/img/info.svg" />
      </a>
    )
  }

  /**
   * Render the help and error messages allowing for Markdown syntax.
   */
  messages () {
    let el = []

    const message = (id) => {
      const noteId = `${id}.note`
      let note = i18n.m(noteId)
      if (Object.prototype.toString.call(note) === '[object String]' && note.indexOf(noteId) > -1) {
        note = ''
      } else {
        note = <em>{note}</em>
      }

      return (
        <div key={super.guid()}>
          <h5>{i18n.t(`${id}.title`)}</h5>
          {i18n.m(`${id}.message`)}
          {note}
        </div>
      )
    }

    let errors = (this.state.errors || []).filter(err => err.valid === false && err.code.indexOf('required') === -1)
    const required = this.state.errors
      .filter(err => err.code.indexOf('required') > -1 && err.valid === false)
      .sort((e1, e2) => {
        return e1.code.split('.').length - e2.code.split('.').length
      })

    if (required.length) {
      errors = errors.concat(required[0])
    }

    console.log('errors: ', errors)

    if (errors.length) {
      const markup = errors.map(err => {
        return message(`error.${err.code}`)
      })

      el.push(
        <div className="message error" key={super.guid()}>
          <i className="fa fa-exclamation"></i>
          {markup}
        </div>
      )
    }

    if (this.state.helpActive && this.props.help) {
      el.push(
        <div className="message help" key={super.guid()}>
          <i className="fa fa-question"></i>
          {message(this.props.help)}
          <a href="javascript:;;" className="close" onClick={this.toggleHelp}>
            {i18n.t('help.close')}
          </a>
        </div>
      )
    }

    return el
  }

  /**
   * Iterate through the children and bind methods to them.
   */
  children (el) {
    return React.Children.map(el, (child) => {
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
        if (props.children && ['[object Object]', '[object Array]'].includes(typeOfChildren)) {
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
  scrollIntoView () {
    if (!this.refs.messages) {
      return
    }

    // Grab the bottom position for the help container
    const helpBottom = this.refs.messages.getBoundingClientRect().bottom

    // Grab the current window height
    const winHeight = window.innerHeight

    // Flag if help container bottom is within current viewport
    const notInView = (winHeight < helpBottom)

    const active = this.state.helpActive || this.state.errors.some(x => x.valid === false)

    if (active && this.props.scrollIntoView && notInView) {
      window.scrollBy({ top: (helpBottom - winHeight), left: 0, behavior: 'smooth' })
    }
  }

  render () {
    const klass = `field ${this.visibleComments() ? 'with-comments' : ''} ${this.props.className || ''}`.trim()
    const klassComponent = `component ${this.props.shrink ? 'shrink' : ''}`.trim()

    return (
      <div className={klass} ref="field">
        {this.title()}
        <div className="table">
          <span className="content">
            <span className="icon">
              {this.icon()}
            </span>
            <span className={klassComponent}>
              {this.children(this.props.children)}
              {this.comments()}
              {this.commentsButton()}
            </span>
          </span>
        </div>
        <div className="table expand">
          <span className="messages" ref="messages">
            {this.messages()}
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
  validate: true,
  shrink: false,
  scrollIntoView: true
}
