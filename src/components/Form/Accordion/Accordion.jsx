import React from 'react'
import { i18n } from '../../../config'
import ValidationElement from '../ValidationElement'

export const openState = (item = {}, initial = false) => {
  return `${item.open ? 'open' : 'close'} ${initial ? 'static' : 'animate'}`.trim()
}

const chevron = (item = {}) => {
  return `toggle fa fa-chevron-${item.open ? 'up' : 'down'}`
}

export default class Accordion extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      initial: props.initial
    }

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
        item.open = this.props.defaultState
        dirty = true
      }

      item.open = this.props.defaultState
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

    this.setState({ initial: false })
  }

  /**
   * Create a new item with required properties.
   */
  newItem () {
    return { uuid: super.guid(), open: true }
  }

  /**
   * Add a new item to the end of the current array of items while setting the
   * default states.
   */
  add () {
    this.update(this.props.items.concat([this.newItem()]))
    this.setState({ initial: false })
  }

  /**
   * Remove the item from the array of items.
   */
  remove (item) {
    // Confirm deletion first
    if (this.props.skipWarning || window.confirm(i18n.t('collection.warning')) === true) {
      let items = this.props.items.filter(x => {
        return x.uuid !== item.uuid
      })

      if (items.length < this.props.minimum) {
        items.push(this.newItem())
      }

      this.update(items)
      this.setState({ initial: false })
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

  summary (item, index, initial = false) {
    return (
      <div>
        <div className="summary">
          <a className={`left ${openState(item, initial)}`} onClick={this.toggle.bind(this, item)}>
            <span className="button-with-icon">
              <i className={chevron(item)} aria-hidden="true"></i>
              <span className="toggle">{this.openText(item)}</span>
            </span>
            {this.props.summary(item, index, initial)}
          </a>
          <a className="right remove" onClick={this.remove.bind(this, item)}>
            <span className="button-with-icon">
              <i className="fa fa-trash" aria-hidden="true"></i>
              <span>{this.props.removeLabel}</span>
            </span>
          </a>
        </div>
        {this.props.byline(item, index, initial)}
      </div>
    )
  }

  details (item, index, initial = false) {
    return (
      <div className={`details ${openState(item, initial)}`}>
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
    const initial = this.state.initial
    return this.props.items.sort(this.props.sort).map((item, index, arr) => {
      return (
        <div className="item" key={item.uuid}>
          {this.props.customSummary(item, index, initial, () => { return this.summary(item, index, initial) })}
          {this.props.customDetails(item, index, initial, () => { return this.details(item, index, initial) })}
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
        <div className="eapp-field-wrap">
          <button className="add usa-button-outline" onClick={this.add}>
            <span>{this.props.appendLabel}</span>
            <i className="fa fa-plus-circle"></i>
          </button>
        </div>
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
  initial: true,
  skipWarning: false,
  minimum: 1,
  defaultState: true,
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
  summary: (item, index, initial = false) => {
    return (
      <span>
        <strong>Warning:</strong> Item summary not implemented
      </span>
    )
  },
  byline: (item, index, initial = false) => {
    return null
  },
  customSummary: (item, index, initial, callback) => {
    return callback()
  },
  customDetails: (item, index, initial, callback) => {
    return callback()
  }
}
