import React from 'react'
import { i18n } from '../../../config'
import ValidationElement from '../ValidationElement'
import Branch from '../Branch'
import Show from '../Show'
import Svg from '../Svg'
import StickyAccordionSummary from '../../Sticky/StickyAccordionSummary'
import { findPosition } from '../../Navigation/navigation-helpers'

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

export const scrollToBottom = (selector) => {
  const el = document.querySelector(selector)
  if (!el) {
    return
  }
  window.scroll({ top: el.offsetTop, left: 0, behavior: 'smooth' })
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
    this.isValid = this.isValid.bind(this)

    // Instance variable. Not stored in state to prevent re-renders and it's not going to
    // be used in the UI.
    this.stickyStatus = {}
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

      item.open = this.props.items.length > 1 ? false : this.props.defaultState
      return item
    })

    if (dirty) {
      this.update(items, this.props.branch)
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
      const item = this.props.items.filter(x => x.uuid === id)[0] || { uuid: id }

      // Calculate a magic number to phase the timeout value. This always
      // for any CSS keyframe animations or transitions to take place prior
      // to finding coordinates.
      const index = this.props.items.findIndex(x => x.uuid === id)
      const sindex = index < 0 ? 0 : index
      const shift = (sindex / 10) * 0.3142
      const timeout = this.props.timeout + (this.props.timeout * shift)

      // Get the element to which we should scroll to
      const scrollTo = this.props.scrollToTop
            ? document.getElementById(this.props.scrollToTop)
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
    this.props.onUpdate({
      branch: branch,
      items: items
    })
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

    if (this.stickyStatus[item.uuid]) {
      this.update(items, this.props.branch)
      this.setState({ initial: false, scrollToId: item.uuid })
    } else {
      this.update(items, this.props.branch)
      this.setState({ initial: false, scrollToId: '' })
    }
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
    this.update(items, { value: '' })
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

      this.update(items, { value: '' })
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
  updateAddendum (values) {
    if (values.value === 'Yes') {
      this.add()
      return
    }

    if (this.props.scrollToBottom) {
      scrollToBottom(this.props.scrollToBottom)
    }
    this.update(this.props.items, values)
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
          childProps.onError = this.props.onError
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
    // If this is a `gap` then you cannot destroy what you did not create.
    if (item.type && item.type === 'Gap') {
      return null
    }

    const closedAndIncomplete = !item.open && !this.isValid(this.props.transformer(item))
    const svg = closedAndIncomplete
          ? <Svg src="/img/exclamation-point.svg" className="incomplete" alt={this.props.incomplete} />
          : null

    return (
      <div className="summary-container">
        <div className="summary">
          <a href="javascript:;;;" className={`left ${openState(item, initial)}`} title={`Click to ${this.openText(item).toLowerCase()} this item`} onClick={this.toggle.bind(this, item)}>
            <span className="button-with-icon" aria-hidden="true">
              <i className={chevron(item)} aria-hidden="true"></i>
              <span className="toggle">{this.openText(item)}</span>
            </span>
            {svg}
            {this.props.summary(item, index, initial)}
          </a>
          <a href="javascript:;;;" className="right remove" aria-label="Remove this item" title="Remove this item" onClick={this.remove.bind(this, item)}>
            <span className="button-with-icon">
              <i className="fa fa-trash" aria-hidden="true"></i>
              <span>{this.props.removeLabel}</span>
            </span>
          </a>
        </div>
        <Show when={closedAndIncomplete}>
          {this.props.byline(item, index, initial, this.props.incomplete, this.props.required)}
        </Show>
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
      </div>
    )
  }

  onStickyScroll (item, stick) {
    // Set the sticky status for the particular item
    this.stickyStatus[item.uuid] = stick
  }

  /**
   * Render the individual items in the array.
   */
  content () {
    // Ensure we have the minimum amount of items required
    const initial = this.state.initial
    const items = [...this.props.items]

    return items.map((item, index, arr) => {
      // Bind for each item so we get a handle to it when we set the sticky status
      const onScroll = this.onStickyScroll.bind(this, item)

      const summary = this.props.customSummary(item, index, initial,
        () => { return this.summary(item, index, initial) },
        () => { return this.toggle.bind(this, item) },
        () => { return this.openText(item) },
        () => { return this.remove.bind(this, item) },
        () => { return this.props.byline(item, index, initial) })

      const details = this.props.customDetails(item, index, initial, () => { return this.details(item, index, initial) })

      return (
        <StickyAccordionSummary id={item.uuid}
          key={item.uuid}
          className="item"
          stickyClass="sticky-accordion"
          onScroll={onScroll}
          preventStick={!item.open}>
          {summary}
          {details}
        </StickyAccordionSummary>
      )
    })
  }

  /**
   * The append button is only displayed if there is no addendum.
   */
  appendButton () {
    if (this.props.appendTitle || this.props.appendMessage) {
      return null
    }

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

    const klassAppend = `addendum ${this.props.appendClass}`.trim()
    return (
      <Branch label={this.props.appendTitle}
              labelSize="h3"
              className={klassAppend}
              help={this.props.appendHelp}
              value={(this.props.branch || {}).value}
              onUpdate={this.updateAddendum}
              onError={this.props.onError}
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}>
        {this.props.appendMessage}
      </Branch>
    )
  }

  description () {
    const ariaOnly = this.props.items.length < 2
    return (
      <strong className={ariaOnly ? 'aria-description' : ''}>
        {this.props.description}
      </strong>
    )
  }

  /**
   * Render the accordion caption which is essentially a `table-caption`
   * for the accordion
   */
  caption () {
    return this.props.caption
      ? <div className="caption">{this.props.caption(this.props)}</div>
      : null
  }

  /**
   * Determines if current item is valid. By default, this
   * utilizes the validator that is passed in.
   * */
  isValid (item) {
    if (this.props.required) {
      return new this.props.validator(item).isValid()
    }
    return true
  }

  render () {
    const klass = `accordion ${this.props.className}`.trim()

    return (
      <div ref="accordion">
        <div className={klass}>
          {this.description()}
          {this.caption()}
          <div className="items">
            {this.content()}
          </div>
          <div className="append-button">
            {this.appendButton()}
          </div>
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
  branch: { value: '' },
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
  incomplete: i18n.t('collection.incomplete'),
  caption: null,
  scrollToTop: '',
  scrollToBottom: '',
  timeout: 500,
  sort: null,
  realtime: true,
  inject: (items) => { return items },
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  summary: (item, index, initial = false) => {
    return (
      <span>
        <strong>Warning:</strong> Item summary not implemented
      </span>
    )
  },
  validator: (item) => {
    return class {
      isValid () {
        return true
      }
    }
  },
  transformer: (item) => {
    return item && item.Item ? item.Item : item
  },
  byline: (item, index, initial = false, message = '') => {
    return (
      <div className={`byline ${openState(item, initial)} fade in`.trim()}>
        <div className="usa-alert usa-alert-error">
          <div className="usa-alert-body">
            <h5 className="usa-alert-heading">{message}</h5>
          </div>
        </div>
      </div>
    )
  },
  customSummary: (item, index, initial, callback, toggle, openText, remove, byline) => {
    return callback()
  },
  customDetails: (item, index, initial, callback) => {
    return callback()
  }
}

Accordion.defaultList = { items: [], branch: {} }
