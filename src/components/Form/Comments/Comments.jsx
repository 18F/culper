import React from 'react'
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

  render () {
    if (!this.state.visible) {
      return (
        <div className="comments">
          <a href="javascript:;;" onClick={this.toggle} className="add">
            <span>Add comment</span>
            <i className="fa fa-plus-circle"></i>
          </a>
        </div>

      )
    }

    return (
      <div className="comments">
        <Textarea name="comments"
                  {...this.props}
                  value={this.state.value}
                  />
        <a href="javascript:;;" onClick={this.toggle} className="remove">
          <span>Remove comment</span>
          <i className="fa fa-times-circle"></i>
        </a>
      </div>
    )
  }
}
