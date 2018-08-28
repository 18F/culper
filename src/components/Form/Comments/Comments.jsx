import React from 'react'
import { i18n } from '../../../config'
import Textarea from '../Textarea'
import ValidationElement from '../ValidationElement'

export default class Comments extends ValidationElement {
  constructor(props) {
    super(props)

    this.state = {
      visible: this.props.visible
    }

    this.toggle = this.toggle.bind(this)
    this.visible = this.visible.bind(this)
    this.update = this.update.bind(this)
    this.updateComments = this.updateComments.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      name: this.props.name,
      value: this.props.value,
      ...queue
    })
  }

  updateComments(values) {
    this.update({
      value: values.value
    })
  }

  toggle() {
    let future = !this.visible()
    let value = future ? this.props.value : ''
    this.setState({ visible: future }, () => {
      this.update({ value: value })
    })
  }

  visible() {
    return this.props.value || this.state.visible
  }

  getTitle() {
    if (!this.props.title) {
      return ''
    }

    return <span className="title">{this.props.title}</span>
  }

  render() {
    const klass = `comments ${this.props.className || ''}`.trim()

    if (!this.visible()) {
      return (
        <div className="comments">
          {this.props.children}
          <div className={klass}>
            <a
              href="javascript:;;"
              onClick={this.toggle}
              className="add-comment">
              <span>{i18n.t(this.props.addLabel)}</span>
              <i className="fa fa-plus-circle" />
            </a>
          </div>
        </div>
      )
    }

    return (
      <div className="comments active">
        {this.props.children}
        {this.getTitle()}
        <Textarea
          name="comments"
          {...this.props}
          onUpdate={this.updateComments}
          onError={this.props.onError}
        />
        <div className={klass}>
          <a
            href="javascript:;;"
            onClick={this.toggle}
            className="remove-comment">
            <span>{i18n.t(this.props.removeLabel)}</span>
            <i className="fa fa-times-circle" />
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
  removeLabel: 'comments.remove',
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  }
}

Comments.errors = []
