import React from 'react'
import { i18n } from '../../../config'
import ValidationElement from '../ValidationElement'
import Branch from '../Branch'
import { findPosition } from '../../../middleware/history'

export const openState = (item = {}, initial = false) => {
  return `${item.open ? 'open' : 'close'} ${initial ? 'static' : 'animate'}`.trim()
}

export const chevron = (item = {}) => {
  return `toggle fa fa-chevron-${item.open ? 'up' : 'down'}`
}

export const doScroll = (first, item, scrollTo) => {
  if (!first || !item || !scrollTo) {
    return
  }

  // Get the position of the element we want to be visible
  const pos = findPosition(document.getElementById(item.uuid))[0]

  // Get the top most point we want to display at least on the first addition
  const top = findPosition(scrollTo)[0]

  // Find the offset from the top most element to the first item in the accordion for
  // a fixed offset to constantly be applied
  const offset = findPosition(document.getElementById(first))[0] - top

  // This is the additional offset for bike shedding
  const offsetDeux = 130

  // Scroll to that position
  window.scroll({ top: pos - offset - offsetDeux, left: 0, behavior: 'smooth' })
}

export default class Accordion extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      initial: props.initial,
      scrollToId: ''
    }

    this.getItems = this.getItems.bind(this)
    this.update = this.update.bind(this)
    this.add = this.add.bind(this)
    this.updateChild = this.updateChild.bind(this)
    this.updateAddendum = this.updateAddendum.bind(this)
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
    let items = this.getItems()

    if (items.length !== this.props.items.length) {
      dirty = true
    }

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
   * When the component recieves an update we need to check if it is necessary to scroll an
   * item in to view.
   */
  componentDidUpdate () {
    if (!this.state.scrollToId || this.state.initial) {
      return
    }

    // Capture the UUID in a constant variable to ensure we don't lose scope
    const id = this.state.scrollToId

    // Reset the values to prohibit multiple calls due to various
    // asynchronous behaviours potentially coming from outside this
    // component
    this.setState({ initial: false, scrollToId: '' }, () => {
      // Find the item by UUID instead of index because we can't true the index
      // will always be the same
      const item = this.props.items.filter(x => x.uuid === id)[0]

      // Calculate a magic number to phase the timeout value. This always
      // for any CSS keyframe animations or transitions to take place prior
      // to finding coordinates.
      const index = this.props.items.findIndex(x => x.uuid === id)
      const sindex = index < 0 ? 0 : index
      const shift = (sindex / 10) * 0.3142
      const timeout = this.props.timeout + (this.props.timeout * shift)

      // Get the element to which we should scroll to
      const scrollTo = this.props.scrollTo
            ? document.getElementById(this.props.scrollTo)
            : this.refs.accordion

      // Get the identifier to the first item
      const first = this.props.items[0].uuid

      if (timeout === 0) {
        doScroll(first, item, scrollTo)
      } else {
        window.setTimeout(() => { doScroll(first, item, scrollTo) }, timeout)
      }
    })
  }

  /**
   * Create a new item with required properties.
   */
  newItem () {
    return { uuid: super.guid(), open: true }
  }

  /**
   * Perform any injections or sorting to the list as deemed necessary.
   */
  getItems (skipInnoculation = false) {
    // If this has realtime enabled then we always perform sorting and
    // additional injections.
    //
    // If it is not realtime but still the first entry in to the accordion
    // then we do the same.
    //
    // If we have been previously infected then assume we still are.
    const infected = this.props.realtime || this.state.initial || this.props.items.some(item => item.type && item.type === 'Gap')

    // If we are infected then inject the anecdote.
    const innoculated = infected && !skipInnoculation
          ? this.props.inject([...this.props.items])
          : [...this.props.items]

    // If we are not in a dirty environment and have a sorting function then
    // apply order.
    return this.props.sort && infected
      ? innoculated.sort(this.props.sort)
      : innoculated
  }

  /**
   * Send the updated list of items back to the parent component.
   */
  update (items, branch) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        branch: branch,
        items: items
      })
    }
  }

  /**
   * Flip the `open` bit for the item.
   */
  toggle (item) {
    const items = [...this.props.items].map(x => {
      if (x.uuid === item.uuid) {
        x.open = !x.open
      }

      return x
    })

    this.update(items, this.props.branch)
    this.setState({ initial: false, scrollToId: '' })
  }

  /**
   * Add a new item to the end of the current array of items while setting the
   * default states.
   */
  add () {
    let items = [...this.props.items]
    for (let item of items) {
      item.open = false
    }

    const item = this.newItem()
    items = items.concat([item])
    this.update(items, '')
    this.setState({ initial: false, scrollToId: item.uuid })
  }

  /**
   * Remove the item from the array of items.
   */
  remove (item) {
    // Confirm deletion first
    if (this.props.skipWarning || window.confirm(i18n.t('collection.warning')) === true) {
      let items = [...this.props.items].filter(x => {
        return x.uuid !== item.uuid
      })

      if (items.length < this.props.minimum) {
        items.push(this.newItem())
      }

      this.update(items, '')
      this.setState({ initial: false, scrollToId: '' })
    }
  }

  /**
   * Update an item properties based on a child component.
   */
  updateChild (item, prop, value) {
    let items = [...this.props.items]
    const index = items.findIndex(x => x.uuid === item.uuid)
    items[index][prop] = value
    this.update(items, this.props.branch)
  }

  /**
   * Update the accordion addendum branch value.
   */
  updateAddendum (value) {
    if (value === 'Yes') {
      this.add()
      return
    }

    this.update(this.props.items, value)
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
          childProps.onUpdate = (value) => {
            const propName = child.props.name
                  ? child.props.name
                  : value && value.name ? value.name : 'Extra'
            this.updateChild(item, propName, value)
          }
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

  /**
   * Return the appropriate verbiage to use based on the items open state
   */
  openText (item = {}) {
    return item.open ? this.props.closeLabel : this.props.openLabel
  }

  /**
   * Render the item summary which can be overriden with `customSummary`
   */
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

  /**
   * Render the item details which can be overriden with `customDetails`
   */
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
    const items = [...this.props.items]

    return items.map((item, index, arr) => {
      return (
        <div className="item" id={item.uuid} key={item.uuid}>
          {
            this.props.customSummary(item, index, initial,
                                     () => { return this.summary(item, index, initial) },
                                     () => { return this.toggle.bind(this, item) },
                                     () => { return this.openText(item) },
                                     () => { return this.remove.bind(this, item) },
                                     () => { return this.props.byline(item, index, initial) })
          }
          {this.props.customDetails(item, index, initial, () => { return this.details(item, index, initial) })}
        </div>
      )
    })
  }

  /**
   * The append button is only displayed if there is no addendum.
   */
  appendButton () {
    return (
      <button className="add usa-button-outline" onClick={this.add}>
        {this.props.appendLabel}
        <i className="fa fa-plus-circle"></i>
      </button>
    )
  }

  /**
   * Render the accordion addendum notice
   */
  addendum () {
    if (!this.props.appendTitle && !this.props.appendMessage) {
      return null
    }

    // TODO: Add `value` and `onUpdate`
    const klassAppend = `addendum ${this.props.appendClass}`.trim()
    return (
      <Branch label={this.props.appendTitle}
              labelSize="h3"
              className={klassAppend}
              help={this.props.appendHelp}
              value={this.props.branch}
              onUpdate={this.updateAddendum}
              onValidate={this.props.onValidate}>
        {this.props.appendMessage}
      </Branch>
    )
  }

  /**
   * Render the accordion caption which is essentially a `table-caption`
   * for the accordion
   */
  caption () {
    return this.props.caption
      ? <div className="caption">{this.props.caption()}</div>
      : null
  }

  render () {
    const klass = `accordion ${this.props.className}`.trim()
    const description = this.props.items.length < 2 ? '' : this.props.description

    return (
      <div ref="accordion">
        <div className={klass}>
          <strong>{description}</strong>
          {this.caption()}

          <div className="items">
            {this.content()}
          </div>

          {this.appendButton()}
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
  branch: '',
  className: '',
  appendTitle: '',
  appendMessage: null,
  appendHelp: null,
  appendClass: '',
  appendLabel: i18n.t('collection.append'),
  openLabel: i18n.t('collection.open'),
  closeLabel: i18n.t('collection.close'),
  removeLabel: i18n.t('collection.remove'),
  description: i18n.t('collection.summary'),
  caption: null,
  scrollTo: '',
  timeout: 500,
  sort: null,
  realtime: true,
  inject: (items) => { return items },
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
  customSummary: (item, index, initial, callback, toggle, openText, remove, byline) => {
    return callback()
  },
  customDetails: (item, index, initial, callback) => {
    return callback()
  }
}
