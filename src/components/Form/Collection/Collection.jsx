import React from 'react'
import { i18n } from '../../../config'
import { findPosition } from '../../../middleware/history'
import ValidationElement from '../ValidationElement'
import Show from '../Show'

export default class Collection extends ValidationElement {
  constructor (props) {
    super(props)

    let min = this.props.minimum || 0
    this.state = {
      id: super.guid(),
      minimum: min,
      length: min,
      items: this.props.items || [],
      children: []
    }

    this.append = this.append.bind(this)
    this.toggle = this.toggle.bind(this)
    this.onUpdate = this.onUpdate.bind(this)
  }

  /**
   * Upon the first mounting we need to ensure the minimum number of items
   * are present in the collection.
   */
  componentDidMount () {
    const f = this.factory(this.state.minimum, this.state.items)
    this.setState({items: f.items, children: f.children})
  }

  /**
   * Factory to generate the initial amount of items in the collection
   */
  factory (min, localItems) {
    let items = []
    let children = []

    localItems.forEach((item, index) => {
      items.push({
        ...item,
        open: false
      })
      children.push(this.createChildren(item, index))
    })

    for (let index = children.length; index < min; index++) {
      items.push({open: true})
      children.push(this.createChildren(null, index))
    }

    return {
      items: items,
      children: children
    }
  }

  /**
   * Create a new chidren for the collection
   */
  createChildren (localItem, index) {
    let orphans = this.cloneChildren(this.props.children, index, {
      ...localItem
    })

    return orphans
  }

  /**
   * Append a new item to the end of the collection
   */
  append () {
    let items = [...this.state.items]
    for (let item of items) {
      item.open = false
    }
    items.push({open: true})

    let children = [...this.state.children]
    children = this.factory(items.length, items).children

    this.setState({ items: items, children: children }, () => {
      this.dispatcher(this.state.items)
      this.scroll()
    })
  }

  /**
   * Remove an item by its index
   */
  remove (index) {
    let items = [...this.state.items]
    items.splice(index, 1)

    let children = [...this.state.children]
    children = this.factory(items.length, items).children

    this.setState({ items: items, children: children }, () => {
      this.dispatcher(this.state.items)
      this.scroll()
    })
  }

  /**
   * Scroll to the element if an identifier is given.
   *
   *  - If you do not want to scroll pass "none" as a value.
   *  - If you want to scroll to the top of the collection
   *    pass "self" as a value.
   */
  scroll () {
    let id = this.props.scrollTo || 'scrollToProgress'
    if (id === '' || id.toLowerCase() === 'none') {
      return
    }

    if (id.toLowerCase() === 'self') {
      id = this.state.id
    }

    const el = document.getElementById(id)
    if (!el) {
      return
    }

    window.scroll(0, findPosition(el))
  }

  /**
   * Notify any subscribers of updates to the collection of items.
   */
  dispatcher (items) {
    if (this.props.dispatch) {
      this.props.dispatch(items)
    }
  }

  /**
   * Received by child components when a change has occurred and we need to bubble
   * the new properties up.
   *
   * Please note the component calling onUpdate needs to pass back these key pieces
   * of information:
   *  - `index`: This is the assigned index by the collection component
   *  - `name`:  This is the actual name of the component which should be mapped to
   *             how it is stored
   */
  onUpdate (index, props) {
    let name = props.name
    let value = props
    let items = [...this.state.items]
    items[index][name] = value

    this.setState({ items: items }, () => {
      this.dispatcher(this.state.items)
    })
  }

  /**
   * Since children components are part of `props` and is read-only it is
   * necessary to iterate over the array and pass down collection specific
   * properties and callbacks.
   */
  cloneChildren (children, index, props) {
    let self = this
    return React.Children.map(children, (child) => {
      let localProps = {}

      if (child.type) {
        let what = Object.prototype.toString.call(child.type)
        if (what === '[object Function]') {
          localProps = {
            onUpdate: self.onUpdate.bind(this, index)
          }
        }

        what = Object.prototype.toString.call(child.props.children)
        if (child.props.children && ['[object Object]', '[object Array]'].includes(what)) {
          localProps.children = this.cloneChildren(child.props.children, index, props)
        }
      }

      // If there has been data persisted attempt to hydrate the child
      // with previously applied values.
      if (props) {
        if (props.name && props.name === child.props.name) {
          // If the properties are the object itself assign it directly
          localProps = {
            ...localProps,
            ...props
          }
        } else if (child.props && props[child.props.name]) {
          // If the properties are found by the child's name
          localProps = {
            ...localProps,
            ...props[child.props.name]
          }
        }
      }

      return React.cloneElement(child, {
        ...localProps
      })
    })
  }

