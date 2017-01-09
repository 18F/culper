import React from 'react'
import ValidationElement from '../ValidationElement'

export default class Collection extends ValidationElement {
  constructor (props) {
    super(props)

    let min = this.props.minimum || 0
    this.state = {
      minimum: min,
      length: min,
      items: []
    }

    this.append = this.append.bind(this)
  }

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

    this.props.items.forEach((p) => {
      collection.push(this.createItem(p))
    })

    for (let i = collection.length; i < min; i++) {
      collection.push(this.createItem())
    }

    return collection
  }

  /**
   * Create a new item for the collection
   */
  createItem (props) {
    let index = props ? props.index : this.generateKey()
    let orphans = this.cloneChildren(this.props.children, {
      ...props,
      index: index
    })

    return {
      index: index,
      children: orphans
    }
  }

  /**
   * Append a new item to the end of the collection
   */
  append () {
    let item = this.createItem()
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

      item.children.forEach((child) => {
        x[child.props.name] = {}

        for (let key in child.props) {
          x[child.props.name] = {
            ...x[child.props.name],
            [key]: child.props[key]
          }
        }
      })

      items.push(x)
    })

    return items
  }

  cloneChildren (children, props) {
    return React.Children.map(children, (child) => {
      let localProps = { index: props.index }

      // If there has been data persisted attempt to hydrate the child
      // with previously applied values.
      if (props) {
        for (let key in props) {
          if (key === child.props.name) {
            localProps = props[key]
          }
        }
      }

      return React.cloneElement(child, {
        ...localProps
      })
    })
  }

  render () {
    let content = this.state.items.map((item) => {
      return (
        <div key={item.index}>
          {item.children}
        </div>
      )
    })

    return (
      <div className="collection">
        {content}
        <div className="text-center">
          <button onClick={this.append}>{this.props.appendLabel}</button>
        </div>
      </div>
    )
  }
}
