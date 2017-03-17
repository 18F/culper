import React from 'react'
import { i18n } from '../../../config'
import ValidationElement from '../ValidationElement'

const openState = (item = {}) => {
  return `${item.open ? 'open' : 'close'}`
}

const chevron = (item = {}) => {
  return `toggle fa fa-chevron-${item.open ? 'up' : 'down'}`
}

export default class Accordion extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.add = this.add.bind(this)
    this.updateChild = this.updateChild.bind(this)
    this.summary = this.summary.bind(this)
    this.details = this.details.bind(this)
    this.content = this.content.bind(this)
  }

  /**
   * On the initial mount we need to make sure there are key pieces of information
   * present. If they are not (this may be due to coming from persisted data) assign
   * them appropriately.
   */
  componentWillMount () {
    let dirty = false

    let items = [...this.props.items]
    if (items.length < this.props.minimum) {
      for (let i = 0; this.props.minimum - items.length > 0; i++) {
        dirty = true
        items.push({
          uuid: super.guid(),
          open: true
        })
      }
    }

    items = items.map(item => {
      if (!item.uuid) {
        item.uuid = super.guid()
        dirty = true
      }

      if (item.open !== true && item.open !== false) {
        item.open = false
        dirty = true
      }

      return item
    })

    if (dirty) {
      this.update(items)
    }
  }

  /**
   * Send the updated list of items back to the parent component.
   */
  update (items) {
    if (this.props.onUpdate) {
      this.props.onUpdate(items)
    }
  }

  /**
   * Flip the `open` bit for the item.
   */
  toggle (item) {
    this.update(this.props.items.map(x => {
      if (x.uuid === item.uuid) {
        x.open = !x.open
      }

      return x
    }))
  }

  /**
   * Add a new item to the end of the current array of items while setting the
   * default states.
   */
  add () {
    this.update(this.props.items.concat([{ uuid: super.guid(), open: true }]))
  }

  /**
   * Remove the item from the array of items.
   */
  remove (item) {
    let items = this.props.items.filter(x => {
      return x.uuid !== item.uuid
    })

    if (items.length < this.props.minimum) {
      this.add()
    } else {
      this.update(items)
    }
  }

  /**
   * Update an item properties based on a child component.
   */
  updateChild (item, index, prop, value) {
    let items = [...this.props.items]
    items[index][prop] = value
    this.update(items)
  }

  /**
   * Clone the component children and provide the associated values based on the item context.
   */
  factory (item, index, children) {
    return React.Children.map(children, (child) => {
      let childProps = {}

      if (React.isValidElement(child)) {
        if (child.props.bind) {
          childProps = {...item[child.props.name]}
          childProps.onUpdate = (value) => { this.updateChild(item, index, child.props.name, value) }
          childProps.onValidate = this.props.onValidate
        }
      }

      const typeOfChildren = Object.prototype.toString.call(child.props.children)
      if (child.props.children && ['[object Object]', '[object Array]'].includes(typeOfChildren)) {
        childProps.children = this.factory(item, index, child.props.children)
      }

      return React.cloneElement(child, childProps)
    })
  }

  openText (item = {}) {
    return item.open ? this.props.closeLabel : this.props.openLabel
  }

  summary (item, index) {
    return (
      <div className="summary">
        <a className={`left ${openState(item)}`} onClick={this.toggle.bind(this, item)}>
          {this.props.summary(item, index)}
          <i className={chevron(item)} aria-hidden="true"></i>
          <span className="toggle">{this.openText(item)}</span>
        </a>
        <a className="right remove" onClick={this.remove.bind(this, item)}>
          <i className="fa fa-trash" aria-hidden="true"></i>
          <span>{this.props.removeLabel}</span>
        </a>
      </div>
    )
  }

  details (item, index) {
    return (
      <div className={`details ${openState(item)}`}>
        {this.factory(item, index, this.props.children)}
        <a className="close" onClick={this.toggle.bind(this, item)}>
          <span>{this.props.closeLabel}</span>
        </a>
      </div>
    )
  }

  /**
   * Render the indivual items in the array.
   */
  content () {
    // Ensure we have the minimum amount of items required
    return this.props.items.sort(this.props.sort).map((item, index, arr) => {
      return (
        <div className="item" key={item.uuid}>
          {this.props.customSummary(item, index, () => { return this.summary(item, index) })}
          {this.props.customDetails(item, index, () => { return this.details(item, index) })}
        </div>
      )
    })
  }

  addendum () {
    if (!this.props.appendTitle && !this.props.appendMessage) {
      return null
    }

    let title = null
    if (this.props.appendTitle) {
      title = <h2>{this.props.appendTitle}</h2>
    }

    let message = null
    if (this.props.appendMessage) {
      message = this.props.appendMessage
    }

    const klassAppend = `addendum ${this.props.appendClass}`.trim()
    return (
      <div className={klassAppend}>
        {title}
        {message}
        <button className="add usa-button-outline" onClick={this.append}>
          <span>{this.props.appendLabel}</span>
          <i className="fa fa-plus-circle"></i>
        </button>
      </div>
    )
  }

  render () {
    const klass = `accordion ${this.props.className}`.trim()
    const description = this.props.items.length < 2 ? '' : this.props.description

    return (
      <div>
        <div className={klass}>
          <strong>{description}</strong>

          <div className="items">
            {this.content()}
          </div>

          <button className="add" onClick={this.add}>
            {this.props.appendLabel}
          </button>
        </div>

        {this.addendum()}
      </div>
    )
  }
}

Accordion.defaultProps = {
  minimum: 1,
  items: [],
  className: '',
  appendTitle: '',
  appendMessage: '',
  appendClass: '',
  appendLabel: i18n.t('collection.append'),
  openLabel: i18n.t('collection.open'),
  closeLabel: i18n.t('collection.close'),
  removeLabel: i18n.t('collection.remove'),
  description: i18n.t('collection.summary'),
  sort: (a, b) => { return -1 },
  onUpdate: () => {},
  onValidate: () => {},
  summary: (item, index) => {
    return (
      <span>
        <strong>Warning:</strong> Item summary not implemented
      </span>
    )
  },
  customSummary: (item, index, callback) => {
    return callback()
  },
  customDetails: (item, index, callback) => {
    return callback()
  }
}
