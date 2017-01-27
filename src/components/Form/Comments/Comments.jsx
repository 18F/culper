import React from 'react'
import { i18n } from '../../../config'
import Textarea from '../Textarea'
import ValidationElement from '../ValidationElement'

export default class Comments extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      value: this.props.value || '',
      visible: this.props.value ? true : false,
      errors: []
    }

    this.toggle = this.toggle.bind(this)
  }

  toggle () {
    let future = !this.state.visible
    let value = future ? this.state.value : ''
    this.setState({ visible: future, value: value }, () => {
    })
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
    const klass = `${this.props.className || ''}`.trim()

    if (!this.state.visible) {
      return (
        <div class="comments">
          {this.props.children}
          <div className={klass}>
            <a href="javascript:;;" onClick={this.toggle} className="add">
              <span>{i18n.t(this.props.addLabel || 'comments.add')}</span>
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
          <a href="javascript:;;" onClick={this.toggle} className="remove">
            <span>{i18n.t(this.props.removeLabel || 'comments.remove')}</span>
            <i className="fa fa-times-circle"></i>
          </a>
        </div>
      </div>
    )
  }
}
