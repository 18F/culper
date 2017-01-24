import React from 'react'
import { i18n } from '../../../config'
import ValidationElement from '../ValidationElement'

export default class Collection extends ValidationElement {
  constructor (props) {
    super(props)

    let min = this.props.minimum || 0
    this.state = {
      minimum: min,
      length: min,
      items: this.props.items || []
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
    this.setState({items: this.factory(this.state.minimum)})
  }

  /**
   * Generate a unique-ish key to be used as the item identifier
   */
  generateKey () {
    return '' + new Date().getTime()
  }

  /**
   * Factory to generate the initial amount of items in the collection
   */
  factory (min) {
    let collection = []

    this.state.items.forEach((item) => {
      collection.push(this.createItem(item))
    })

    for (let i = collection.length; i < min; i++) {
      collection.push(this.createItem(null, true))
    }

    return collection
  }

  /**
   * Create a new item for the collection
   */
  createItem (props, open = false) {
    let index = props ? props.index : this.generateKey()
    let orphans = this.cloneChildren(this.props.children, {
      ...props,
      index: index,
      open: open
    })

    return {
      index: index,
      open: open,
      children: orphans
    }
  }

  /**
   * Append a new item to the end of the collection
   */
  append () {
    let item = this.createItem(null, true)
    let collection = this.state.items
    collection.push(item)

    this.setState({ items: collection }, () => {
      this.dispatcher(this.state.items)
    })
  }

  /**
   * Remove an item by its index
   */
  remove (index) {
    let collection = []
    this.state.items.forEach((item) => {
      if (item.index !== index) {
        collection.push(item)
      }
    })

    this.setState({ items: collection }, () => {
      this.dispatcher(this.state.items)
    })
  }

  /**
   * Notify any subscribers of updates to the collection of items.
   */
  dispatcher (collection) {
    if (this.props.dispatch) {
      this.props.dispatch(this.normalize(collection))
    }
  }

  /**
   * Normalize the collection so persisted data does not contain deep objects
   */
  normalize (collection) {
    let items = []
    collection.forEach((item) => {
      let x = { index: item.index }

      for (let child in item) {
        if (['index', 'children'].includes(child)) {
          continue
        }

        x[child] = {}
        for (let key in item[child]) {
          let what = Object.prototype.toString.call(item[child][key])
          if (!['[object String]', '[object Date]', '[object Boolean]'].includes(what)) {
            continue
          }

          x[child] = {
            ...x[child],
            [key]: item[child][key]
          }
        }
      }

      items.push(x)
    })

    return items
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
  onUpdate (props) {
    let index = props.index
    let field = props.name
    let value = props
    let collection = []

    this.state.items.forEach((item) => {
      if (item.index === index) {
        item[field] = value
      }
      collection.push(item)
    })

    this.setState({ items: collection }, () => {
      this.dispatcher(this.state.items)
    })
  }

  /**
   * Since children components are part of `props` and is read-only it is
   * necessary to iterate over the array and pass down collection specific
   * properties and callbacks.
   */
  cloneChildren (children, props) {
    let self = this
    return React.Children.map(children, (child) => {
      let localProps = {
        index: props.index,
        onUpdate: self.onUpdate
      }

      // If there has been data persisted attempt to hydrate the child
      // with previously applied values.
      if (props) {
        for (let key in props) {
          if (key === child.props.name) {
            localProps = {
              ...localProps,
              ...props[key]
            }
          }
        }
      }

      if (child.props.children && child.type) {
        let what = Object.prototype.toString.call(child.type)
        if (what === '[object Function]') {
          localProps.children = this.cloneChildren(child.props.children, props)
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
    let collection = []

    this.state.items.forEach((item) => {
      if (item.index === index) {
        item.open = !item.open
      }
      collection.push(item)
    })

    this.setState({ items: collection }, () => {
      this.dispatcher(this.state.items)
    })
  }

  /**
   * If a callback is not found for `this.props.summary` then normal rendering of every
   * item is done.
   *
   * However, if there is a summary callback then it is used to create the additional pieces
   * needed for the accordion look and feel.
   */
  getContent () {
    // If no summary details are provided then we do a simple display of everything
    // without worrying about the accordion look and feel.
    if (!this.props.summary) {
      return this.state.items.map((item) => {
        return (
          <div className="item" key={item.index}>
            <div className="details">
              {item.children}
            </div>
          </div>
        )
      })
    }

    return this.state.items.map((item, index) => {
      const title = index === 0
            ? <div><h4>{this.props.summaryTitle || i18n.t('collection.summary')}</h4><hr /></div>
            : ''

      // The current item is what should be "open" so a bit more work
      // goes in to the display.
      if (item.open) {
        return (
          <div className="item" key={item.index}>
            <div className="summary">
              <div className="title">
                {title}
              </div>
              <a href="javascript:;;" className="toggle" onClick={this.toggle.bind(this, item.index)}>
                <div className="brief">
                  {this.props.summary(item, index)}
                </div>
                <div className="expander">
                  <i className="fa fa-chevron-up fa-2" aria-hidden="true"></i>
                </div>
              </a>
            </div>
            <div className="details">
              {item.children}
            </div>
          </div>
        )
      }

      // Simply put the item is "closed" and should render accordingly.
      return (
        <div className="item" key={item.index}>
          <div className="summary">
            <div className="title">
              {title}
            </div>
            <a href="javascript:;;" className="toggle" onClick={this.toggle.bind(this, item.index)}>
              <div className="brief">
                {this.props.summary(item, index)}
              </div>
              <div className="expander">
                <i className="fa fa-chevron-down fa-2" aria-hidden="true"></i>
              </div>
            </a>
          </div>
        </div>
      )
    })
  }

  render () {
    return (
      <div className={`collection ${this.props.className}`}>
        {this.getContent()}
        <div className="text-center">
          <button className="add usa-button-outline" onClick={this.append}>
            <span>{this.props.appendLabel}</span>
            <i className="fa fa-plus-circle"></i>
          </button>
        </div>
      </div>
    )
  }
}