  /**
   * Toggles the open/close state of an item in the accordion view
   */
  toggle (index) {
    let items = [...this.state.items]
    items[index].open = !items[index].open
    this.setState({ items: items })
  }

  persistedItem (index) {
    return this.state.items[index] || {}
  }

  /**
   * If a callback is not found for `this.props.summary` then normal rendering of every
   * item is done.
   *
   * However, if there is a summary callback then it is used to create the additional pieces
   * needed for the accordion look and feel.
   */
  getContent () {
    // Create the 'byline' which is used to separate items as well as the remove action
    const bylineTop = (item, index) => {
      if (this.state.items.length < 2) {
        return ''
      }

      return (
        <div className="byline top">
          <a href="javascript:;;" className="remove" onClick={this.remove.bind(this, index)}>
            <span>{i18n.t('collection.remove')}</span>
            <i className="fa fa-times-circle" aria-hidden="true"></i>
          </a>
        </div>
      )
    }

    // Create the 'byline' which is used to separate items as well as the bottom toggle action
    const bylineBottom = (item, index) => {
      if (this.state.items.length < 2) {
        return ''
      }

      return (
        <div className="byline bottom">
          <a href="javascript:;;" className="toggle" onClick={this.toggle.bind(this, index)}>
            <span>{i18n.t('collection.close')}</span>
            <i className="fa fa-chevron-up" aria-hidden="true"></i>
          </a>
        </div>
      )
    }

    // If no summary details are provided then we do a simple display of everything
    // without worrying about the accordion look and feel.
    //
    // Also, if there are less than two items in the list skip the summary
    if (!this.props.summary || this.state.items.length < 2) {
      return this.state.items.map((item, index) => {
        return (
          <div className="item" key={index}>
            <div className="details">
              {bylineTop(item, index)}
              {this.state.children[index]}
              {bylineBottom(item, index)}
            </div>
          </div>
        )
      })
    }

    // There is a summary and it is appropriate to display at this moment
    const totalItems = this.state.items.length
    return this.state.items.map((item, index) => {
      const klassOpen = item.open === true ? 'open' : 'closed'
      const klassLast = index + 1 === totalItems ? 'last' : ''
      return (
        <div className="item" key={index}>
          <div className="summary">
            <Show when={index === 0}>
              <div className="caption gutters">
                  <div className="title">
                    <h4>{this.props.summaryTitle || i18n.t('collection.summary')}</h4>
                    <hr />
                  </div>
              </div>
            </Show>
            <div className={`row gutters ${klassOpen} ${klassLast}`.trim()}>
              <a href="javascript:;;" className="toggle" onClick={this.toggle.bind(this, index)}>
                <div className="brief">
                  {this.props.summary(item, index)}
                </div>
                <div className="expander">
                  <i className={`fa fa-chevron-${item.open === true ? 'up' : 'down'} fa-2`} aria-hidden="true"></i>
                </div>
              </a>
            </div>
            <div className={`divider gutters ${klassOpen} ${klassLast}`.trim()}>
              <hr />
            </div>
          </div>
          <div className={`details gutters ${item.open === true ? '' : 'hidden'}`.trim()}>
            {bylineTop(item, index)}
            {this.state.children[index]}
            {bylineBottom(item, index)}
          </div>
        </div>
      )
    })
  }

  render () {
    const klass = `collection ${this.props.className || ''}`.trim()
    const klassAppend = `text-center ${this.props.appendClass || ''}`.trim()

    return (
      <div id={this.state.id} className={klass}>
        {this.getContent()}
        <div className={klassAppend}>
          <button className="add usa-button-outline" onClick={this.append}>
            <span>{this.props.appendLabel}</span>
            <i className="fa fa-plus-circle"></i>
          </button>
        </div>
      </div>
    )
  }
}
