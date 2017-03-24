import React from 'react'
import { i18n } from '../../../config'
import Textarea from '../Textarea'
import ValidationElement from '../ValidationElement'

export default class Comments extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      value: this.props.value,
      visible: this.props.visible,
      errors: []
    }

    this.toggle = this.toggle.bind(this)
    this.visible = this.visible.bind(this)
  }

  toggle () {
    let future = !this.visible()
    let value = future ? this.state.value : ''
    this.setState({ visible: future, value: value }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate(this.state.value)
      }
    })
  }

  visible () {
    return this.state.value || this.state.visible || this.props.visible
  }

  handleChange (event) {
    this.setState({ value: event.target.value }, () => {
      super.handleChange(event)
      if (this.props.onUpdate) {
        this.props.onUpdate(this.state.value)
      }
    })
  }

  getTitle () {
    if (!this.props.title) {
      return ''
    }

    return (
      <h4>{this.props.title}</h4>
    )
  }

  render () {
    const klass = `comments ${this.props.className || ''}`.trim()

    if (!this.visible()) {
      return (
        <div className="comments">
          {this.props.children}
          <div className={klass}>
            <a href="javascript:;;" onClick={this.toggle} className="add-comment">
              <span>{i18n.t(this.props.addLabel)}</span>
              <i className="fa fa-plus-circle"></i>
            </a>
          </div>
        </div>
      )
    }

    return (
      <div className="comments active">
        {this.props.children}
        {this.getTitle()}
        <Textarea name="comments"
                  {...this.props}
                  onChange={this.handleChange}
                  value={this.state.value}
                  />
        <div className={klass}>
          <a href="javascript:;;" onClick={this.toggle} className="remove-comment">
            <span>{i18n.t(this.props.removeLabel)}</span>
            <i className="fa fa-times-circle"></i>
          </a>
        </div>
      </div>
    )
  }
}

Comments.defaultProps = {
  value: '',
  visible: false,
  title: '',
  addLabel: 'comments.add',
  removeLabel: 'comments.remove'
}
